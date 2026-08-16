import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import GrievanceForm from "@/components/grievance-form";

export const metadata: Metadata = {
  title: "Public Grievance",
  description:
    "Lodge a public grievance with the Sikkim State Allied & Healthcare Council regarding registration, certificate verification, examinations or professional conduct.",
};

const steps = [
  {
    step: "1",
    title: "Submit your grievance",
    desc: "Fill in the form with your details and a clear description of the issue.",
  },
  {
    step: "2",
    title: "Acknowledgement",
    desc: "Your grievance is recorded and acknowledged by the Council office.",
  },
  {
    step: "3",
    title: "Review & redressal",
    desc: "The concerned officer reviews the matter and responds to you.",
  },
];

export default function GrievancesPage() {
  return (
    <>
      <PageHeader
        crumb="Public Grievance"
        title="Public Grievance Redressal"
        subtitle="Have a concern regarding registration, verification, examinations or professional conduct? Lodge your grievance with the Council and we'll look into it."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* How it works */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              Grievance Redressal
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
              How it works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/60">
              The Council is committed to resolving grievances fairly and in a
              timely manner. Submit the form and track your concern to
              resolution.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-4 rounded-xl border border-border bg-white p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-serif text-lg font-semibold text-blue">
                    {s.step}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/60">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-border bg-muted p-4">
              <p className="text-xs leading-relaxed text-navy/60">
                For urgent matters you may also write to{" "}
                <a
                  href="mailto:info@ssahc.org.in"
                  className="font-medium text-blue hover:underline"
                >
                  info@ssahc.org.in
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+919520616531"
                  className="font-medium text-blue hover:underline"
                >
                  +91 95206 16531
                </a>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-navy">
                Lodge a Grievance
              </h2>
              <p className="mt-1 text-sm text-navy/60">
                All fields marked are required. Your details are kept
                confidential.
              </p>
              <div className="mt-6">
                <GrievanceForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
