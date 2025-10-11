import { useEffect, useState } from "react";

type Destination = { name: string; description: string };
type Data = { destinations: Destination[] };

const FetchTyped = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("data.json", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: Data = await res.json();
        setDestinations(json.destinations);
      } catch (e) {
        if ((e as any)?.name === "AbortError") return; // ignore abort
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Fetch Typed</h2>
      <p style={{ color: "#666" }}>Typed fetch with <code>AbortController</code>.</p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {destinations.map((d) => (
            <li key={d.name}>
              <strong>{d.name}</strong> — {d.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchTyped;