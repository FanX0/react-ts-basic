import { useEffect, useState, useCallback } from "react";
import type { Destination } from "@/types/destination";
import * as local from "@/services/localStorage";

export function useDestinationsLocalStorage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const data = local.load();
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
    const next = local.add(payload);
    setItems(next);
  };

  const update = (id: number, patch: Partial<Omit<Destination, "id">>) => {
    const next = local.update(id, patch);
    setItems(next);
  };

  const remove = (id: number) => {
    const next = local.remove(id);
    setItems(next);
  };

  return { items, loading, error, refresh, create, update, remove } as const;
}