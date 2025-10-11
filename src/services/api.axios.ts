import http from "./http";
import type { Destination } from "../types/destination";

const USE_STATIC = ((import.meta as any).env?.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
const BASE_PATH = (import.meta as any).env?.BASE_URL || "/";

export async function listDestinations(): Promise<Destination[]> {
  if (USE_STATIC) {
    const res = await fetch(`${BASE_PATH}data.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const arr = (json?.destinations ?? []) as Array<Omit<Destination, "id">>;
    return arr.map((d, i) => ({ id: i + 1, ...d } as Destination));
  }
  const res = await http.get<Destination[]>("/destinations");
  return res.data;
}

export async function createDestination(payload: Omit<Destination, "id">): Promise<Destination> {
  if (USE_STATIC) throw new Error("Read-only demo: mutations disabled in production");
  const res = await http.post<Destination>("/destinations", payload);
  return res.data;
}

export async function updateDestination(
  id: number,
  payload: Partial<Omit<Destination, "id">>
): Promise<Destination> {
  if (USE_STATIC) throw new Error("Read-only demo: mutations disabled in production");
  const res = await http.patch<Destination>(`/destinations/${id}`, payload);
  return res.data;
}

export async function deleteDestination(id: number): Promise<void> {
  if (USE_STATIC) throw new Error("Read-only demo: mutations disabled in production");
  await http.delete(`/destinations/${id}`);
}