import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDestinationsLocalStorage } from "@/hooks/useDestinationsLocalStorage";
import { DestinationInputSchema, type DestinationInput } from "@/schemas/destination";

const RhfZodLocal = () => {
  const { items, create, update, remove, refresh } = useDestinationsLocalStorage();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<DestinationInput>({
    resolver: zodResolver(DestinationInputSchema),
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
      <h2>LocalStorage: RHF + Zod</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <span style={{ color: "red" }}>{errors.name.message as string}</span>}
        <input placeholder="Description" {...register("description")} />
        {errors.description && <span style={{ color: "red" }}>{errors.description.message as string}</span>}
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

export default RhfZodLocal;