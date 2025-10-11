import { useEffect, useState, type ReactNode } from 'react';

type FetchProps<T> = {
  url: string;
  render: (state: { data: T | null; loading: boolean; error: string | null }) => ReactNode;
};

function DataFetcher<T>({ url, render }: FetchProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        setData(json as T);
      })
      .catch((e) => active && setError(String(e)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [url]);

  return render({ data, loading, error });
}

export default function PatternsPro() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Patterns</h2>
      <p>Render props pattern to abstract data fetching UI.</p>
      <DataFetcher<any>
        url="https://jsonplaceholder.typicode.com/todos/1"
        render={({ data, loading, error }) => (
          <div>
            {loading && <p>Loading…</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </div>
        )}
      />
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}