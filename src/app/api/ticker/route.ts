import { NextResponse } from "next/server";
import {
  fetchNotifications,
  fetchEvents,
  fetchPublishedPublications,
  shortDate,
} from "@/lib/public-api";

/* -------------------------------------------------------------------------- */
/*  GET /api/ticker                                                            */
/*                                                                            */
/*  Aggregates the latest notifications + events into the strings shown in the */
/*  navbar marquee, plus the notification / publication counts for nav badges. */
/*                                                                            */
/*  This runs SERVER-SIDE, so it reaches the backend directly without the      */
/*  CORS / localhost issues a browser fetch hits. The underlying helpers cache */
/*  for 60s (ISR), so admin edits appear within a minute.                      */
/* -------------------------------------------------------------------------- */

export async function GET() {
  const [notifications, events, publications] = await Promise.all([
    fetchNotifications(),
    fetchEvents(),
    fetchPublishedPublications(),
  ]);

  const items = [
    ...notifications.slice(0, 6).map((n) => ({
      text: n.title,
      href: "/notifications",
    })),
    ...events.slice(0, 6).map((e) => {
      const when = shortDate(e.eventDate);
      return {
        text: when ? `${e.name} — ${when}` : e.name,
        href: "/events",
      };
    }),
  ].filter((i) => i.text);

  return NextResponse.json({
    items,
    notificationCount: notifications.length,
    publicationCount: publications.length,
  });
}
