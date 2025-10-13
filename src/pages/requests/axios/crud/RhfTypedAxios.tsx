import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDestinationsCrudAxios } from "@/hooks/useDestinationsCrudAxios";
import type { DestinationInputTypeOnly } from "@/types/destination.form";

const RhfTypedAxios = () => {
  const { items, loading, error, create, update, remove, refresh } = useDestinationsCrudAxios();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<DestinationInputTypeOnly>({
    defaultValues: { name: "", description: "" },
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit = async (values: DestinationInputTypeOnly) => {
    try {
      setSubmitError(null);
      if (editingId == null) {
        await create({ name: values.name.trim(), description: values.description.trim() });
      } else {
        await update(editingId, { name: values.name.trim(), description: values.description.trim() });
      }
      reset();
      setEditingId(null);
      await refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSubmitError(msg);
    }
  };

  const onEdit = (id: number, name: string, description: string) => {
    setEditingId(id);
    setValue("name", name);
    setValue("description", description);
  };

  const onCancel = () => {
    setEditingId(null);
    reset();
  };

  const onDelete = async (id: number) => {
    try {
      setSubmitError(null);
      await remove(id);
      if (editingId === id) onCancel();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSubmitError(msg);
      await refresh();
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD RHF Typed (Axios)</h2>
      <p style={{ color: "#666" }}>React Hook Form using TypeScript-only validation (no Zod).</p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input
          placeholder="Name"
          {...register("name", { required: "Name is required", minLength: { value: 1, message: "Name is required" } })}
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}

        <input
          placeholder="Description"
          {...register("description", { required: "Description is required", minLength: { value: 1, message: "Description is required" } })}
        />
        {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}

        {editingId ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" disabled={loading || isSubmitting}>Update</button>
            <button type="button" onClick={onCancel} disabled={loading || isSubmitting}>Cancel</button>
          </div>
        ) : (
          <button type="submit" disabled={loading || isSubmitting}>Create</button>
        )}
        <button type="button" onClick={() => reset()} disabled={loading || isSubmitting}>Reset</button>
      </form>

      {loading && <p>Working...</p>}
      {(error || submitError) && <p style={{ color: "red" }}>Error: {error ?? submitError}</p>}

      <ul style={{ marginTop: "1rem" }}>
        {items.map((i) => (
          <li key={i.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{i.name}</strong> — {i.description}
            <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: "1rem" }}>
              <button onClick={() => onEdit(i.id, i.name, i.description)} disabled={loading || isSubmitting}>Edit</button>
              <button onClick={() => onDelete(i.id)} disabled={loading || isSubmitting}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={refresh} style={{ marginTop: "0.5rem" }} disabled={loading}>Refresh</button>
    </div>
  );
};

export default RhfTypedAxios;