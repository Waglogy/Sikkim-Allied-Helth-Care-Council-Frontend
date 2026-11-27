import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Sikkim State Allied & Healthcare Council for registration, grievances and public information requests.",
};

// Council office pin (Plus Code 8JW3+W52 Gangtok).
const MAP_LINK = "https://maps.app.goo.gl/pUGprw5XyTygbXR9A";
const MAP_EMBED =
  "https://maps.google.com/maps?q=27.3472654,88.6028906&z=17&output=embed";

const contactInfo = [
  {
    label: "Address",
    value:
      "Sikkim State Allied & Healthcare Council, New STNM Hospital Complex, NH-10, Lower Sichey, Gangtok, Sikkim — 737101",
    href: MAP_LINK,
    icon: "pin",
  },
  { label: "Email", value: "info@ssahc.org.in", href: "mailto:info@ssahc.org.in", icon: "mail" },
  { label: "Phone", value: "+91 93323 69376", href: "tel:+919332369376", icon: "phone" },
  { label: "Office Hours", value: "Mon – Fri, 10:00 AM – 4:00 PM", icon: "clock" },
];

function InfoIcon({ name }: { name: string }) {
  const p = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "mail":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
  }
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Contact the Council"
        subtitle="Get in touch for registration, grievances or public information requests."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
              Reach us
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
              Get in touch
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/60">
              For queries regarding registration, verification, grievances or
              information requests, use the details below or send us a message.
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-xl border border-border bg-white p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue">
                    <InfoIcon name={c.icon} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-navy/50">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="text-sm font-medium text-navy transition hover:text-blue break-words"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-navy break-words">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white">
              <iframe
                title="Council office location"
                src={MAP_EMBED}
                className="block h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-blue transition hover:bg-blue-50"
              >
                Open in Google Maps
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-navy">
                Send a Message
              </h2>
              <p className="mt-1 text-sm text-navy/60">
                We&apos;ll get back to you as soon as possible.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
