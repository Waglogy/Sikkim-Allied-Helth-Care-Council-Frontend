import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/hero-carousel";
import {
  fetchEvents,
  fetchNotifications,
  fetchPublishedMessages,
  fetchCategories,
  eventDateParts,
  shortDate,
  fileUrl,
} from "@/lib/public-api";

// Rebuild the page at most once a minute (ISR) — fast serves, fresh within 60s.
export const revalidate = 60;

/* ---------------------------------- data ---------------------------------- */

const functions = [
  {
    title: "Professional Registration",
    desc: "Registering and licensing qualified allied and healthcare professionals across the State.",
    icon: "clipboard",
  },
  {
    title: "Education & Training Standards",
    desc: "Setting and maintaining standards for allied healthcare education and training programmes.",
    icon: "book",
  },
  {
    title: "Institutional Assessment",
    desc: "Assessing and monitoring institutions to ensure they meet the prescribed norms.",
    icon: "search",
  },
  {
    title: "Professional Ethics",
    desc: "Enforcing a code of conduct and ethical practice among registered professionals.",
    icon: "shield",
  },
  {
    title: "Course Recognition",
    desc: "Recognising qualifications and courses that meet the Council's requirements.",
    icon: "award",
  },
  {
    title: "Healthcare Standards",
    desc: "Promoting quality and safety in allied healthcare services for the public.",
    icon: "heart",
  },
];

// Recognised professional categories — per the Schedule to the NCAHP Act, 2021.
const categories = [
  {
    title: "Medical Laboratory & Life Sciences",
    desc: "Laboratory science, diagnostic testing and life science professionals.",
  },
  {
    title: "Trauma, Burn Care & Surgical / Anaesthesia Technology",
    desc: "Emergency, trauma, burn care, surgical and anaesthesia support professionals.",
  },
  {
    title: "Physiotherapy",
    desc: "Professionals supporting movement, rehabilitation, functional recovery and physical health.",
  },
  {
    title: "Nutrition Science",
    desc: "Dietetics and nutrition professionals supporting health and disease prevention.",
  },
  {
    title: "Ophthalmic Sciences",
    desc: "Professionals working in eye care, vision and ophthalmic services.",
  },
  {
    title: "Occupational Therapy",
    desc: "Professionals supporting independence, participation and everyday activities.",
  },
  {
    title: "Community Care, Behavioural Health & Other Professionals",
    desc: "Community health, behavioural health, counselling and other care professionals.",
  },
  {
    title: "Medical Radiology, Imaging & Therapeutic Technology",
    desc: "Professionals working with medical imaging, radiology and therapeutic technologies.",
  },
  {
    title:
      "Medical Technologists, Physician Associate, Biomedical & Medical Equipment Technology",
    desc: "Clinical technology, medical equipment, cardiovascular, pulmonary and renal technology professionals.",
  },
  {
    title: "Health Information Management & Health Informatics",
    desc: "Professionals managing health records, coding, information and healthcare documentation.",
  },
];

/** Two-letter initials from a name/title, for the avatar fallback. */
function messageInitials(title: string) {
  return (
    title
      .replace(/\(.*?\)/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "•"
  );
}

/* --------------------------------- icons ---------------------------------- */

function Icon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <path d="M9 2h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
          <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.2 13.4 7 22l5-3 5 3-1.2-8.6" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h6" />
        </svg>
      );
  }
}

/* ---------------------------------- page ---------------------------------- */

