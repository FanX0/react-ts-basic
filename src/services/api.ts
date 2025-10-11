import type { Destination } from "../types/destination";

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3000";
const USE_STATIC = ((import.meta as any).env?.VITE_USE_STATIC_DATA || "").toLowerCase() === "true";
const BASE_PATH = (import.meta as any).env?.BASE_URL || "/"; // Vite injects this from vite.config.js
const headers = { "Content-Type": "application/json" };

export async function listDestinations(): Promise<Destination[]> {
  if (USE_STATIC) {
    const res = await fetch(`${BASE_PATH}data.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const arr = (json?.destinations ?? []) as Array<Omit<Destination, "id">>;
    // Provide synthetic ids for demo mode
    return arr.map((d, i) => ({ id: i + 1, ...d } as Destination));
  }

  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createDestination(payload: Omit<Destination, "id">): Promise<Destination> {
  if (USE_STATIC) {
    throw new Error("Read-only demo: mutations disabled in production");
  }
  const res = await fetch(`${BASE_URL}/destinations`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateDestination(id: number, payload: Partial<Omit<Destination, "id">>): Promise<Destination> {
  if (USE_STATIC) {
    throw new Error("Read-only demo: mutations disabled in production");
  }
  const res = await fetch(`${BASE_URL}/destinations/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteDestination(id: number): Promise<void> {
  if (USE_STATIC) {
    throw new Error("Read-only demo: mutations disabled in production");
  }
  const res = await fetch(`${BASE_URL}/destinations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}