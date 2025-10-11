import { useEffect, useState } from "react";

type Destination = {
  name: string;
};

const Home = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:3000/destinations");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Destination[] = await res.json();
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
        Fetching from JSON Server: <code>http://localhost:3000/destinations</code>
      </p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {destinations.map((d, idx) => (
            <li key={idx}>{d.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;