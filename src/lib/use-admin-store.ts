"use client";

import { useSyncExternalStore } from "react";
import { setToken, clearToken, type AdminResponse } from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  Auth — real session backed by the JWT + admin profile from                 */
/*  POST /api/auth/login. The token itself is stored by the API client         */
/*  (setToken); here we persist the admin profile and expose reactive hooks.   */
/* -------------------------------------------------------------------------- */

const AUTH_KEY = "ssahc-admin:auth";
const ADMIN_KEY = "ssahc-admin:admin";
const AUTH_EVENT = "ssahc-admin:auth-change";

function subscribeAuth(cb: () => void) {
  // `storage` fires across tabs; the custom event covers same-tab changes.
  window.addEventListener("storage", cb);
  window.addEventListener(AUTH_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(AUTH_EVENT, cb);
  };
}

// Cache the parsed admin so `getSnapshot` returns a STABLE reference while the
// underlying localStorage string is unchanged. Returning a fresh object each
// call makes useSyncExternalStore believe the store changed on every render,
// which throws "The result of getSnapshot should be cached" and loops.
let adminSnapshot: { raw: string | null; value: AdminResponse | null } = {
  raw: null,
  value: null,
};

function readAdmin(): AdminResponse | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (raw === adminSnapshot.raw) return adminSnapshot.value;

  let value: AdminResponse | null = null;
  try {
    value = raw ? (JSON.parse(raw) as AdminResponse) : null;
  } catch {
    value = null;
  }
  adminSnapshot = { raw, value };
  return value;
}

/** Returns true/false on the client; false during SSR + first hydration paint. */
export function useAuthed() {
  return useSyncExternalStore(
    subscribeAuth,
    () => localStorage.getItem(AUTH_KEY) === "true",
    () => false
  );
}

/** The signed-in admin profile (uuid, name, email, role), or null. */
export function useAdmin(): AdminResponse | null {
  return useSyncExternalStore(subscribeAuth, readAdmin, () => null);
}

/** Non-reactive accessor — handy for one-off reads (e.g. `createdBy`). */
export function getAdmin(): AdminResponse | null {
  return readAdmin();
}

/** Persist a successful login: JWT (via the API client) + admin profile. */
export function signIn(token: string, admin: AdminResponse) {
  setToken(token);
  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function signOut() {
  clearToken();
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(ADMIN_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
