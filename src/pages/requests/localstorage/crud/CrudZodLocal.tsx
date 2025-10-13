import { useState } from "react";
import { DestinationInputSchema } from "@/schemas/destination";
import { useDestinationsLocalStorage } from "@/hooks/useDestinationsLocalStorage";

const CrudZodLocal = () => {
  const { items, create, update, remove } = useDestinationsLocalStorage();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const validate = (): boolean => {
    const result = DestinationInputSchema.safeParse({ name, description });
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: { name?: string; description?: string } = {};
    for (const issue of result.error.issues) {
      if (issue.path[0] === "name") next.name = issue.message;
      if (issue.path[0] === "description") next.description = issue.message;
    }
    setErrors(next);
    return false;
  };

  const onCreate = () => {
    if (!validate()) return;
    create({ name, description });
    setName("");
    setDescription("");
    setErrors({});
  };

  const onEdit = (id: number) => {
    const it = items.find((x) => Number((x as any).id) === id);
    if (!it) return;
    setEditingId(id);
    setName(it.name);
    setDescription(it.description);
  };

  const onUpdate = () => {
    if (editingId == null) return;
    if (!validate()) return;
    update(editingId, { name, description });
    setEditingId(null);
    setName("");
    setDescription("");
    setErrors({});
  };

  const onCancel = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setErrors({});
  };

  const onDelete = (id: number) => {
    remove(id);
    if (editingId === id) onCancel();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>LocalStorage: CRUD Zod (non-RHF)</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
        {editingId == null ? (
          <button onClick={onCreate}>Create</button>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={onUpdate}>Update</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        )}
      </div>
      <ul style={{ marginTop: "1rem" }}>
        {items.map((it) => (
          <li key={String((it as any).id ?? it.name)} role="listitem">
            <strong>{it.name}</strong> — {it.description}
            <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: "0.5rem" }}>
              <button onClick={() => onEdit(Number((it as any).id))}>Edit</button>
              <button onClick={() => onDelete(Number((it as any).id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudZodLocal;