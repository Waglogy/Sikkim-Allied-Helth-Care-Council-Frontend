import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "About the Council",
  description:
    "About the Sikkim State Allied & Healthcare Council — its statutory basis under the NCAHP Act, 2021, mandate, vision, mission and functions.",
};

const stats = [
  { stat: "2021", label: "NCAHP Act" },
  { stat: "2022", label: "Council Established" },
  { stat: "10", label: "Professional Categories" },
  { stat: "57", label: "Recognised Professions" },
];

const functions = [
  "Maintaining a State Register of allied and healthcare professionals",
  "Registering qualified practitioners and enabling renewals",
  "Recognising qualifications and institutions in line with the National Commission",
  "Prescribing and upholding standards of education, examination and training",
  "Enforcing a code of professional conduct, etiquette and ethics",
  "Taking action against professional misconduct in the public interest",
  "Advising the State Government on allied and healthcare matters",
  "Promoting the development of recognised allied and healthcare professions",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="About the Council"
        subtitle="A State-level statutory body regulating recognised allied and healthcare professions in Sikkim under the National Commission for Allied and Healthcare Professions Act, 2021."
      />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              Who we are
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
              Regulating allied &amp; healthcare professions in Sikkim
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-navy/70">
              <p>
                The Sikkim State Allied &amp; Healthcare Council is a State-level
                statutory body constituted under the National Commission for
                Allied and Healthcare Professions Act, 2021 (the &ldquo;NCAHP
                Act&rdquo;). It exercises the powers and discharges the duties
                assigned to State Allied and Healthcare Councils under the Act
                for the regulation, registration and development of recognised
                allied and healthcare professions across the State.
              </p>
              <p>
                The Council brings together representatives from the State
                Government, medical and healthcare institutions, and the
                recognised allied and healthcare professional categories. Working
                within the national framework set by the National Commission, it
                maintains standards of education and practice, registers
                qualified practitioners, recognises institutions and upholds a
                code of professional ethics in the interest of public health.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-white p-6 text-center"
              >
                <p className="font-serif text-3xl font-semibold text-blue">
                  {s.stat}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statutory basis */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            Statutory Basis
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
            Established under the NCAHP Act, 2021
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "National framework",
                body: "The National Commission for Allied and Healthcare Professions Act, 2021 provides for a National Commission and State Councils to regulate and standardise education and practice across recognised professions.",
              },
              {
                title: "State Council",
                body: "The composition of every State Allied and Healthcare Council is provided under Section 22 of the Act — a Chairperson, ex-officio and institutional representatives, and representatives of recognised professional categories.",
              },
              {
                title: "Recognised professions",
                body: "The Act recognises allied and healthcare professions organised into 10 professional categories, spanning diagnostics, rehabilitation, clinical technology, community care and health information services.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-border bg-white p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-navy">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
          <h3 className="font-serif text-xl font-semibold text-navy">
            Our Vision
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy/70">
            A trusted, well-regulated allied and healthcare workforce that
            delivers safe, ethical and quality care to every citizen of Sikkim,
            aligned with national standards.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
          <h3 className="font-serif text-xl font-semibold text-navy">
            Our Mission
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy/70">
            To regulate education and practice, register qualified professionals,
            recognise institutions and enforce professional standards with
            transparency and integrity, within the framework of the NCAHP Act,
            2021.
          </p>
        </div>
      </section>

      {/* Functions */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            Mandate
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
            Functions of the Council
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {functions.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-5 text-sm text-navy/80"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-blue"
                >
                  <path
                    d="M20 6 9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA to related pages */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href="/council-members"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
          >
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy">
                Council Members
              </h3>
              <p className="mt-1 text-sm text-navy/60">
                See the current composition of the Council.
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 text-blue transition group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/recognised-categories"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/5"
          >
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy">
                Recognised Categories
              </h3>
              <p className="mt-1 text-sm text-navy/60">
                Explore the 10 recognised professional categories.
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 text-blue transition group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
