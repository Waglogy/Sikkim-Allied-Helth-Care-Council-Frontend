"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  useQuery — generic data-fetching hook for read (GET) operations.          */
/*                                                                            */
/*  Wraps any zero-arg API function `() => Promise<T>` and exposes            */
/*  `{ data, error, loading, refetch }`. Runs on mount and aborts in-flight   */
/*  requests on unmount to avoid setting state after teardown.                */
/* -------------------------------------------------------------------------- */

export type QueryState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export type UseQueryResult<T> = QueryState<T> & {
  /** Re-run the fetch (e.g. after creating a record). */
  refetch: () => void;
};

export function useQuery<T>(fn: () => Promise<T>): UseQueryResult<T> {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    loading: true,
  });
  // Bumping this triggers a re-fetch via the effect below.
  const [nonce, setNonce] = useState(0);

  // Flip to loading in the event handler (not the effect) and re-run the fetch.
  const refetch = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    let active = true;

    fn()
      .then((data) => {
        if (active) setState({ data, error: null, loading: false });
      })
      .catch((err) => {
        if (!active) return;
        const message =
          err instanceof ApiError ? err.message : "Unable to load data.";
        setState({ data: null, error: message, loading: false });
      });

    return () => {
      active = false;
    };
    // `fn` is a stable module-level API function; `nonce` drives manual refetch.
  }, [fn, nonce]);

  return { ...state, refetch };
}
