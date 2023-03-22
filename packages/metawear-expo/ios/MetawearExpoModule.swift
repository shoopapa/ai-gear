import ExpoModulesCore

import Foundation
import MetaWear
import MetaWearCpp
import React

import MessageUI
import BoltsSwift


func bObj(obj: MetawearExpoModule) -> UnsafeMutableRawPointer {
  return bridge(obj: obj)
}

func bPtr(ptr: UnsafeRawPointer) -> MetawearExpoModule {
  return bridge(ptr: ptr)
}
let DISCONNECT_EVENT: String = "disconnect"
let STREAM_ACC_DATA: String = "stream-acc-data"
let STREAM_GYRO_DATA: String = "stream-gyro-data"
public class MetawearExpoModule: Module {
  var device: MetaWear?
  var streamingCleanup: [OpaquePointer: () -> Void] = [:]

  @objc
  func streamAccDataEvent(data: [Double]) {
    do {
      let jsonData: Data = try JSONEncoder().encode(data)
      let jsonString: String = String(data: jsonData, encoding: .utf8)!
      sendEvent(STREAM_ACC_DATA, [
        "data": jsonString
      ])
    }
    catch { print("error") }
  }

  @objc
  func streamGyroDataEvent(data: [Double]) {
    do {
      let jsonData: Data = try JSONEncoder().encode(data)
      let jsonString: String = String(data: jsonData, encoding: .utf8)!
      sendEvent(STREAM_GYRO_DATA, [
        "data": jsonString
      ])
    }
    catch { print("error") }
  }

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    Name("MetawearExpo")

    // Defines event names that the module can send to JavaScript.
    Events(DISCONNECT_EVENT,STREAM_ACC_DATA,STREAM_GYRO_DATA)

    AsyncFunction("battery") { (promise: Promise) in
      if let board = self.device?.board {
          let batt = mbl_mw_settings_get_battery_state_data_signal(board);
          batt?.read().continueOnSuccessWith {
            let b = String(($0.valueAs() as MblMwBatteryState).charge)
            promise.resolve(b)
          }
      }
    }

    AsyncFunction("mac") { (promise: Promise) in
      if let device = self.device {
        promise.resolve(device.mac)
      }
    }

    AsyncFunction("blink") { (promise: Promise) in
      if let device = self.device {
        device.flashLED(color: .blue, intensity: 1.0, _repeat: 4)
        mbl_mw_haptic_start_motor(device.board, 100, 500)
        let cancel = DispatchWorkItem {
          promise.resolve("done")
        }
        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 3, execute: cancel )
      }
    }


    AsyncFunction("connect") { (promise: Promise) in
      MetaWearScanner.shared.startScan(allowDuplicates: true) { (device) in
        print("wee found a device!")
        // Hooray! We found a MetaWear board, so stop scanning for more
        if device.rssi > -80 {
          MetaWearScanner.shared.stopScan()
          device.connectAndSetup().continueWith { t in
            if t.error != nil {
              promise.resolve("error: could not connect 1")
            } else {
              t.result?.continueWith { t in
                  self.sendEvent(DISCONNECT_EVENT, ["message": "disconnect"])
              }
              device.remember()
              self.device = device
              promise.resolve("connected!")
            }
          }
        }
      }
    }


    AsyncFunction("startStream") { (promise: Promise) in
      print("starting stream")
      mbl_mw_gyro_bmi160_set_range(device?.board, MBL_MW_GYRO_BOSCH_RANGE_2000dps)
      mbl_mw_gyro_bmi160_set_odr(device?.board, MBL_MW_GYRO_BOSCH_ODR_50Hz)
      mbl_mw_acc_bosch_set_range(device?.board, MBL_MW_ACC_BOSCH_RANGE_16G)
      mbl_mw_acc_set_odr(device?.board, 50)
      mbl_mw_acc_bosch_write_acceleration_config(device?.board)
      mbl_mw_gyro_bmi160_write_config(device?.board)

      let b = bObj(obj: self)
      let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(device?.board)!
      mbl_mw_datasignal_subscribe(signalAcc, b) {(context, obj) in
          let acceleration: MblMwCartesianFloat = obj!.pointee.valueAs()
          let _self: MetawearExpoModule = bPtr(ptr: context!)
          let x = Double(acceleration.x)
          let y = Double(acceleration.y)
          let z = Double(acceleration.z)
          _self.streamAccDataEvent(data: [x,y,z] )
      }
      let signalGyro = mbl_mw_gyro_bmi160_get_rotation_data_signal(device?.board)!
      mbl_mw_datasignal_subscribe(signalGyro, b) {(context, obj) in
          let gryo: MblMwCartesianFloat = obj!.pointee.valueAs()
          let _self: MetawearExpoModule = bPtr(ptr: context!)
          let x = Double(gryo.x)
          let y = Double(gryo.y)
          let z = Double(gryo.z)
          _self.streamGyroDataEvent(data: [x,y,z] )
      }

      mbl_mw_acc_enable_acceleration_sampling(device?.board)
      mbl_mw_acc_start(device?.board)

      mbl_mw_gyro_bmi160_enable_rotation_sampling(device?.board)
      mbl_mw_gyro_bmi160_start(device?.board)


      streamingCleanup[signalAcc] = {
          mbl_mw_acc_stop(self.device?.board)
          mbl_mw_acc_disable_acceleration_sampling(self.device?.board)
          mbl_mw_datasignal_unsubscribe(signalAcc)
      }
      streamingCleanup[signalGyro] = {
          mbl_mw_gyro_bmi160_stop(self.device?.board)
          mbl_mw_gyro_bmi160_disable_rotation_sampling(self.device?.board)
          mbl_mw_datasignal_unsubscribe(signalGyro)
      }
    }




  }
}
