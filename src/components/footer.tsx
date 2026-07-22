import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About the Council", href: "/about" },
  { label: "Notifications", href: "/notifications" },
  { label: "Events", href: "/events" },
  { label: "Executive Members", href: "/members" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "Registration", href: "/notifications" },
  { label: "Acts & Rules", href: "/about" },
  { label: "Public Information (RTI)", href: "/contact" },
  { label: "Grievance Redressal", href: "/contact" },
  { label: "Downloads", href: "/notifications" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-14">
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
                <a href="mailto:info@ssahc.gov.in" className="hover:text-white">
                  info@ssahc.gov.in
                </a>
              </p>
              <p>
                <a href="tel:+913592000000" className="hover:text-white">
                  +91 3592 000 000
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Sikkim State Allied &amp; Healthcare
            Council. All rights reserved.
          </p>
          <p>An Autonomous Statutory Body</p>
        </div>
      </div>
    </footer>
  );
}
