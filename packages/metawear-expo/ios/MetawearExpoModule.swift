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

struct State : Codable {
  var connected: Bool = false
  var streaming: Bool = false
}


let STATE_UPDATE: String = "state-event"
let STREAM_ACC_DATA: String = "stream-acc-data"
let STREAM_GYRO_DATA: String = "stream-gyro-data"
public class MetawearExpoModule: Module {
  var device: MetaWear? = nil
  var streamingCleanup: [OpaquePointer: () -> Void] = [:]
    var state: State = State()

  func setState(state: State) {
    sendEvent(STATE_UPDATE, [
        "connected": state.connected,
        "streaming": state.streaming,
        "mac": self.device?.mac ?? ""
    ])
  }

  @objc
  func streamAccDataEvent(data: [Double]) {
      sendEvent(STREAM_ACC_DATA, ["t":data[0], "x": data[1],"y":data[2],"z":data[3]])
  }

  @objc
  func streamGyroDataEvent(data: [Double]) {
      sendEvent(STREAM_GYRO_DATA,  ["t":data[0], "x": data[1],"y":data[2],"z":data[3]])
  }

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    Name("MetawearExpo")

    // Defines event names that the module can send to JavaScript.
    Events(STATE_UPDATE,STREAM_ACC_DATA,STREAM_GYRO_DATA)

    Function("isConnected") {
      return self.device !== nil
    }

    Function("mac") {
      return self.device?.mac
    }

    AsyncFunction("forget") { (promise: Promise) in
      MetaWearScanner.shared.retrieveSavedMetaWearsAsync().continueOnSuccessWith { devices in
        for device in devices {
          device.clearAndReset()
          device.forget()
          self.device = nil
          self.setState(state: State(connected: false))
          promise.resolve()
        }
      }
    }

    AsyncFunction("battery") { (promise: Promise) in
      if let board = self.device?.board {
        let batt = mbl_mw_settings_get_battery_state_data_signal(board);
        batt?.read().continueOnSuccessWith {
          let b = String(($0.valueAs() as MblMwBatteryState).charge)
          promise.resolve(b)
        }
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
                self.state.connected = false
                self.setState(state: self.state)
            } else {
              t.result?.continueWith { t in
                  self.state.connected = false
                  self.setState(state: self.state)
              }
              device.remember()
              self.device = device
                self.state.connected = true
                self.setState(state: self.state)
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

      self.state.streaming = true
      self.setState(state: self.state)

      let b = bObj(obj: self)
      let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(device?.board)!
      mbl_mw_datasignal_subscribe(signalAcc, b) {(context, obj) in
          let acceleration: MblMwCartesianFloat = obj!.pointee.valueAs()
          let _self: MetawearExpoModule = bPtr(ptr: context!)
          let t = Double(obj!.pointee.epoch)
          let x = Double(acceleration.x)
          let y = Double(acceleration.y)
          let z = Double(acceleration.z)
          _self.streamAccDataEvent(data: [t,x,y,z] )
      }
      let signalGyro = mbl_mw_gyro_bmi160_get_rotation_data_signal(device?.board)!
      mbl_mw_datasignal_subscribe(signalGyro, b) {(context, obj) in
          
          let gryo: MblMwCartesianFloat = obj!.pointee.valueAs()
          let _self: MetawearExpoModule = bPtr(ptr: context!)
          let t = Double(obj!.pointee.epoch)
          let x = Double(gryo.x)
          let y = Double(gryo.y)
          let z = Double(gryo.z)
          _self.streamGyroDataEvent(data: [t,x,y,z] )
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

    AsyncFunction("stopStream") { (promise: Promise) in
      let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(self.device?.board)!
      streamingCleanup.removeValue(forKey: signalAcc)?()
      let signalGryo = mbl_mw_gyro_bmi160_get_rotation_data_signal(self.device?.board)!
      streamingCleanup.removeValue(forKey: signalGryo)?()
      self.state.streaming = false
      self.setState(state: self.state)
    }


  }
}
