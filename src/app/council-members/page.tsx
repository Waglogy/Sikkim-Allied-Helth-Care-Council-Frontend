import type { Metadata } from "next";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Council Members",
  description:
    "The members of the Sikkim State Allied & Healthcare Council, constituted under the NCAHP Act, 2021.",
};

/* ---------------------------------- data ---------------------------------- */

type Member = {
  name: string;
  role: string;
  lines?: string[];
  note?: string;
  vacant?: boolean;
};

const chairperson: Member = {
  name: "Mr. Ramesh Dahal",
  role: "Chairperson",
  lines: ["Sr. Technical Officer", "STNM Multispeciality Hospital, Gangtok"],
  note: "Mr. Ramesh Dahal serves as the Chairperson of the Sikkim State Allied & Healthcare Council under Section 22(3)(a) of the National Commission for Allied and Healthcare Professions Act, 2021.",
};

const exOfficio: Member[] = [
  {
    name: "Director (Administration) / (Medical Education)",
    role: "Ex-Officio Member",
    lines: ["Health & Family Welfare Department", "Government of Sikkim, Gangtok"],
    note: "Serves as an ex-officio member under Section 22(3)(b).",
  },
  {
    name: "Dr. Muralidhar V. Pai",
    role: "Ex-Officio Member",
    lines: [
      "Dean",
      "Sikkim Manipal Institute of Medical Sciences",
      "Tadong, Gangtok",
    ],
  },
  {
    name: "Dr. Nikita Joshi",
    role: "Ex-Officio Member",
    lines: ["Principal", "Sikkim Manipal College of Physiotherapy", "Gangtok"],
  },
];

type Category = { no: string; title: string; members: Member[]; note?: string };

