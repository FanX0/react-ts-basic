import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDestinationsCrudAxios } from "../../../../hooks/useDestinationsCrudAxios";
import { DestinationInputSchema, type DestinationInput } from "../../../../schemas/destination";

const RhfProAxios = () => {
  const { items, loading, error, create, update, remove, refresh } = useDestinationsCrudAxios();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<DestinationInput>({
    resolver: zodResolver(DestinationInputSchema),
    defaultValues: { name: "", description: "" },
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onSubmit = async (values: DestinationInput) => {
    setSubmitError(null);
    try {
      if (editingId == null) {
        await create({ name: values.name.trim(), description: values.description.trim() });
      } else {
        await update(editingId, { name: values.name.trim(), description: values.description.trim() });
        setEditingId(null);
      }
      reset();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSubmitError(msg);
    }
  };

  const onEdit = (id: number, n: string, d: string) => {
    setEditingId(id);
    setValue("name", n);
    setValue("description", d);
  };

  const onCancel = () => {
    setEditingId(null);
    reset();
  };

  const onDelete = async (id: number) => {
    try {
      await remove(id);
      if (editingId === id) onCancel();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSubmitError(msg);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD RHF Pro (Axios)</h2>
      <p style={{ color: "#666" }}>Full CRUD with Zod validation, edit mode, and RHF state.</p>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
        <input placeholder="Description" {...register("description")} />
        {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" disabled={loading || isSubmitting}>{editingId ? "Update" : "Create"}</button>
          {editingId && <button type="button" onClick={onCancel} disabled={loading || isSubmitting}>Cancel</button>}
        </div>
      </form>

      {submitError && <p style={{ color: "red" }}>Submit Error: {submitError}</p>}
      {error && <p style={{ color: "red" }}>Server Error: {error}</p>}
      {(loading || isSubmitting) && <p>Working...</p>}

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

      <button onClick={refresh} style={{ marginTop: "0.5rem" }} disabled={loading || isSubmitting}>Refresh</button>
    </div>
  );
};

export default RhfProAxios;