import type { Destination } from "@/types/destination";

const KEY = "destinations";

export function load(): Destination[] {
  try {
    const raw = sessionStorage.getItem(KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function save(items: Destination[]): void {
  sessionStorage.setItem(KEY, JSON.stringify(items));
}

export function add(item: Omit<Destination, "id">): Destination[] {
  const items = load();
  const nextId = (items.reduce((max, it) => Math.max(max, Number((it as any).id ?? 0)), 0) || 0) + 1;
  const newItem: Destination = { id: nextId, ...item } as Destination;
  const next = [...items, newItem];
  save(next);
  return next;
}

export function update(id: number, patch: Partial<Omit<Destination, "id">>): Destination[] {
  const items = load();
  const next = items.map((it) => (Number((it as any).id) === id ? { ...it, ...patch } : it));
  save(next);
  return next;
}

export function remove(id: number): Destination[] {
  const items = load();
  const next = items.filter((it) => Number((it as any).id) !== id);
  save(next);
  return next;
}