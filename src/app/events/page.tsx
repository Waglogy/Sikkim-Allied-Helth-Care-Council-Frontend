import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import type { EventResponse } from "@/lib/api";
import { fetchEvents, eventDateParts } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meetings, workshops, camps and observances organised by the Sikkim State Allied & Healthcare Council.",
};

// Cache for up to 60s (ISR) — admin edits appear within a minute.
export const revalidate = 60;

function EventCard({ e }: { e: EventResponse }) {
  const { day, month, year, time, isPast } = eventDateParts(e.eventDate);
  const firstImage = e.images?.[0];
  const firstDoc = e.documents?.[0];

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-white p-4 sm:gap-5 sm:p-6">
      <div
        className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg sm:h-20 sm:w-20 ${
          isPast ? "bg-navy/40" : "bg-navy"
        } text-white`}
      >
        <span className="text-2xl font-semibold leading-none">{day}</span>
        <span className="mt-0.5 text-xs uppercase tracking-wide text-white/70">{month}</span>
        <span className="text-[10px] text-white/50">{year}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-navy">{e.name}</h3>
        {e.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-navy/60">{e.description}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-navy/60">
          <span className="inline-flex items-center gap-1.5 text-blue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            {time}
          </span>
          {firstDoc && (
            <a href={firstDoc} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-blue hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              Document
            </a>
          )}
        </div>
        {firstImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={firstImage} alt="" className="mt-3 h-28 w-full max-w-xs rounded-lg object-cover ring-1 ring-border" />
        )}
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events = await fetchEvents();
  const withDates = events.map((e) => ({ e, meta: eventDateParts(e.eventDate) }));
  const upcoming = withDates
    .filter((x) => !x.meta.isPast)
    .sort((a, b) => a.meta.ms - b.meta.ms)
    .map((x) => x.e);
  const past = withDates
    .filter((x) => x.meta.isPast)
    .sort((a, b) => b.meta.ms - a.meta.ms)
    .map((x) => x.e);

  return (
    <>
      <PageHeader
        crumb="Events"
        title="Events"
        subtitle="Meetings, workshops and observances organised by the Council."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-saffron">Calendar</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">Upcoming Events</h2>
        <div className="mt-8 space-y-4">
          {upcoming.map((e) => (
            <EventCard key={e.uuid} e={e} />
          ))}
          {upcoming.length === 0 && (
            <p className="rounded-xl border border-border bg-muted/40 p-6 text-center text-sm text-navy/50">
              No upcoming events at the moment.
            </p>
          )}
        </div>

        {past.length > 0 && (
          <>
            <h2 className="mt-14 font-serif text-2xl font-semibold text-navy">Past Events</h2>
            <div className="mt-8 space-y-4">
              {past.map((e) => (
                <EventCard key={e.uuid} e={e} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
