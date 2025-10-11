import { useMemo } from "react";
import { useFetch } from "../../../hooks/useFetch";

type Data = {
  destinations: { name: string; description: string }[];
};

const FetchHook = () => {
  const { data, loading, error, refetch } = useFetch<Data>("/data.json");
  const items = useMemo(() => data?.destinations ?? [], [data]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Fetch Hook</h2>
      <p style={{ color: "#666" }}>Reusable hook with <code>refetch</code>.</p>
      <button onClick={refetch} style={{ marginBottom: "0.5rem" }}>Refetch</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((d) => (
            <li key={d.name}>
              <strong>{d.name}</strong> — {d.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchHook;