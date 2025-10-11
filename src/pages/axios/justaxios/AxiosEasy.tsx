import { useEffect, useState } from "react";
import axios from "axios";

type Destination = { name: string; description: string };
type Data = { destinations: Destination[] };

const AxiosEasy = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use relative path so it works under Vite/GitHub Pages base
        const res = await axios.get<Data>("data.json");
        setItems(res.data.destinations);
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
      <h2>Axios Easy</h2>
      <p style={{ color: "#666" }}>Fetching local file: <code>/data.json</code> with Axios</p>
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

export default AxiosEasy;