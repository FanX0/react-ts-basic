import { useEffect, useState, useCallback } from "react";
import type { Destination } from "@/types/destination";
import * as session from "@/services/sessionStorage";

export function useDestinationsSessionStorage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const data = session.load();
      setItems(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = (payload: Omit<Destination, "id">) => {
    const next = session.add(payload);
    setItems(next);
  };

  const update = (id: number, patch: Partial<Omit<Destination, "id">>) => {
    const next = session.update(id, patch);
    setItems(next);
  };

  const remove = (id: number) => {
    const next = session.remove(id);
    setItems(next);
  };

  return { items, loading, error, refresh, create, update, remove } as const;
}