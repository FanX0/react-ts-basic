export type Theme = "light" | "dark";

const KEY = "theme";

export function load(): Theme {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "light";
    const val = JSON.parse(raw);
    return val === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function save(theme: Theme): void {
  localStorage.setItem(KEY, JSON.stringify(theme));
}

export function toggle(): Theme {
  const next: Theme = load() === "light" ? "dark" : "light";
  save(next);
  return next;
}