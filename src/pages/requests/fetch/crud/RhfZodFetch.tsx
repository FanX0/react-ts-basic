import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDestinationsCrud } from "../../../../hooks/useDestinationsCrud";
import { DestinationInputSchema, type DestinationInput } from "../../../../schemas/destination";

const RhfZodFetch = () => {
  const { items, loading, error, create, refresh } = useDestinationsCrud();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DestinationInput>({
    resolver: zodResolver(DestinationInputSchema),
    defaultValues: { name: "", description: "" },
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: DestinationInput) => {
    setSubmitError(null);
    try {
      await create({ name: values.name.trim(), description: values.description.trim() });
      reset();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSubmitError(msg);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD RHF + Zod (Fetch)</h2>
      <p style={{ color: "#666" }}>Validation via Zod schema and resolver.</p>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
        <input placeholder="Description" {...register("description")} />
        {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
        <button type="submit" disabled={loading}>Create</button>
      </form>

      {submitError && <p style={{ color: "red" }}>Submit Error: {submitError}</p>}
      {error && <p style={{ color: "red" }}>Server Error: {error}</p>}
      {loading && <p>Working...</p>}

      <ul style={{ marginTop: "1rem" }}>
        {items.map((i) => (
          <li key={i.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{i.name}</strong> — {i.description}
          </li>
        ))}
      </ul>

      <button onClick={refresh} style={{ marginTop: "0.5rem" }} disabled={loading}>Refresh</button>
    </div>
  );
};

export default RhfZodFetch;