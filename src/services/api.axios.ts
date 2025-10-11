import http from "./http";
import type { Destination } from "../types/destination";

export async function listDestinations(): Promise<Destination[]> {
  const res = await http.get<Destination[]>("/destinations");
  return res.data;
}

export async function createDestination(payload: Omit<Destination, "id">): Promise<Destination> {
  const res = await http.post<Destination>("/destinations", payload);
  return res.data;
}

export async function updateDestination(
  id: number,
  payload: Partial<Omit<Destination, "id">>
): Promise<Destination> {
  const res = await http.patch<Destination>(`/destinations/${id}`, payload);
  return res.data;
}

export async function deleteDestination(id: number): Promise<void> {
  await http.delete(`/destinations/${id}`);
}