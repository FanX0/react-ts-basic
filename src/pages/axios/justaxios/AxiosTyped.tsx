import { useEffect, useState } from "react";
import axios from "axios";

type Destination = { name: string; description: string };
type Data = { destinations: Destination[] };

const AxiosTyped = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        // Relative path ensures it resolves under the app's base path
        const res = await axios.get<Data>("data.json", { signal: controller.signal });
        setDestinations(res.data.destinations);
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.name === "AbortError") return;
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
      <h2>Axios Typed</h2>
      <p style={{ color: "#666" }}>Typed Axios request with <code>AbortController</code>.</p>
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

export default AxiosTyped;