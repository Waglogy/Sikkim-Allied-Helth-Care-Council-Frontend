"use client";

import { useCallback, useSyncExternalStore } from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type Id = string;

export type AdminNotification = {
  id: Id;
  date: string;
  tag: "Registration" | "Notice" | "Order" | "Circular" | "Result";
  title: string;
};

export type AdminEvent = {
  id: Id;
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  desc?: string;
  past?: boolean;
};

export type AdminGalleryItem = {
  id: Id;
  title: string;
  image: string;
  album: string;
};

export type AdminMessage = {
  id: Id;
  name: string;
  role: string;
  photo?: string;
  excerpt: string;
};

/* -------------------------------------------------------------------------- */
/*  Seed data                                                                 */
/* -------------------------------------------------------------------------- */

const uid = () => Math.random().toString(36).slice(2, 10);

export const seedNotifications: AdminNotification[] = [
  { id: "n1", date: "18 Jul 2026", tag: "Registration", title: "Opening of online registration for Allied & Healthcare professionals (2026–27)" },
  { id: "n2", date: "09 Jul 2026", tag: "Notice", title: "Verification schedule for provisional certificates — district-wise camps" },
  { id: "n3", date: "27 Jun 2026", tag: "Order", title: "Constitution of the Academic & Examination sub-committee" },
  { id: "n4", date: "14 Jun 2026", tag: "Circular", title: "Guidelines for recognition of allied healthcare institutions" },
];

export const seedEvents: AdminEvent[] = [
  { id: "e1", day: "12", month: "Sep", year: "2026", title: "2nd Foundation Day of the Council", place: "Chintan Bhawan, Gangtok", time: "10:00 AM", desc: "Observance of the Council's second foundation day." },
  { id: "e2", day: "30", month: "Aug", year: "2026", title: "State-level workshop on Allied Health Education", place: "STNM Auditorium, Gangtok", time: "11:00 AM", desc: "Aligning institutions and faculty on education standards." },
  { id: "e3", day: "15", month: "Apr", year: "2026", title: "Orientation on the code of professional conduct", place: "Council Office, Gangtok", time: "02:00 PM", desc: "Orientation for newly registered members.", past: true },
];

export const seedGallery: AdminGalleryItem[] = [
  { id: "g1", title: "Foundation Day celebration", image: "/coverimage.webp", album: "Events" },
  { id: "g2", title: "Council members group photo", image: "/nsg-C7UJ1Pu_S_I-unsplash.jpg", album: "Council" },
  { id: "g3", title: "Kanchenjunga backdrop", image: "/kunchenjunhgs.jpg", album: "Sikkim" },
];

export const seedMessages: AdminMessage[] = [
  { id: "m1", name: "Shri Prem Singh Tamang (Golay)", role: "Hon'ble Chief Minister of Sikkim", photo: "/hcm.svg", excerpt: "Our Government is committed to strengthening allied and healthcare services and upholding the highest standards of professional education and ethics across the State." },
  { id: "m2", name: "", role: "Hon'ble Health Minister", excerpt: "The Council plays a vital role in ensuring quality, accountability and ethical practice among allied and healthcare professionals in Sikkim." },
];

/* -------------------------------------------------------------------------- */
/*  External store — a localStorage-backed singleton per collection key.       */
/*  Using useSyncExternalStore keeps SSR + hydration consistent and syncs      */
/*  changes across the admin tabs.                                             */
/* -------------------------------------------------------------------------- */

type Store<T> = { data: T[]; hydrated: boolean; listeners: Set<() => void> };
const stores = new Map<string, Store<unknown>>();
const keyOf = (key: string) => `ssahc-admin:${key}`;

function getStore<T>(key: string, seed: T[]): Store<T> {
  let s = stores.get(key) as Store<T> | undefined;
  if (!s) {
    s = { data: seed, hydrated: false, listeners: new Set() };
    stores.set(key, s as Store<unknown>);
  }
  return s;
}

function hydrate<T>(key: string, seed: T[]) {
  const s = getStore(key, seed);
  if (s.hydrated) return;
  s.hydrated = true;
  try {
    const raw = localStorage.getItem(keyOf(key));
    if (raw) s.data = JSON.parse(raw) as T[];
  } catch {
    /* ignore malformed storage */
  }
}

function commit<T>(key: string, seed: T[], next: T[]) {
  const s = getStore(key, seed);
  s.hydrated = true;
  s.data = next;
  try {
    localStorage.setItem(keyOf(key), JSON.stringify(next));
  } catch {
    /* storage may be unavailable */
  }
  s.listeners.forEach((l) => l());
}

export function useCollection<T extends { id: Id }>(key: string, seed: T[]) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const s = getStore(key, seed);
      // Hydrate from localStorage the first time anyone subscribes (client only).
      if (!s.hydrated) {
        hydrate(key, seed);
        s.listeners.forEach((l) => l());
      }
      s.listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === keyOf(key)) {
          hydrate(key, seed);
          cb();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        s.listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key, seed]
  );

  const items = useSyncExternalStore(
    subscribe,
    () => getStore(key, seed).data,
    () => seed
  );

  const add = useCallback(
    (item: Omit<T, "id">) =>
      commit(key, seed, [{ ...item, id: uid() } as T, ...getStore(key, seed).data]),
    [key, seed]
  );

  const update = useCallback(
    (id: Id, patch: Partial<T>) =>
      commit(
        key,
        seed,
        getStore(key, seed).data.map((it) =>
          it.id === id ? { ...it, ...patch } : it
        )
      ),
    [key, seed]
  );

  const remove = useCallback(
    (id: Id) =>
      commit(
        key,
        seed,
        getStore(key, seed).data.filter((it) => it.id !== id)
      ),
    [key, seed]
  );

  // With useSyncExternalStore the data is always the resolved snapshot.
  return { items, add, update, remove, loaded: true };
}

/* -------------------------------------------------------------------------- */
/*  Auth — a minimal session flag (placeholder for real authentication).       */
/* -------------------------------------------------------------------------- */

const AUTH_KEY = "ssahc-admin:auth";

function subscribeAuth(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

/** Returns true/false on the client; false during SSR + first hydration paint. */
export function useAuthed() {
  return useSyncExternalStore(
    subscribeAuth,
    () => localStorage.getItem(AUTH_KEY) === "true",
    () => false
  );
}

export function signIn() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function signOut() {
  localStorage.removeItem(AUTH_KEY);
}
