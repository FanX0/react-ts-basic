import { useCallback, useEffect, useState } from "react";
import { listDestinations, createDestination, updateDestination, deleteDestination } from "@/services/api";
import type { Destination } from "@/types/destination";

export function useDestinationsCrud() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listDestinations();
      setItems(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(async (payload: Omit<Destination, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const created = await createDestination(payload);
      setItems((prev) => [...prev, created]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      // Some environments may persist data despite a 500 during file write; resync.
      await refresh();
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const update = useCallback(async (id: number, payload: Partial<Omit<Destination, "id">>) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await updateDestination(id, payload);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      await refresh();
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const remove = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteDestination(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      await refresh();
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  return { items, loading, error, refresh, create, update, remove };
}