import type { Metadata } from "next";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register as an Allied & Healthcare professional on the national Allied and Healthcare Professionals Registry (AHPR) portal. Documents required and instructions to applicants.",
};

const REGISTER_URL = "https://ahpr.abdm.gov.in/users/login";

const documents = [
  "Aadhaar Card Number",
  "Aadhaar Registered mobile for OTP",
  "Matric Certificate",
  "Sr. Secondary certificate",
  "Basic Qualification (Degree / Diploma)",
  "Internship certificate, if any",
];

const instructions = [
  "The application submitted is for data collection for professionals working in Allied & Health Professions.",
  "Once the online form details are filled & submitted, “No changes” will be done in the data filled.",
  "Kindly keep the required documents (listed alongside) ready before you begin.",
];

function ExternalArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function RegistrationPage() {
  return (
    <>
      <PageHeader
        crumb="Registration"
        title="Professional Registration"
        subtitle="Allied & Healthcare professionals register on the national Allied and Healthcare Professionals Registry (AHPR). You will be redirected to the official national portal to complete your registration."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Redirect notice */}
        <div className="rounded-2xl border border-border bg-navy p-6 text-white sm:p-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
                National Portal · AHPR
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Register on the National Registry
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
                Registration is carried out on the national Allied and
                Healthcare Professionals Registry portal maintained under the
                Ayushman Bharat Digital Mission. Clicking below opens the
                official portal in a new tab.
              </p>
            </div>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            >
              Register / Login on AHPR
              <ExternalArrow />
            </a>
          </div>
          <p className="mt-5 break-all text-xs text-white/50">
            Portal: {REGISTER_URL}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          {/* Instructions */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              Instructions to Applicant
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
              Before you begin
            </h2>
            <ul className="mt-6 space-y-4">
              {instructions.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-border bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-serif text-sm font-semibold text-blue">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-navy/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents required */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-muted p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                Documents Required
              </p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-navy">
                Keep these ready
              </h2>
              <ul className="mt-5 space-y-3">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="m5 12 5 5 9-9" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-navy/80">
                      {doc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          >
            Proceed to Registration
            <ExternalArrow />
          </a>
        </div>
      </section>
    </>
  );
}
