import { z } from "zod";

export const dataInputBase = {
  gyroT: z.array(z.number()),
  gyroX: z.array(z.number()),
  gyroY: z.array(z.number()),
  gyroZ: z.array(z.number()),
  accelerationT: z.array(z.number()),
  accelerationX: z.array(z.number()),
  accelerationY: z.array(z.number()),
  accelerationZ: z.array(z.number()),
};
