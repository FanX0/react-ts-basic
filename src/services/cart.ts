export type CartItem = {
  id: number;
  name: string;
  qty: number;
};

const KEY = "cart";

export function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function save(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function clear(): void {
  localStorage.removeItem(KEY);
}