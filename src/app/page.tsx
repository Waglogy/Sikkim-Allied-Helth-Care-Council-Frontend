import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/hero-carousel";
import {
  notifications as allNotifications,
  events as allEvents,
  members as allMembers,
  departments,
} from "@/lib/data";

/* ---------------------------------- data ---------------------------------- */

const services = [
  {
    title: "Notifications",
    desc: "Official circulars, notices and orders published by the Council.",
    href: "/notifications",
    icon: "bell",
  },
  {
    title: "Events",
    desc: "Meetings, workshops and observances organised by the Council.",
    href: "/events",
    icon: "calendar",
  },
  {
    title: "Council Information",
    desc: "Mandate, functions and statutory role of the Council.",
    href: "/about",
    icon: "info",
  },
  {
    title: "Executive Members",
    desc: "The office bearers and members steering the Council.",
    href: "/members",
    icon: "users",
  },
  {
    title: "Departments",
    desc: "Directory of departments and points of communication.",
    href: "/#departments",
    icon: "grid",
  },
  {
    title: "Public Information",
    desc: "RTI, downloads and access to public records.",
    href: "/contact",
    icon: "doc",
  },
];

// Homepage previews — full lists live on their dedicated pages.
const notifications = allNotifications.slice(0, 4);
const events = allEvents.filter((e) => !e.past).slice(0, 3);
const members = allMembers.slice(0, 4);

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

export default function Home() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              About the Council
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              Regulating Allied &amp; Healthcare Professions in Sikkim
            </h2>
            <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-blue" />
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
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue to-navy opacity-0 transition group-hover:opacity-100" />
                <p className="font-serif text-4xl font-semibold text-blue sm:text-5xl">
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

      {/* Services / focus areas */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="What we do"
          title="Services & Public Information"
          subtitle="Everything you need from the Council, organised in one place."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue transition group-hover:bg-blue group-hover:text-white">
                <Icon name={s.icon} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                {s.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue">
                Explore
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
                </svg>
              </span>
            </Link>
          ))}
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
                  key={n.title}
                  href="/notifications"
                  className="group flex items-start gap-4 p-5 transition hover:bg-blue-50/60"
                >
                  <div className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-center">
                    <p className="text-[11px] font-semibold uppercase text-blue">
                      {n.tag}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy group-hover:text-blue">
                      {n.title}
                    </p>
                    <p className="mt-1 text-xs text-navy/50">{n.date}</p>
                  </div>
                </Link>
              ))}
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
              {events.map((e) => (
                <div
                  key={e.title}
                  className="flex gap-4 rounded-xl border border-border bg-white p-5"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                    <span className="text-xl font-semibold leading-none">
                      {e.day}
                    </span>
                    <span className="mt-0.5 text-xs uppercase tracking-wide text-white/70">
                      {e.month}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{e.title}</p>
                    <p className="mt-1 text-xs text-navy/60">{e.place}</p>
                    <p className="mt-0.5 text-xs text-blue">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive members */}
      <section id="members" className="scroll-mt-28 bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Leadership"
            title="Executive Members"
            subtitle="The office bearers who lead and represent the Council."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <div
                key={m.name}
                className="rounded-xl border border-border bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-lg font-semibold text-white">
                  {m.initials}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs text-navy/60">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="Communication"
          title="Departments"
          subtitle="Reach the right department for your query or requirement."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <div
              key={d}
              className="flex items-center gap-4 rounded-xl border border-border bg-white p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-medium text-navy">{d}</p>
            </div>
          ))}
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
      <p className="text-xs font-semibold uppercase tracking-widest text-blue">
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
