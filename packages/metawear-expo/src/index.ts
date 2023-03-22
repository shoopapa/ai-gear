import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to MetawearExpo.web.ts
// and on native platforms to MetawearExpo.ts
import MetawearExpoModule from "./MetawearExpoModule";
import { ChangeEventPayload } from "./MetawearExpo.types";

export const connnect = async (): Promise<string> => {
  return await MetawearExpoModule.connect();
};
export const forget = async (): Promise<string> => {
  return await MetawearExpoModule.forget();
};
export const battery = async (): Promise<string> => {
  return await MetawearExpoModule.battery();
};

export const mac = (): Promise<string> => {
  return MetawearExpoModule.mac();
};
export const getConnected = (): boolean => {
  return MetawearExpoModule.isConnected();
};

export const blink = async (): Promise<void> => {
  await MetawearExpoModule.blink();
  return;
};

const emitter = new EventEmitter(
  MetawearExpoModule ?? NativeModulesProxy.MetawearExpo,
);

export type StateEventPayload = {
  connected: boolean;
};

export const addStateListener = (
  listener: (event: StateEventPayload) => void,
): Subscription => {
  return emitter.addListener<StateEventPayload>("state-event", listener);
};
