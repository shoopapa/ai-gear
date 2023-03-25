import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to MetawearExpo.web.ts
// and on native platforms to MetawearExpo.ts
import MetawearExpoModule from "./MetawearExpoModule";

// connections
export const connnect = (): void => {
  return MetawearExpoModule.connect();
};
export const connectToRemembered = (): void => {
  return MetawearExpoModule.connectToRemembered();
};
export const forget = (): void => {
  return MetawearExpoModule.forget();
};

// utils
export const battery = async (): Promise<string> => {
  return await MetawearExpoModule.battery();
};
export const mac = (): string => {
  return MetawearExpoModule.mac();
};
export const blink = async (): Promise<void> => {
  await MetawearExpoModule.blink();
  return;
};
const emitter = new EventEmitter(
  MetawearExpoModule ?? NativeModulesProxy.MetawearExpo,
);
export type StateEventPayload = {
  scanning: boolean;
  connected: boolean;
  streaming: boolean;
  mac: string;
};
export const addStateListener = (
  listener: (event: StateEventPayload) => void,
): Subscription => {
  emitter.removeAllListeners("state-event");
  return emitter.addListener<StateEventPayload>("state-event", listener);
};

//streaming
export type DataEventPayload = {
  t: number;
  x: number;
  y: number;
  z: number;
};
export const startStream = async (
  accerationListener: (data: DataEventPayload) => void,
  gyroListener: (data: DataEventPayload) => void,
) => {
  emitter.removeAllListeners("stream-acc-data");
  emitter.removeAllListeners("stream-gyro-data");
  emitter.addListener<DataEventPayload>("stream-acc-data", accerationListener);
  emitter.addListener<DataEventPayload>("stream-gyro-data", gyroListener);
  await MetawearExpoModule.startStream();
};

export const stopStream = async () => {
  await MetawearExpoModule.stopStream();
};
