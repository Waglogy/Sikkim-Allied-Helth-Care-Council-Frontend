import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { fetchPublishedPublications, shortDate, fileUrl } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Reports, guidelines, gazettes and other documents published by the Sikkim State Allied & Healthcare Council.",
};

// Cache for up to 60s (ISR) — admin edits appear within a minute.
export const revalidate = 60;

export default async function PublicationsPage() {
  const publications = await fetchPublishedPublications();

  return (
    <>
      <PageHeader
        crumb="Publications"
        title="Publications"
        subtitle="Reports, guidelines and other documents published by the Council. Click an item to view or download the document."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {publications.length === 0 ? (
          <p className="rounded-xl border border-border bg-muted/40 p-6 text-center text-sm text-navy/50">
            No publications have been published yet.
          </p>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
            {publications.map((p) => {
              const hasDoc = !!p.fileUpload;
              return (
                <a
                  key={p.uuid}
                  href={hasDoc ? fileUrl(p.fileUpload) : undefined}
                  {...(hasDoc ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`group flex items-start gap-3 p-4 transition sm:gap-4 sm:p-5 ${
                    hasDoc ? "hover:bg-blue-50/60" : ""
                  }`}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy group-hover:text-blue">{p.title}</p>
                    {p.description && (
                      <p className="mt-1 text-sm text-navy/65">{p.description}</p>
                    )}
                    <p className="mt-1 text-xs text-navy/50">
                      {shortDate(p.publishDate ?? p.createdAt)}
                      {hasDoc && " · Document"}
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
