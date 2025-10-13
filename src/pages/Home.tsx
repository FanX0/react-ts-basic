import { useEffect, useState } from "react";
import { listDestinations } from "@/services/api";
import type { Destination } from "@/types/destination";

const Home = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listDestinations();
        setDestinations(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Home</h1>
      <p style={{ color: "#666" }}>
        {(((import.meta as any).env?.VITE_USE_STATIC_DATA || "").toLowerCase() === "true") ? (
          <>
            Fetching static: <code>{((import.meta as any).env?.BASE_URL || "/") + "data.json"}</code>
          </>
        ) : (
          <>
            Fetching API: <code>{(((import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3000")) + "/destinations"}</code>
          </>
        )}
      </p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {destinations.map((d) => (
            <li key={String((d as any).id ?? d.name)}>{d.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;