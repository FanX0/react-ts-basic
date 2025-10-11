import { useState } from "react";
import { useDestinationsCrudAxios } from "../../../hooks/useDestinationsCrudAxios";

const CrudHookAxios = () => {
  const { items, loading, error, refresh, create, update, remove } = useDestinationsCrudAxios();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const onCreate = async () => {
    await create({ name: name.trim(), description: description.trim() });
    resetForm();
  };

  const onEdit = (id: number, n: string, d: string) => {
    setEditingId(id);
    setName(n);
    setDescription(d);
  };

  const onUpdate = async () => {
    if (editingId == null) return;
    await update(editingId, { name: name.trim(), description: description.trim() });
    resetForm();
  };

  const onDelete = async (id: number) => {
    await remove(id);
    if (editingId === id) resetForm();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD Hook (Axios)</h2>
      <p style={{ color: "#666" }}>Built on a reusable Axios CRUD hook.</p>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {editingId ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={onUpdate} disabled={loading}>Update</button>
            <button onClick={resetForm} disabled={loading}>Cancel</button>
          </div>
        ) : (
          <button onClick={onCreate} disabled={loading}>Create</button>
        )}
      </div>

      {loading && <p>Working...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul style={{ marginTop: "1rem" }}>
        {items.map((i) => (
          <li key={i.id ?? Math.random()} style={{ marginBottom: "0.5rem" }}>
            <strong>{i.name}</strong> — {i.description}
            <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: "1rem" }}>
              <button onClick={() => onEdit(i.id, i.name, i.description)} disabled={loading}>Edit</button>
              <button onClick={() => onDelete(i.id)} disabled={loading}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={refresh} style={{ marginTop: "0.5rem" }} disabled={loading}>Refresh</button>
    </div>
  );
};

export default CrudHookAxios;