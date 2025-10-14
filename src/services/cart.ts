export type CartItem = {
  id: number;
  name: string;
  qty: number;
  price?: number; // optional for backwards compatibility
};

const KEY = "cart";

export function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : [];
    // normalize legacy snapshots missing `price`
    return items.map((it: any) => ({
      id: Number(it.id),
      name: String(it.name ?? ""),
      qty: Number(it.qty ?? 0),
      price: typeof it.price === "number" ? it.price : Number(it.price ?? 0),
    })) as CartItem[];
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

export function total(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + Number(it.qty || 0) * Number(it.price || 0), 0);
}