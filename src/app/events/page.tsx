import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { events, type CouncilEvent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meetings, workshops, camps and observances organised by the Sikkim State Allied & Healthcare Council.",
};

function EventCard({ e }: { e: CouncilEvent }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-white p-4 sm:gap-5 sm:p-6">
      <div
        className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg sm:h-20 sm:w-20 ${
          e.past ? "bg-navy/40" : "bg-navy"
        } text-white`}
      >
        <span className="text-2xl font-semibold leading-none">{e.day}</span>
        <span className="mt-0.5 text-xs uppercase tracking-wide text-white/70">
          {e.month}
        </span>
        <span className="text-[10px] text-white/50">{e.year}</span>
      </div>
      <div>
        <h3 className="text-base font-semibold text-navy">{e.title}</h3>
        {e.desc && (
          <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
            {e.desc}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-navy/60">
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {e.place}
          </span>
          <span className="inline-flex items-center gap-1.5 text-blue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            {e.time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const upcoming = events.filter((e) => !e.past);
  const past = events.filter((e) => e.past);

  return (
    <>
      <PageHeader
        crumb="Events"
        title="Events"
        subtitle="Meetings, workshops and observances organised by the Council."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
          Calendar
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
          Upcoming Events
        </h2>
        <div className="mt-8 space-y-4">
          {upcoming.map((e) => (
            <EventCard key={e.title} e={e} />
          ))}
        </div>

        {past.length > 0 && (
          <>
            <h2 className="mt-14 font-serif text-2xl font-semibold text-navy">
              Past Events
            </h2>
            <div className="mt-8 space-y-4">
              {past.map((e) => (
                <EventCard key={e.title} e={e} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
