import { useEffect, useState } from "react";

type Comment = {
  id: number;
  text: string;
  createdAt: number;
};

const STORAGE_KEY = "comments_basic";

function load(): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: Comment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ComentBasic() {
  const [items, setItems] = useState<Comment[]>([]);
  const [text, setText] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    setItems(load());
  }, []);

  const resetForm = () => {
    setText("");
    setEditingId(null);
  };

  const handleCreate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id ?? 0)), 0) || 0) + 1;
    const next = [...items, { id: nextId, text: trimmed, createdAt: Date.now() }];
    save(next);
    setItems(next);
    resetForm();
  };

  const startEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setText(currentText);
  };

  const handleUpdate = () => {
    const trimmed = text.trim();
    if (!trimmed || editingId == null) return;
    const next = items.map((it) => (it.id === editingId ? { ...it, text: trimmed } : it));
    save(next);
    setItems(next);
    resetForm();
  };

  const handleDelete = (id: number) => {
    const next = items.filter((it) => it.id !== id);
    save(next);
    setItems(next);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Coment Basic</h2>

      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 600 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Write a comment..."
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {editingId == null ? (
            <button onClick={handleCreate}>Create</button>
          ) : (
            <>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <hr />
      <ul style={{ display: "grid", gap: "0.75rem", padding: 0 }}>
        {items.length === 0 && <li>No comments yet.</li>}
        {items.map((it) => (
          <li key={it.id} style={{ listStyle: "none", border: "1px solid #ddd", padding: "0.75rem" }}>
            <div style={{ whiteSpace: "pre-wrap" }}>{it.text}</div>
            <small style={{ color: "#666" }}>
              {new Date(it.createdAt).toLocaleString()}
            </small>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={() => startEdit(it.id, it.text)}>Edit</button>
              <button onClick={() => handleDelete(it.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
