"use client";

import Link from "next/link";
import {
  useCollection,
  seedNotifications,
  seedEvents,
  seedGallery,
  seedMessages,
} from "@/lib/use-admin-store";

export default function AdminDashboard() {
  const notifications = useCollection("notifications", seedNotifications);
  const events = useCollection("events", seedEvents);
  const gallery = useCollection("gallery", seedGallery);
  const messages = useCollection("messages", seedMessages);

  const stats = [
    { label: "Notifications", count: notifications.items.length, href: "/admin/notifications", tone: "blue" },
    { label: "Events", count: events.items.length, href: "/admin/events", tone: "saffron" },
    { label: "Gallery Items", count: gallery.items.length, href: "/admin/gallery", tone: "navy" },
    { label: "Messages", count: messages.items.length, href: "/admin/messages", tone: "blue" },
  ];

  const upcoming = events.items.filter((e) => !e.past);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-navy">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-navy/60">
          Manage the notifications, events, gallery and messages shown on the
          public website.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
          >
            <span
              className={`absolute inset-x-0 top-0 h-1 opacity-0 transition group-hover:opacity-100 ${
                s.tone === "saffron"
                  ? "bg-saffron"
                  : s.tone === "navy"
                  ? "bg-navy"
                  : "bg-blue"
              }`}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-navy/50">
              {s.label}
            </p>
            <p className="mt-2 font-serif text-4xl font-semibold text-navy">
              {s.count}
            </p>
            <p className="mt-3 text-xs font-medium text-blue">
              Manage &rarr;
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent notifications */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy">
              Recent Notifications
            </h3>
            <Link href="/admin/notifications" className="text-sm font-medium text-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {notifications.items.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-3 py-3">
                <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-blue">
                  {n.tag}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{n.title}</p>
                  <p className="text-xs text-navy/50">{n.date}</p>
                </div>
              </div>
            ))}
            {notifications.items.length === 0 && (
              <p className="py-6 text-center text-sm text-navy/50">No notifications yet.</p>
            )}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy">
              Upcoming Events
            </h3>
            <Link href="/admin/events" className="text-sm font-medium text-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcoming.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                  <span className="text-base font-semibold leading-none">{e.day}</span>
                  <span className="text-[10px] uppercase text-white/70">{e.month}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{e.title}</p>
                  <p className="truncate text-xs text-navy/50">{e.place} · {e.time}</p>
                </div>
              </div>
            ))}
            {upcoming.length === 0 && (
              <p className="py-6 text-center text-sm text-navy/50">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
