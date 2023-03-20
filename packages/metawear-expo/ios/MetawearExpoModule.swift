import ExpoModulesCore

import Foundation
import MetaWear
import MetaWearCpp
import React

import MessageUI
import BoltsSwift

struct State : Codable {
    var signalStrength: String?;
    var macAdress: String?;
    var batteryPercent: String?;
}

let DISCONNECT_EVENT = "disconnect"
public class MetawearExpoModule: Module {
  var device: MetaWear?
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    Name("MetawearExpo")

    // Defines event names that the module can send to JavaScript.
    Events(DISCONNECT_EVENT)

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




  }
}
