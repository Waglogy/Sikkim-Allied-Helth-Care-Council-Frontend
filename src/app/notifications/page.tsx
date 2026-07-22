import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { notifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "Official notifications, circulars, orders and notices published by the Sikkim State Allied & Healthcare Council.",
};

const tagColor: Record<string, string> = {
  Registration: "bg-blue text-white",
  Notice: "bg-blue-50 text-blue",
  Order: "bg-navy text-white",
  Circular: "bg-blue-100 text-navy",
  Result: "bg-emerald-100 text-emerald-700",
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        crumb="Notifications"
        title="Notifications"
        subtitle="Official circulars, notices and orders published by the Council. Click an item to view or download the document."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
          {notifications.map((n) => (
            <a
              key={n.title}
              href={n.href ?? "#"}
              className="group flex items-start gap-4 p-5 transition hover:bg-blue-50/60"
            >
              <span
                className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase ${
                  tagColor[n.tag] ?? "bg-blue-50 text-blue"
                }`}
              >
                {n.tag}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy group-hover:text-blue">
                  {n.title}
                </p>
                <p className="mt-1 text-xs text-navy/50">{n.date}</p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0 text-navy/30 transition group-hover:translate-x-0.5 group-hover:text-blue"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
