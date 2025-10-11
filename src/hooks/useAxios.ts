import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

export type UseAxiosResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useAxios<T = unknown>(url: string): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef(url);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<T>(urlRef.current, { signal: controller.signal });
      setData(res.data);
    } catch (e: any) {
      if (e?.name === "CanceledError" || e?.name === "AbortError") return;
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