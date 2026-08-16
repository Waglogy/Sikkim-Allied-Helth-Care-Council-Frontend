
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About the Council", href: "/about" },
  { label: "Recognised Categories", href: "/recognised-categories" },
  { label: "Notifications", href: "/notifications" },
  { label: "Events", href: "/events" },
  { label: "Council Members", href: "/council-members" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "Registration", href: "/registration" },
  { label: "Acts & Rules", href: "/about" },
  { label: "Grievance Redressal", href: "/grievances" },
  { label: "Downloads", href: "/notifications" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/SSAHC-LOGO.png"
                alt="Council logo"
                width={52}
                height={52}
                className="h-13 w-13 rounded-full bg-white p-1"
              />
              <div className="leading-tight">
                <p className="font-serif text-sm font-semibold text-white">
                  SSAHC
                </p>
                <p className="text-[11px] text-white/60">Estd. 2022</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              The statutory body regulating allied &amp; healthcare professions
              and education across the State of Sikkim.
            </p>

            {/* Parent national body */}
            <a
              href="https://ncahp.abdm.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 p-3 transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wide text-white/50">
                  Constituted under
                </span>
                <span className="block text-sm font-medium text-white">
                  National Commission (NCAHP)
                </span>
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-white/60"
                aria-hidden
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {resources.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <address className="mt-4 space-y-3 text-sm not-italic text-white/70">
              <p>
                Sikkim State Allied &amp; Healthcare Council,
                <br />
                Gangtok, Sikkim — 737101
              </p>
              <p>
                <a href="mailto:info@ssahc.org.in" className="hover:text-white">
                  info@ssahc.org.in
                </a>
              </p>
              <p>
                <a href="tel:+919520616531" className="hover:text-white">
                  +91 95206 16531
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center text-xs text-white/50 sm:px-6">
          <div className="flex flex-col items-center gap-x-2 gap-y-1 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Sikkim State Allied &amp; Healthcare
              Council. All rights reserved.
            </p>
            <span className="hidden text-white/25 sm:inline" aria-hidden="true">
              •
            </span>
            <p className="text-white/60">An Autonomous Statutory Body</p>
          </div>
          <p className="text-white/40">
            Designed &amp; developed by{" "}
            <a
              href="https://waglogy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 underline-offset-2 transition hover:text-white hover:underline"
            >
              Waglogy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
