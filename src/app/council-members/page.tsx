import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import type { CategoryResponse, MemberResponse } from "@/lib/api";
import { fileUrl } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Council Members",
  description:
    "The members of the Sikkim State Allied & Healthcare Council, constituted under the NCAHP Act, 2021.",
};

// Cache for up to 60s (ISR) — admin edits appear within a minute.
export const revalidate = 60;

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

async function fetchCategories(): Promise<CategoryResponse[]> {
  try {
    const res = await fetch(`${API}/api/category`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data as CategoryResponse[]) ?? [];
  } catch {
    return [];
  }
}

/* -------------------------------- helpers --------------------------------- */

const HONORIFICS = /^(mr|mrs|ms|dr|shri|smt|prof)\.?$/i;

function initials(name: string) {
  const words = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w) && !HONORIFICS.test(w));
  return (
    words
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "•"
  );
}

/* --------------------------------- cards ---------------------------------- */

function MemberCard({ m }: { m: MemberResponse }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center">
      {m.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fileUrl(m.photo)}
          alt={m.name}
          className="h-16 w-16 rounded-full object-cover object-top ring-1 ring-border"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-base font-semibold text-white">
          {initials(m.name)}
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold text-navy">{m.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-saffron">
        {m.designation}
      </p>
      {m.description && (
        <p className="mt-3 text-xs leading-relaxed text-navy/60">{m.description}</p>
      )}
    </div>
  );
}

function CategoryBlock({ c, number }: { c: CategoryResponse; number?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {number && (
          <span className="font-serif text-xl font-semibold text-blue/50">{number}</span>
        )}
        <h3 className="text-lg font-semibold text-navy">{c.name}</h3>
      </div>
      {c.members.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.members.map((m) => (
            <MemberCard key={m.uuid} m={m} />
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs italic text-navy/50">
          Positions under this category are currently vacant.
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default async function CouncilMembersPage() {
  const categories = await fetchCategories();
  const executive = categories.filter((c) => c.type === "EXECUTIVE");
  const professional = categories.filter((c) => c.type === "PROFESSIONAL");

  return (
    <>
      <PageHeader
        crumb="Council Members"
        title="Council Members"
        subtitle="Sikkim State Allied & Healthcare Council · Current Council Composition"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Intro */}
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-navy/70 sm:text-base">
          <p>
            The Sikkim State Allied &amp; Healthcare Council is constituted under
            the National Commission for Allied and Healthcare Professions Act,
            2021. The Council comprises representatives from the State
            Government, medical and healthcare institutions, and recognised
            allied and healthcare professional categories.
          </p>
          <p>
            The Council is responsible for exercising the powers and discharging
            the duties assigned to State Allied and Healthcare Councils under the
            Act, supporting the regulation, registration, professional standards
            and development of allied and healthcare professions in Sikkim.
          </p>
        </div>

        {categories.length === 0 && (
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-muted/50 p-6 text-center text-sm text-navy/60">
            Council member information is being updated. Please check back soon.
          </p>
        )}

        {/* Council Executive */}
        {executive.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Council Executive
            </h2>
            <div className="mt-8 space-y-10">
              {executive.map((c) => (
                <CategoryBlock key={c.uuid} c={c} />
              ))}
            </div>
          </div>
        )}

        {/* Professional Category Representatives */}
        {professional.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Professional Category Representatives
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/70">
              The Council includes representatives from the recognised allied and
              healthcare professional categories specified under the NCAHP
              framework.
            </p>

            <div className="mt-8 space-y-10">
              {professional.map((c, i) => (
                <CategoryBlock key={c.uuid} c={c} number={String(i + 1).padStart(2, "0")} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Council composition — informational */}
      <section className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
            Council Composition
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
            A Council Representing Allied &amp; Healthcare Professions
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy/70">
            The composition of the State Allied and Healthcare Council is
            provided under Section 22 of the National Commission for Allied and
            Healthcare Professions Act, 2021. The Act provides for a
            Chairperson, ex-officio government and medical-college
            representatives, representatives of recognised professional
            categories and representatives of charitable institutions engaged in
            education or services connected with recognised categories.
          </p>
        </div>
      </section>
    </>
  );
}
