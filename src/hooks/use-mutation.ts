"use client";

import { useCallback, useState } from "react";
import { ApiError } from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  useMutation — generic async-action hook for write operations.             */
/*                                                                            */
/*  Wraps any API function `(input) => Promise<Output>` and exposes           */
/*  `{ mutate, data, error, fieldErrors, loading, reset }` so components       */
/*  never deal with try/catch or loading flags by hand.                        */
/* -------------------------------------------------------------------------- */

export type MutationState<Output> = {
  data: Output | null;
  error: string | null;
  fieldErrors: Record<string, string>;
  loading: boolean;
};

export type UseMutationResult<Input, Output> = MutationState<Output> & {
  /** Runs the action. Resolves with the result, or `null` if it failed. */
  mutate: (input: Input) => Promise<Output | null>;
  reset: () => void;
};

export function useMutation<Input, Output>(
  fn: (input: Input) => Promise<Output>
): UseMutationResult<Input, Output> {
  const [state, setState] = useState<MutationState<Output>>({
    data: null,
    error: null,
    fieldErrors: {},
    loading: false,
  });

  const mutate = useCallback(
    async (input: Input): Promise<Output | null> => {
      setState((s) => ({ ...s, loading: true, error: null, fieldErrors: {} }));
      try {
        const data = await fn(input);
        setState({ data, error: null, fieldErrors: {}, loading: false });
        return data;
      } catch (err) {
        const message =
          err instanceof ApiError ? err.message : "Something went wrong.";
        const fieldErrors =
          err instanceof ApiError ? err.fieldErrors : {};
        setState({ data: null, error: message, fieldErrors, loading: false });
        return null;
      }
    },
    [fn]
  );

  const reset = useCallback(
    () => setState({ data: null, error: null, fieldErrors: {}, loading: false }),
    []
  );

  return { ...state, mutate, reset };
}
