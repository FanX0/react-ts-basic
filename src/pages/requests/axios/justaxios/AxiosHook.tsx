import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";

type Data = {
  destinations: { name: string; description: string }[];
};

const AxiosHook = () => {
  // Use relative path so it resolves under Pages/Vite base
  const { data, loading, error, refetch } = useAxios<Data>("data.json");
  const items = useMemo(() => data?.destinations ?? [], [data]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Axios Hook</h2>
      <p style={{ color: "#666" }}>Reusable Axios hook with <code>refetch</code>.</p>
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

export default AxiosHook;