const categories: Category[] = [
  {
    no: "01",
    title: "Medical Laboratory & Life Sciences",
    members: [
      {
        name: "Ms. Chokie Lepcha",
        role: "Member",
        lines: [
          "Sr. Medical Lab Technologist",
          "Department of Pathology",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
      {
        name: "Ms. Tezina Sharma",
        role: "Member",
        lines: [
          "Medical Lab Technologist",
          "SRL HIV Testing Lab, Department of Microbiology",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
    ],
  },
  {
    no: "02",
    title: "Trauma, Burn Care & Surgical / Anaesthesia-related Technology",
    members: [
      {
        name: "Mr. Tapan Pourel",
        role: "Member",
        lines: [
          "Operation Theatre Technologist",
          "Department of Anesthesiology",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
    ],
  },
  {
    no: "03",
    title: "Physiotherapy",
    members: [
      {
        name: "Dr. Binita Basnet (PT)",
        role: "Member",
        lines: [
          "Chief Physiotherapist cum HOD",
          "Department of Physiotherapy",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
      {
        name: "Dr. Pramod Kumar Pradhan (PT)",
        role: "Member",
        lines: [
          "Sr. Physiotherapist",
          "Department of Physiotherapy",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
    ],
  },
  {
    no: "04",
    title: "Nutrition Science",
    members: [
      {
        name: "Ms. Priya Sharma",
        role: "Member",
        lines: [
          "Chief Dietician cum HOD",
          "Department of Dietitics and Nutrition",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
      {
        name: "Ms. Lalita Thapa",
        role: "Member",
        lines: [
          "Sr. Dietician",
          "Department of Dietitics and Nutrition",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
    ],
  },
  {
    no: "05",
    title: "Ophthalmic Sciences",
    members: [
      {
        name: "Mr. Mukti Nath Dhamala",
        role: "Member",
        lines: ["Optometrist", "Department of Ophthalmology", "Rangpo PHC"],
      },
      {
        name: "Mr. Subash Chandra Basnet",
        role: "Member",
        lines: [
          "Sr. Ophthalmic Technician",
          "Department of Ophthalmology",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
    ],
  },
  {
    no: "06",
    title: "Occupational Therapy",
    note: "The current Office Order records both representative positions for the Occupational Therapy category as vacant.",
    members: [
      { name: "Vacant", role: "Member Position", vacant: true },
      { name: "Vacant", role: "Member Position", vacant: true },
    ],
  },
  {
    no: "07",
    title: "Community Care, Behavioural Health Sciences & Other Professionals",
    members: [
      {
        name: "Mr. Kishor Thapa",
        role: "Member",
        lines: [
          "Deputy Director (IEC) / Health Educator",
          "Department of Health & Family Welfare",
          "Government of Sikkim, Gangtok",
        ],
      },
      {
        name: "Mr. Sonam Gyaltsen Bhutia",
        role: "Member",
        lines: [
          "Deputy Director (IEC) / Health Educator",
          "Department of Health & Family Welfare",
          "Government of Sikkim, Gangtok",
        ],
      },
    ],
  },
  {
    no: "08",
    title: "Medical Radiology, Imaging & Therapeutic Technology",
    members: [
      {
        name: "Mr. Sailesh Basnet",
        role: "Member",
        lines: [
          "Sr. Radiographer",
          "Department of Radiology and Imaging",
          "STNM Multispeciality, Gangtok",
        ],
      },
      {
        name: "Mr. Dipen Gurung",
        role: "Member",
        lines: [
          "Medical Imaging Technologist",
          "Department of Radiology and Imaging",
          "STNM Multispeciality, Gangtok",
        ],
      },
    ],
  },
  {
    no: "09",
    title:
      "Medical Technologists & Physician Associate / Biomedical & Medical Equipment Technology",
    members: [
      {
        name: "Mr. Ravi Chauhan",
        role: "Member",
        lines: [
          "Sr. Biomedical Engineer",
          "Department of Biomedical",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
      {
        name: "Mr. Kiran Rai",
        role: "Member",
        lines: [
          "Cardiovascular Technologist",
          "Department of Cardiology",
          "District Hospital Namchi",
        ],
      },
    ],
  },
  {
    no: "10",
    title: "Health Information Management & Health Informatics",
    members: [
      {
        name: "Mr. Shyam Kumar Limboo",
        role: "Member",
        lines: [
          "Medical Record Technologist",
          "Department of MRD",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
      {
        name: "Mr. Bimal Adhikari",
        role: "Member",
        lines: [
          "Sr. Ward Master",
          "Department of Health and Family Welfare",
          "STNM Multispeciality Hospital, Gangtok",
        ],
      },
    ],
  },
];

/* -------------------------------- helpers --------------------------------- */

const HONORIFICS = /^(mr|mrs|ms|dr|shri|smt|prof)\.?$/i;

function initials(name: string) {
  const words = name
    .replace(/\(.*?\)/g, "") // drop parenthetical suffixes like (PT)
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

function MemberCard({ m }: { m: Member }) {
  if (m.vacant) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-navy/20 text-xl text-navy/30">
          —
        </div>
        <h3 className="mt-4 text-sm font-semibold text-navy/50">Vacant</h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-navy/40">
          {m.role}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-base font-semibold text-white">
        {initials(m.name)}
      </div>
      <h3 className="mt-4 text-base font-semibold text-navy">{m.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue">
        {m.role}
      </p>
      {m.lines && (
        <div className="mt-3 space-y-0.5 text-xs leading-relaxed text-navy/60">
          {m.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      )}
      {m.note && (
        <p className="mt-3 text-xs italic leading-relaxed text-navy/50">
          {m.note}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function CouncilMembersPage() {
  return (
    <>
      <PageHeader
        crumb="Council Members"
        title="Council Members"
        subtitle="Sikkim State Allied & Healthcare Council · Current Council Composition · 07 February 2026"
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

        {/* Current Council meta */}
        <dl className="mx-auto mt-8 grid max-w-3xl gap-4 rounded-2xl border border-border bg-muted/50 p-6 sm:grid-cols-3">
          {[
            {
              label: "Constitution of the Council",
              value: "Office Order Ref. No. 40/SSAHC/2025-2026",
            },
            { label: "Date", value: "07 February 2026" },
            {
              label: "Constituted under",
              value:
                "Section 22(3), National Commission for Allied and Healthcare Professions Act, 2021",
            },
          ].map((d) => (
            <div key={d.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-blue">
                {d.label}
              </dt>
              <dd className="mt-1 text-sm text-navy/70">{d.value}</dd>
            </div>
          ))}
        </dl>

        {/* Chairperson */}
        <div className="mt-14">
          <h2 className="text-center font-serif text-2xl font-semibold text-navy">
            Chairperson
          </h2>
          <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border border-border bg-navy text-white">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold ring-1 ring-white/20">
                {initials(chairperson.name)}
              </div>
              <div>
                <span className="inline-flex rounded-full bg-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {chairperson.role}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-semibold">
                  {chairperson.name}
                </h3>
                {chairperson.lines?.map((l) => (
                  <p key={l} className="text-sm text-white/70">
                    {l}
                  </p>
                ))}
                {chairperson.note && (
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {chairperson.note}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ex-Officio Members */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-navy">
            Ex-Officio Members
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exOfficio.map((m) => (
              <MemberCard key={m.name} m={m} />
            ))}
          </div>
        </div>

        {/* Professional Category Representatives */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-navy">
            Professional Category Representatives
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/70">
            The Council includes representatives from the recognised allied and
            healthcare professional categories specified under the NCAHP
            framework. The current Office Order lists the following
            representatives.
          </p>

          <div className="mt-8 space-y-10">
            {categories.map((c) => (
              <div key={c.no}>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl font-semibold text-blue/50">
                    {c.no}
                  </span>
                  <h3 className="text-lg font-semibold text-navy">{c.title}</h3>
                </div>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {c.members.map((m, i) => (
                    <MemberCard key={`${c.no}-${m.name}-${i}`} m={m} />
                  ))}
                </div>
                {c.note && (
                  <p className="mt-3 text-xs italic text-navy/50">{c.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Council composition — informational */}
      <section className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
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
