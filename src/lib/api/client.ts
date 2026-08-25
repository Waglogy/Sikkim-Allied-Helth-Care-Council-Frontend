import type { ApiResponse, ApiErrorBody } from "./types";

/* -------------------------------------------------------------------------- */
/*  API Client                                                                */
/*                                                                            */
/*  The single low-level layer that talks to the backend. Everything else     */
/*  (API functions, hooks, components) goes through `apiClient`. It:          */
/*    - prefixes the configured base URL                                      */
/*    - sends/parses JSON                                                     */
/*    - attaches the bearer token when present                                */
/*    - unwraps the { success, message, data } envelope and returns `data`    */
/*    - throws a typed `ApiError` on any failure                              */
/* -------------------------------------------------------------------------- */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

const TOKEN_KEY = "ssahc-admin:token";

/** Typed error thrown by the client for any non-successful response. */
export class ApiError extends Error {
  readonly status: number;
  /** Field-level validation messages, when the backend supplies them. */
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {}
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

/** Reads the persisted auth token (client-side only). */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Plain object — serialised to JSON automatically. */
  body?: unknown;
  /** Extra headers, merged over the defaults. */
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

/**
 * Perform a request and return the unwrapped `data` payload of type `T`.
 * Throws `ApiError` on network errors, non-2xx responses, or `success: false`.
 */
export async function apiClient<T>(
  path: string,
  { method = "GET", body, headers = {}, signal }: RequestOptions = {}
): Promise<T> {
  const token = getToken();

  // FormData (file uploads) must NOT be JSON-encoded, and the browser sets its
  // own multipart Content-Type (with boundary) — so we omit ours in that case.
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body:
        body === undefined
          ? undefined
          : isFormData
          ? (body as FormData)
          : JSON.stringify(body),
      signal,
    });
  } catch {
    // fetch only rejects on network / CORS failures, not HTTP error codes.
    throw new ApiError("Unable to reach the server. Please try again.", 0);
  }

  // 204 No Content and other empty bodies.
  const text = await res.text();
  const payload = text ? (JSON.parse(text) as ApiResponse<T> & ApiErrorBody) : null;

  if (!res.ok || (payload && payload.success === false)) {
    throw new ApiError(
      payload?.message ?? `Request failed (${res.status}).`,
      res.status,
      payload?.errors ?? {}
    );
  }

  return (payload?.data as T) ?? (undefined as T);
}
