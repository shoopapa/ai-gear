import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to MetawearExpo.web.ts
// and on native platforms to MetawearExpo.ts
import MetawearExpoModule from "./MetawearExpoModule";
import { ChangeEventPayload } from "./MetawearExpo.types";

export async function connnect(): Promise<string> {
  console.log("yeet2");
  return await MetawearExpoModule.connect();
}
export async function battery(): Promise<string> {
  console.log("yeet");

  return await MetawearExpoModule.battery();
}

export async function mac(): Promise<string> {
  return await MetawearExpoModule.mac();
}

export async function blink(): Promise<void> {
  await MetawearExpoModule.blink();
  return;
}

const emitter = new EventEmitter(
  MetawearExpoModule ?? NativeModulesProxy.MetawearExpo,
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ChangeEventPayload };
