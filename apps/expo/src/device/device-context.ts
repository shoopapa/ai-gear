import { StateEventPayload } from "@acme/metawear-expo";
import React from "react";

const DeviceContext = React.createContext<StateEventPayload>({
  connected: false,
  streaming: false,
  mac: "",
  scanning: false,
});

export default DeviceContext;
