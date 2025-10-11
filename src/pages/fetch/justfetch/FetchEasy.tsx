import { useEffect, useState } from "react";

type Destination = { name: string; description: string };
type Data = { destinations: Destination[] };

const FetchEasy = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: Data = await res.json();
        setItems(json.destinations);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Fetch Easy</h2>
      <p style={{ color: "#666" }}>Fetching local file: <code>/data.json</code></p>
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

export default FetchEasy;