import { useEffect, useRef, useState, useCallback } from "react";

export type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFetch<T = unknown>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef(url);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(urlRef.current, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as T;
      setData(json);
    } catch (e) {
      if ((e as any)?.name === "AbortError") return;
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    urlRef.current = url;
    fetchData();
  }, [url, fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}