export default async function Home() {
  // Homepage previews — full lists live on their dedicated pages.
  const [allEvents, allNotifications, messages, memberCategories] =
    await Promise.all([
      fetchEvents(),
      fetchNotifications(),
      fetchPublishedMessages(),
      fetchCategories(),
    ]);
  const notifications = allNotifications.slice(0, 4);

  // Leadership preview — executive members ordered by priority. The first
  // (top-priority) is the chairperson shown in the featured card; the rest
  // fill the grid below. Full roster lives on /council-members.
  const executiveMembers = memberCategories
    .filter((c) => c.type === "EXECUTIVE")
    .sort((a, b) => a.priority - b.priority)
    .flatMap((c) => c.members);
  const chairperson = executiveMembers[0];
  const otherMembers = executiveMembers.slice(1);
  const events = allEvents
    .map((e) => ({ e, meta: eventDateParts(e.eventDate) }))
    .filter((x) => !x.meta.isPast)
    .sort((a, b) => a.meta.ms - b.meta.ms)
    .slice(0, 3);

  return (
    <>
      {/* Hero carousel */}
      <HeroCarousel />

      {/* About */}
      <section id="about" className="relative scroll-mt-28 overflow-hidden bg-muted">
        {/* low-transparency background decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #0f2b46 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
        <Image
          src="/SSAHC-LOGO.png"
          alt=""
          aria-hidden
          width={520}
          height={520}
          className="pointer-events-none absolute -right-20 -top-20 w-[24rem] opacity-[0.05]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
              About the Council
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              Regulating Allied &amp; Healthcare Professions in Sikkim
            </h2>
            <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-saffron" />
            <p className="mt-6 text-sm leading-relaxed text-navy/70 sm:text-base">
              The Sikkim State Allied &amp; Healthcare Council is the State-level
              statutory body responsible for regulating recognised allied and
              healthcare professions — maintaining standards of education,
              registering qualified practitioners and upholding professional
              ethics in the interest of public health.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                Read More
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { stat: "2022", label: "Established" },
              { stat: "10", label: "Categories" },
              { stat: "57", label: "Professions" },
            ].map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white/80 p-8 text-center backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron to-blue opacity-0 transition group-hover:opacity-100" />
                <p className="font-serif text-4xl font-semibold text-saffron sm:text-5xl">
                  {s.stat}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-navy/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the Council does */}
      <section
        id="functions"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <SectionHeading
          eyebrow="What the Council Does"
          title="Core Functions & Responsibilities"
          subtitle="The statutory roles the Council carries out to safeguard standards and public trust."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {functions.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue transition group-hover:bg-blue group-hover:text-white">
                <Icon name={f.icon} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recognised categories */}
      <section id="professions" className="scroll-mt-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <SectionHeading
            eyebrow="Recognised Categories"
            title="Recognised Allied & Healthcare Professions"
            subtitle="Explore the recognised allied and healthcare professions regulated under the National Commission for Allied and Healthcare Professions Act, 2021. The recognised professions are organised into 10 professional categories covering diagnostics, rehabilitation, clinical technology, community care and healthcare information services."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {categories.map((c, i) => (
              <div
                key={c.title}
                className="group flex gap-4 rounded-xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
              >
                <span className="font-serif text-2xl font-semibold leading-none text-saffron/40 transition group-hover:text-saffron">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/recognised-categories"
              className="inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            >
              View All Categories &amp; Professions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-center text-xs text-navy/50">
            The category names above follow the Schedule to the NCAHP Act, 2021.
          </p>
        </div>
      </section>

      {/* Messages from dignitaries */}
      {messages.length > 0 && (
        <section
          id="messages"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
        >
          <SectionHeading
            eyebrow="Messages"
            title="Messages from Dignitaries"
            subtitle="Words of support and vision from those guiding healthcare in the State."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {messages.map((m) => (
              <figure
                key={m.uuid}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 sm:flex-row"
              >
                <div className="shrink-0">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fileUrl(m.photo)}
                      alt={m.title}
                      className="h-20 w-20 rounded-full object-cover object-top ring-1 ring-border"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-lg font-semibold text-white">
                      {messageInitials(m.title)}
                    </div>
                  )}
                </div>
                <div>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue/20"
                    aria-hidden
                  >
                    <path d="M7.2 6C4.9 7.4 3.5 9.7 3.5 12.6c0 .3 0 .6.1.9.5-.3 1.1-.5 1.8-.5 1.7 0 3 1.3 3 3s-1.3 3.1-3.1 3.1C3.2 19.1 2 17 2 14.3 2 10 4.4 6.7 8 5l-.8 1zm9 0C13.9 7.4 12.5 9.7 12.5 12.6c0 .3 0 .6.1.9.5-.3 1.1-.5 1.8-.5 1.7 0 3 1.3 3 3s-1.3 3.1-3.1 3.1c-2.1 0-3.3-2.1-3.3-4.8 0-4.3 2.4-7.6 6-9.3L16.2 6z" />
                  </svg>
                  {m.description && (
                    <blockquote className="mt-1 text-sm leading-relaxed text-navy/70">
                      {m.description}
                    </blockquote>
                  )}
                  <figcaption className="mt-4">
                    <p className="font-serif text-base font-semibold text-navy">
                      {m.title}
                    </p>
                  </figcaption>
                  {m.fileUpload && (
                    <a
                      href={fileUrl(m.fileUpload)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-blue/30 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue transition hover:bg-blue hover:text-white"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      View / Download PDF
                    </a>
                  )}
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Council members */}
      <section id="members" className="scroll-mt-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <SectionHeading
            eyebrow="Council Members"
            title="Leadership of the Sikkim State Allied & Healthcare Council"
            subtitle="The Sikkim State Allied & Healthcare Council is constituted under the National Commission for Allied and Healthcare Professions Act, 2021. The Council brings together representatives from the State Government, medical and healthcare institutions, and recognised allied and healthcare professional categories to support effective regulation and professional standards across the State."
          />

          {/* Featured — Chairperson (top-priority executive member) */}
          {chairperson && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-navy text-white">
              <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left sm:p-10">
                {chairperson.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fileUrl(chairperson.photo)}
                    alt={chairperson.name}
                    className="h-24 w-24 shrink-0 rounded-full object-cover object-top ring-1 ring-white/20"
                  />
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold ring-1 ring-white/20">
                    {messageInitials(chairperson.name)}
                  </div>
                )}
                <div>
                  <span className="inline-flex rounded-full bg-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {chairperson.designation}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-semibold">
                    {chairperson.name}
                  </h3>
                  {chairperson.categoryName && (
                    <p className="mt-1 text-sm text-white/80">
                      {chairperson.categoryName}
                    </p>
                  )}
                  {chairperson.description && (
                    <p className="mt-1 text-sm text-white/60">
                      {chairperson.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Representative members — centered so a partial last row balances. */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {otherMembers.map((m) => (
              <div
                key={m.uuid}
                className="w-full rounded-xl border border-border bg-white p-6 text-center sm:w-72"
              >
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fileUrl(m.photo)}
                    alt={m.name}
                    className="mx-auto h-20 w-20 rounded-full object-cover object-top ring-1 ring-border"
                  />
                ) : (
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-lg font-semibold text-white">
                    {messageInitials(m.name)}
                  </div>
                )}
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-blue">{m.designation}</p>
                {m.description && (
                  <p className="mt-2 text-xs leading-relaxed text-navy/60">
                    {m.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/council-members"
              className="inline-flex items-center gap-2 rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              View All Council Members
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Notifications + Events */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Notifications */}
          <div id="notifications" className="scroll-mt-28 lg:col-span-3">
            <div className="flex items-end justify-between">
              <SectionHeading
                eyebrow="Stay informed"
                title="Latest Notifications"
                align="left"
              />
              <Link
                href="/notifications"
                className="hidden text-sm font-medium text-blue hover:underline sm:block"
              >
                View all
              </Link>
            </div>
            <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-white">
              {notifications.map((n) => (
                <Link
                  key={n.uuid}
                  href="/notifications"
                  className="group flex items-start gap-4 p-5 transition hover:bg-blue-50/60"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-navy group-hover:text-blue">
                      {n.title}
                    </p>
                    <p className="mt-1 text-xs text-navy/50">{shortDate(n.date)}</p>
                  </div>
                </Link>
              ))}
              {notifications.length === 0 && (
                <p className="p-5 text-sm text-navy/50">No notifications yet.</p>
              )}
            </div>
          </div>

          {/* Events */}
          <div id="events" className="scroll-mt-28 lg:col-span-2">
            <SectionHeading
              eyebrow="Calendar"
              title="Upcoming Events"
              align="left"
            />
            <div className="mt-8 space-y-4">
              {events.map(({ e, meta }) => (
                <div
                  key={e.uuid}
                  className="flex gap-4 rounded-xl border border-border bg-white p-5"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                    <span className="text-xl font-semibold leading-none">
                      {meta.day}
                    </span>
                    <span className="mt-0.5 text-xs uppercase tracking-wide text-white/70">
                      {meta.month}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{e.name}</p>
                    {e.description && (
                      <p className="mt-1 line-clamp-1 text-xs text-navy/60">{e.description}</p>
                    )}
                    <p className="mt-0.5 text-xs text-blue">{meta.time}</p>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="rounded-xl border border-border bg-muted/40 p-5 text-sm text-navy/50">
                  No upcoming events.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:text-left">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-white">
              Have a query or need public information?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Get in touch with the Council for registration, grievances or
              information requests.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Contact the Council
          </Link>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ shared blocks ----------------------------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-navy/60">{subtitle}</p>
      )}
    </div>
  );
}
