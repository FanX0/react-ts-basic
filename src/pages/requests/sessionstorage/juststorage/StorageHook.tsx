import { useDestinationsSessionStorage } from "@/hooks/useDestinationsSessionStorage";

const StorageHook = () => {
  const { items, loading, error, refresh } = useDestinationsSessionStorage();

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SessionStorage: StorageHook</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button onClick={refresh}>Refresh</button>
      <ul style={{ marginTop: "1rem" }}>
        {items.map((it) => (
          <li key={String((it as any).id ?? it.name)} role="listitem">
            <strong>{it.name}</strong> — {it.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorageHook;