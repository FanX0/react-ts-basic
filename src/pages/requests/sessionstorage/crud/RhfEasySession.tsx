import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDestinationsSessionStorage } from "@/hooks/useDestinationsSessionStorage";
import type { DestinationInputTypeOnly } from "@/types/destination.form";

const RhfEasySession = () => {
  const { items, create, update, remove, refresh } = useDestinationsSessionStorage();
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<DestinationInputTypeOnly>({
    defaultValues: { name: "", description: "" },
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    try {
      setSubmitError(null);
      if (editingId == null) {
        await create({ name: values.name, description: values.description });
      } else {
        await update(editingId, { name: values.name, description: values.description });
        setEditingId(null);
      }
      reset({ name: "", description: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setSubmitError(message);
    }
  });

  const onEdit = (id: number) => {
    const it = items.find((x) => Number((x as any).id) === id);
    if (!it) return;
    setEditingId(id);
    setValue("name", it.name);
    setValue("description", it.description);
  };

  const onCancel = () => {
    setEditingId(null);
    reset({ name: "", description: "" });
  };

  const onDelete = (id: number) => {
    remove(id);
    if (editingId === id) onCancel();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SessionStorage: RHF Easy</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" {...register("name")} />
        <input placeholder="Description" {...register("description")} />
        {submitError && <span style={{ color: "red" }}>{submitError}</span>}
        {editingId == null ? (
          <button type="submit" disabled={isSubmitting}>Create</button>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" disabled={isSubmitting}>Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        )}
      </form>
      <div style={{ marginTop: "0.5rem" }}>
        <button type="button" onClick={refresh}>Refresh</button>
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

export default RhfEasySession;