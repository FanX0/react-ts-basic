import type { Destination } from "@/types/destination";

export type DestinationInputTypeOnly = Omit<Destination, "id">;
export type DestinationUpdateTypeOnly = Partial<DestinationInputTypeOnly>;