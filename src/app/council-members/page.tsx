import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { members } from "@/lib/data";

export const metadata: Metadata = {
  title: "Executive Members",
  description:
    "The office bearers and executive members of the Sikkim State Allied & Healthcare Council.",
};

export default function MembersPage() {
  return (
    <>
      <PageHeader
        crumb="Executive Members"
        title="Executive Members"
        subtitle="The office bearers and members who lead, represent and govern the Council."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div
              key={m.name}
              className="flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center sm:p-8"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-xl font-semibold text-white">
                {m.initials}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy">
                {m.name}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue">
                {m.role}
              </p>
              {m.bio && (
                <p className="mt-3 text-sm leading-relaxed text-navy/60">
                  {m.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
