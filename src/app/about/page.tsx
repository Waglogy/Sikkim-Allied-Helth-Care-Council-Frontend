import type { Metadata } from "next";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "About the Council",
  description:
    "About the Sikkim State Allied & Healthcare Council — its mandate, vision, mission and statutory functions.",
};

const functions = [
  "Registration and licensing of allied and healthcare professionals",
  "Recognition of qualifications and healthcare institutions",
  "Prescribing standards of education, examination and training",
  "Maintaining a live register of qualified practitioners",
  "Enforcing a code of professional conduct and ethics",
  "Protecting the interest of the public and patients",
];

const stats = [
  { stat: "2022", label: "Year Established" },
  { stat: "6+", label: "Departments" },
  { stat: "50+", label: "Recognised Courses" },
  { stat: "4", label: "Districts Served" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="About the Council"
        subtitle="An autonomous statutory body regulating and advancing allied and healthcare professions across the State of Sikkim."
      />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              Who we are
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
              Upholding standards in allied &amp; healthcare
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-navy/70">
              <p>
                Established in 2022, the Sikkim State Allied &amp; Healthcare
                Council is the statutory authority responsible for maintaining
                standards of education and practice for allied and healthcare
                professionals in the State. The Council registers qualified
                practitioners, recognises institutions, and upholds a code of
                professional ethics in the interest of public health.
              </p>
              <p>
                As an autonomous body, the Council works to ensure that every
                registered professional meets the required standards of
                competence and conduct, thereby safeguarding the quality and
                safety of healthcare services delivered to the public.
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

      {/* Vision & Mission */}
      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-8">
            <h3 className="font-serif text-xl font-semibold text-navy">
              Our Vision
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              To build a trusted, well-regulated allied and healthcare workforce
              that delivers safe, ethical and quality care to every citizen of
              Sikkim.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8">
            <h3 className="font-serif text-xl font-semibold text-navy">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              To regulate education and practice, register qualified
              professionals, recognise institutions and enforce professional
              standards with transparency and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Functions */}
      <section className="mx-auto max-w-7xl px-6 py-16">
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
      </section>
    </>
  );
}
