"use client";

import Link from "next/link";
import {
  useMembers,
  useEvents,
  useMessages,
  usePublications,
} from "@/hooks/use-admin-api";
import { useAdmin } from "@/lib/use-admin-store";
import { fmt } from "@/components/admin/panel-ui";

function StatIcon({ name }: { name: string }) {
  const p = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "users":
      return (
        <svg {...p}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
  }
}

export default function AdminDashboard() {
  const admin = useAdmin();
  const members = useMembers();
  const events = useEvents();
  const messages = useMessages();
  const publications = usePublications();

  const stats = [
    { label: "Members", icon: "users", query: members, href: "/admin/members", badge: "bg-blue-50 text-blue" },
    { label: "Events", icon: "calendar", query: events, href: "/admin/events", badge: "bg-saffron-50 text-saffron-600" },
    { label: "Messages", icon: "bell", query: messages, href: "/admin/messages", badge: "bg-blue-50 text-blue" },
    { label: "Publications", icon: "book", query: publications, href: "/admin/publications", badge: "bg-saffron-50 text-saffron-600" },
  ];

  const recentEvents = events.data ?? [];
  const recentMessages = messages.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-navy">
          Welcome back{admin?.name ? `, ${admin.name.split(" ")[0]}` : ""} 👋
        </h2>
        <p className="mt-1 text-sm text-navy/55">
          Manage the members, events, messages and publications served by the
          backend API.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="ui-card group p-5 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.badge}`}>
                <StatIcon name={s.icon} />
              </span>
              <svg className="text-navy/25 transition group-hover:translate-x-0.5 group-hover:text-blue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <p className="mt-4 font-serif text-4xl font-semibold text-navy">
              {s.query.loading ? (
                <span className="inline-block h-9 w-10 animate-pulse rounded bg-muted align-middle" />
              ) : s.query.error ? (
                "!"
              ) : (
                (s.query.data?.length ?? 0)
              )}
            </p>
            <p className="mt-1 text-sm font-medium text-navy/60">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent events */}
        <div className="ui-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-serif text-base font-semibold text-navy">Recent Events</h3>
            <Link href="/admin/events" className="text-sm font-medium text-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentEvents.slice(0, 5).map((e) => (
              <div key={e.uuid} className="flex items-center gap-3 px-5 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron-50 text-saffron-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy">{e.name}</p>
                  <p className="truncate text-xs text-navy/50">{fmt(e.eventDate)}</p>
                </div>
              </div>
            ))}
            {!events.loading && recentEvents.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-navy/50">No events yet.</p>
            )}
          </div>
        </div>

        {/* Recent messages */}
        <div className="ui-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-serif text-base font-semibold text-navy">Recent Messages</h3>
            <Link href="/admin/messages" className="text-sm font-medium text-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentMessages.slice(0, 5).map((m) => (
              <div key={m.uuid} className="flex items-start gap-3 px-5 py-3">
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    m.publishStatus ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {m.publishStatus ? "Published" : "Draft"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{m.title}</p>
                  <p className="text-xs text-navy/50">{fmt(m.publishDate)}</p>
                </div>
              </div>
            ))}
            {!messages.loading && recentMessages.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-navy/50">No messages yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
