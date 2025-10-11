import type { Destination } from "./destination";

export type DestinationInputTypeOnly = Omit<Destination, "id">;
export type DestinationUpdateTypeOnly = Partial<DestinationInputTypeOnly>;