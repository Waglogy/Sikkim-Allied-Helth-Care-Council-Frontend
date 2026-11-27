import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { fetchNotifications, shortDate, fileUrl } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "Official notifications, circulars, orders and notices published by the Sikkim State Allied & Healthcare Council.",
};

// Cache for up to 60s (ISR) — admin edits appear within a minute.
export const revalidate = 60;

export default async function NotificationsPage() {
  const notifications = await fetchNotifications();

  return (
    <>
      <PageHeader
        crumb="Notifications"
        title="Notifications"
        subtitle="Official circulars, notices and orders published by the Council. Click an item to view or download the document."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {notifications.length === 0 ? (
          <p className="rounded-xl border border-border bg-muted/40 p-6 text-center text-sm text-navy/50">
            No notifications have been published yet.
          </p>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
            {notifications.map((n) => {
              const hasDoc = !!n.document;
              return (
                <a
                  key={n.uuid}
                  href={hasDoc ? fileUrl(n.document) : undefined}
                  {...(hasDoc ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`group flex items-start gap-3 p-4 transition sm:gap-4 sm:p-5 ${
                    hasDoc ? "hover:bg-blue-50/60" : ""
                  }`}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy group-hover:text-blue">{n.title}</p>
                    <p className="mt-1 text-xs text-navy/50">
                      {shortDate(n.date)}
                      {hasDoc && " · PDF"}
                    </p>
                  </div>
                  {hasDoc && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-navy/30 transition group-hover:translate-x-0.5 group-hover:text-blue">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
