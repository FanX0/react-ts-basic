import { useEffect, useMemo, useState } from "react";

type ScoreComment = {
  id: number;
  text: string;
  score: number;
  createdAt: number;
};

const STORAGE_KEY = "comments_score_basic";

function load(): ScoreComment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: ScoreComment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ScoreBasic() {
  const [items, setItems] = useState<ScoreComment[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setItems(load());
  }, []);

  const sorted = useMemo(
    () => [...items].sort((a, b) => (b.score - a.score) || (b.createdAt - a.createdAt)),
    [items]
  );

  const handleCreate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id ?? 0)), 0) || 0) + 1;
    const next = [...items, { id: nextId, text: trimmed, score: 0, createdAt: Date.now() }];
    save(next);
    setItems(next);
    setText("");
  };

  const vote = (id: number, delta: number) => {
    const next = items.map((it) => (it.id === id ? { ...it, score: it.score + delta } : it));
    save(next);
    setItems(next);
  };

  const remove = (id: number) => {
    const next = items.filter((it) => it.id !== id);
    save(next);
    setItems(next);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Score Basic</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 600 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Write a comment..."
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <hr />
      <ul style={{ display: "grid", gap: "0.75rem", padding: 0 }}>
        {sorted.length === 0 && <li>No comments yet.</li>}
        {sorted.map((it) => (
          <li key={it.id} style={{ listStyle: "none", border: "1px solid #ddd", padding: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <strong>{it.score}</strong>
              <button onClick={() => vote(it.id, +1)}>+</button>
              <button onClick={() => vote(it.id, -1)}>-</button>
            </div>
            <div style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{it.text}</div>
            <small style={{ color: "#666" }}>{new Date(it.createdAt).toLocaleString()}</small>
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={() => remove(it.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}