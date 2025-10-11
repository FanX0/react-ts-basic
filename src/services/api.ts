import type { Destination } from "../types/destination";

const BASE_URL = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };

export async function listDestinations(): Promise<Destination[]> {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createDestination(payload: Omit<Destination, "id">): Promise<Destination> {
  const res = await fetch(`${BASE_URL}/destinations`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateDestination(id: number, payload: Partial<Omit<Destination, "id">>): Promise<Destination> {
  const res = await fetch(`${BASE_URL}/destinations/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteDestination(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/destinations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}