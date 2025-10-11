import { z } from "zod";

export const DestinationInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type DestinationInput = z.infer<typeof DestinationInputSchema>;

export const DestinationUpdateSchema = DestinationInputSchema.partial();
export type DestinationUpdate = z.infer<typeof DestinationUpdateSchema>;