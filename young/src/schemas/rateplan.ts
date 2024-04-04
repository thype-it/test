import { z } from "zod";
import { labelSchema } from "./label";

export const rateplanSchema = z.object({
  labels: z.array(labelSchema),
  name: z.string(),
  voice: z.number(),
  messages: z.number(),
  data: z.number(),
  dataRoamingFup: z.number(),
  speed: z.number(),
  price: z.number(),
});

export const rateplansSchema = z.array(rateplanSchema);
