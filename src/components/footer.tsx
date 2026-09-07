
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

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Sikkim-State-Allied-Healthcare-Council/61576526097867/",
    icon: (
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
    ),
  },
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

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
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
                <a href="tel:+919332369376" className="hover:text-white">
                  +91 93323 69376
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
