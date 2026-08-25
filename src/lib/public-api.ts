import type {
  EventResponse,
  NotificationResponse,
  CategoryResponse,
  MessageResponse,
} from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  Server-side fetch helpers for the PUBLIC website pages.                     */
/*                                                                            */
/*  These call the backend's public (no-auth) read endpoints from React       */
/*  Server Components. Failures degrade gracefully to an empty list so a       */
/*  page never crashes if the backend is momentarily unavailable.             */
/* -------------------------------------------------------------------------- */

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

// Cache each response for up to 60s (ISR). Admin edits appear within a minute;
// most requests are served from cache instead of hitting the backend.
async function getList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data as T[]) ?? [];
  } catch {
    return [];
  }
}

export const fetchEvents = () => getList<EventResponse>("/api/event");
export const fetchNotifications = () =>
  getList<NotificationResponse>("/api/notification");
export const fetchCategories = () => getList<CategoryResponse>("/api/category");

/** Published messages (dignitary messages / notices) — only public ones. */
export async function fetchPublishedMessages(): Promise<MessageResponse[]> {
  const all = await getList<MessageResponse>("/api/message");
  return all.filter((m) => m.publishStatus);
}

/* --------------------------------- dates ---------------------------------- */

/** Break a LocalDateTime string into the pieces the event cards render. */
export function eventDateParts(iso: string) {
  const d = new Date(iso);
  const valid = !Number.isNaN(d.getTime());
  return {
    day: valid ? String(d.getDate()).padStart(2, "0") : "--",
    month: valid ? d.toLocaleString("en-US", { month: "short" }) : "",
    year: valid ? String(d.getFullYear()) : "",
    time: valid
      ? d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      : "",
    isPast: valid ? d.getTime() < Date.now() : false,
    ms: valid ? d.getTime() : 0,
  };
}

/** "18 Jul 2026" style date for notification / list rows. */
export function shortDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
