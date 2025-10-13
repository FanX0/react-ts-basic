import { useEffect, useState } from "react";
import { listDestinations, createDestination, updateDestination, deleteDestination } from "@/services/api";
import type { Destination } from "@/types/destination";

const CrudServer = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listDestinations();
      setItems(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async () => {
    try {
      setLoading(true);
      const created = await createDestination({ name: name.trim(), description: description.trim() });
      setItems((prev) => [...prev, created]);
      resetForm();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (item: Destination) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  const onUpdate = async () => {
    if (editingId == null) return;
    try {
      setLoading(true);
      const updated = await updateDestination(editingId, { name: name.trim(), description: description.trim() });
      setItems((prev) => prev.map((i) => (i.id === editingId ? updated : i)));
      resetForm();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteDestination(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) resetForm();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD Server (JSON Server)</h2>
      <p style={{ color: "#666" }}>
        Ensure JSON Server is running: <code>npx json-server --watch db.json --port 3000</code>
      </p>
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
          <li key={i.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{i.name}</strong> — {i.description}
            <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: "1rem" }}>
              <button onClick={() => onEdit(i)} disabled={loading}>Edit</button>
              <button onClick={() => onDelete(i.id)} disabled={loading}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={load} style={{ marginTop: "0.5rem" }} disabled={loading}>Refresh</button>
    </div>
  );
};

export default CrudServer;