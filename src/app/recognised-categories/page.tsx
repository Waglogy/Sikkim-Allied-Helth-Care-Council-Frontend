import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Recognised Categories",
  description:
    "Recognised allied and healthcare professional categories and the professions under each, per the Schedule to the NCAHP Act, 2021.",
};

/* ---------------------------------- types --------------------------------- */

type Profession = string | { name: string; note?: string; children?: string[] };
type Group = {
  subtitle?: string;
  overview?: string[];
  professions: Profession[];
};
type Category = {
  no: string;
  title: string;
  overview: string[];
  groups: Group[];
};

/* ---------------------------------- data ---------------------------------- */

const categories: Category[] = [
  {
    no: "01",
    title: "Medical Laboratory & Life Sciences",
    overview: [
      "The Medical Laboratory and Life Sciences category includes professionals working in life sciences, scientific research and medical laboratory services.",
      "Life Science Professionals apply research and scientific knowledge relating to human and other life forms, their interactions and the environment. Medical Laboratory Sciences Professionals perform clinical tests on specimens such as blood, urine and other bodily fluids and tissues to support information about a patient's health or the cause of death.",
    ],
    groups: [
      {
        subtitle: "Life Science Professionals",
        professions: [
          "Biotechnologist",
          "Biochemist (Non-Clinical)",
          "Cell Geneticist",
          "Microbiologist (Non-Clinical)",
          "Molecular Biologist (Non-Clinical)",
          "Molecular Geneticist",
        ],
      },
      {
        subtitle: "Medical Laboratory Sciences Professionals",
        professions: [
          "Cytotechnologist",
          "Forensic Science Technologist",
          "Histotechnologist",
          "Hemato Technologist",
          "Medical Lab Technologist",
        ],
      },
    ],
  },
  {
    no: "02",
    title: "Trauma, Burn Care & Surgical / Anaesthesia-related Technology",
    overview: [
      "This category covers professionals working in trauma and burn care, as well as surgical and anaesthesia-related technology.",
      "Trauma and Burn Care Professionals provide services related to emergency and burn care and support the treatment and prevention of injuries and other physical impairments. Surgical and Anaesthesia-related Technology Professionals work as part of multidisciplinary teams in operating theatres, supporting surgical and anaesthesia teams and providing peri-operative and recovery-room support.",
    ],
    groups: [
      {
        subtitle: "Trauma and Burn Care",
        professions: [
          "Advance Care Paramedic",
          "Burn Care Technologist",
          "Emergency Medical Technologist (Paramedic)",
        ],
      },
      {
        subtitle: "Surgical & Anaesthesia-related Technology",
        professions: [
          "Anaesthesia Assistants and Technologists",
          "Operation Theatre (OT) Technologists",
          "Endoscopy and Laparoscopy Technologists",
        ],
      },
    ],
  },
  {
    no: "03",
    title: "Physiotherapy",
    overview: [
      "Physiotherapy Professionals provide examination, investigation, treatment and advice relating to movement and functional disorders, disability, healing and pain associated with trauma and disease.",
      "The profession includes the use of physical modalities such as exercise, mobilisation, manipulation, electrical and thermal agents and other electrotherapeutic approaches for prevention, screening, diagnosis, treatment, health promotion and fitness. Physiotherapists may practise independently or as part of a multidisciplinary team.",
    ],
    groups: [{ professions: ["Physiotherapist"] }],
  },
  {
    no: "04",
    title: "Nutrition Science",
    overview: [
      "Nutrition Science Professionals apply scientific approaches to assess, plan and implement programmes relating to food and nutrition.",
      "Their professional area includes promoting good health, preventing and supporting the treatment of disease, and optimising health among individuals, groups, communities and populations through knowledge and training in food and nutritional science, nutrition and dietetics.",
    ],
    groups: [
      {
        professions: [
          "Dietician",
          "Clinical Dietician",
          "Food Service Dietician",
          "Nutritionist",
          "Public Health Nutritionist",
          "Sports Nutritionist",
        ],
      },
    ],
  },
  {
    no: "05",
    title: "Ophthalmic Sciences",
    overview: [
      "Ophthalmic Sciences Professionals work in the area of eye health and disorders of the eye and visual system within their defined professional scope and level of training.",
      "The Schedule identifies Optometrists, Ophthalmic Assistants and Vision Technicians within this category.",
    ],
    groups: [
      {
        professions: ["Optometrist", "Ophthalmic Assistant", "Vision Technician"],
      },
    ],
  },
  {
    no: "06",
    title: "Occupational Therapy",
    overview: [
      "Occupational Therapy Professionals provide client-centred services focused on promoting health and well-being through occupation and enabling people to participate in everyday activities.",
      "Occupational Therapists work with individuals and communities to support participation in expected occupations and may practise independently or as part of a multidisciplinary team.",
    ],
    groups: [{ professions: ["Occupational Therapist"] }],
  },
  {
    no: "07",
    title: "Community Care, Behavioural Health Sciences & Other Professionals",
    overview: [
      "This is a broad category covering Community Care, Behavioural Health Sciences and Other Care Professionals.",
    ],
    groups: [
      {
        subtitle: "Community Care",
        overview: [
          "Primary and Community Care Professionals provide health education, referral and follow-up, case management, basic preventive healthcare and home-visiting services at the community level. They also support individuals and families in navigating health and social services and establishing referral networks.",
        ],
        professions: [
          "Environment Protection Officer",
          "Ecologist",
          "Community Health Promoter",
          "Occupational Health and Safety Officer (Inspector)",
        ],
      },
      {
        subtitle: "Behavioural Health Sciences",
        overview: [
          "Behavioural Health Sciences Professionals work in areas concerning emotions, behaviour and biological factors related to mental well-being, everyday functioning and the concept of self.",
          "The category includes professionals who provide counselling, therapy, mediation, education and support to individuals, families, groups and communities in response to social and personal difficulties.",
        ],
        professions: [
          {
            name: "Psychologist",
            note: "Except Clinical Psychologist covered under RCI for PWD",
          },
          "Behavioural Analyst",
          "Integrated Behaviour Health Counsellor",
          {
            name: "Health Educator and Counsellors, including:",
            children: [
              "Disease Counsellors",
              "Diabetes Educators",
              "Lactation Consultants",
            ],
          },
          {
            name: "Social Workers, including:",
            children: [
              "Clinical Social Worker",
              "Psychiatric Social Worker",
              "Medical Social Worker",
            ],
          },
          "HIV Counsellors / Family Planning Counsellors",
          "Mental Health Support Workers",
        ],
      },
      {
        subtitle: "Other Care Professionals",
        professions: [
          "Podiatrist",
          "Palliative Care Professionals",
          {
            name: "Movement Therapist, including:",
            children: [
              "Art Therapist",
              "Dance and Movement Therapist",
              "Recreational Therapist",
            ],
          },
        ],
      },
    ],
  },
  {
    no: "08",
    title: "Medical Radiology, Imaging & Therapeutic Technology",
    overview: [
      "This category includes professionals who work with medical imaging and therapeutic technologies.",
      "The Schedule describes professionals who test and operate radiographic, ultrasound and other medical imaging equipment to produce images used in the diagnosis and treatment of injury, disease and other impairments. It also includes professionals involved in radiation-based treatments and monitoring of patients.",
    ],
    groups: [
      {
        professions: [
          "Medical Physicist",
          "Nuclear Medicine Technologist",
          {
            name: "Radiology and Imaging Technologist, including:",
            children: [
              "Diagnostic Medical Radiographer",
              "Magnetic Resonance Imaging (MRI) Technologist",
              "Computed Tomography (CT) Technologist",
              "Mammographer",
              "Diagnostic Medical Sonographer",
            ],
          },
          "Radiotherapy Technologist",
          "Dosimetrist",
        ],
      },
    ],
  },
  {
    no: "09",
    title:
      "Medical Technologists & Physician Associate / Biomedical & Medical Equipment Technology",
    overview: [
      "This category covers professionals working across physician associate services, biomedical and medical equipment technology, cardiovascular and related clinical technologies, neuroscience, pulmonary technology and renal technology.",
    ],
    groups: [
      {
        subtitle: "Physician Associate / Physician Assistant",
        overview: [
          "Physician Associates or Physician Assistants perform basic clinical and administrative tasks in support of patient care. The Schedule describes them as professionals trained in a medical model and qualified to perform preventive, diagnostic and therapeutic services under physician supervision.",
        ],
        professions: ["Physician Associate / Physician Assistant"],
      },
      {
        subtitle: "Biomedical & Medical Equipment Technology",
        professions: ["Biomedical Engineer", "Medical Equipment Technologist"],
      },
      {
        subtitle: "Cardiovascular, Neuroscience & Pulmonary Technology",
        overview: [
          "Professionals in this area have specialised knowledge of respiratory, neurological and circulatory systems and operate complex equipment associated with these areas.",
        ],
        professions: [
          "Cardiovascular Technologist",
          "Perfusionist",
          "Respiratory Technologist",
          "Electrocardiogram (ECG) Technologist",
          "Echocardiogram (ECHO) Technologist",
          "Electroencephalogram (EEG) Technologist",
          "Electroneurodiagnostic (END) Technologist",
          "Electromyography (EMG) Technologist",
          "Neuro Lab Technologist",
          "Sleep Lab Technologist",
        ],
      },
      {
        subtitle: "Renal Technology",
        overview: [
          "Renal Technology Professionals work with dialysis therapy processes and technology to support effective dialysis treatment.",
        ],
        professions: ["Dialysis Therapy Technologist", "Urology Technologist"],
      },
    ],
  },
  {
    no: "10",
    title: "Health Information Management & Health Informatics",
    overview: [
      "Health Information Management Professionals work with health record processing, storage and retrieval systems in medical facilities and other healthcare settings.",
      "The Schedule describes the role as including the maintenance, compilation and reporting of patient information for health requirements and standards, consistent with healthcare information and coding requirements.",
    ],
    groups: [
      {
        professions: [
          {
            name: "Health Information Management Professional",
            note: "Including Medical Records Analyst",
          },
          "Health Information Management Technologist",
          "Clinical Coder",
          "Medical Secretary and Medical Transcriptionist",
        ],
      },
    ],
  },
];

/* --------------------------------- render --------------------------------- */

function Dot() {
  return (
    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden />
  );
}

function ProfessionItem({ p }: { p: Profession }) {
  if (typeof p === "string") {
    return (
      <li className="flex items-start gap-2 text-sm text-navy/80">
        <Dot />
        <span>{p}</span>
      </li>
    );
  }
  if (p.children) {
    return (
      <li className="sm:col-span-2">
        <div className="flex items-start gap-2 text-sm font-medium text-navy">
          <Dot />
          <span>{p.name}</span>
        </div>
        <ul className="ml-6 mt-2 flex flex-wrap gap-2">
          {p.children.map((c) => (
            <li
              key={c}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue"
            >
              {c}
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li className="text-sm text-navy/80">
      <div className="flex items-start gap-2">
        <Dot />
        <span>{p.name}</span>
      </div>
      {p.note && <p className="ml-6 mt-0.5 text-xs italic text-navy/50">{p.note}</p>}
    </li>
  );
}

function GroupBlock({ group }: { group: Group }) {
  const label =
    group.subtitle ??
    (group.professions.length === 1
      ? "Recognised Profession"
      : "Recognised Professions");
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-blue">
        {label}
      </h4>
      {group.overview?.map((p) => (
        <p key={p} className="mt-2 text-sm leading-relaxed text-navy/60">
          {p}
        </p>
      ))}
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {group.professions.map((p, i) => (
          <ProfessionItem key={typeof p === "string" ? p : `${p.name}-${i}`} p={p} />
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function RecognisedCategoriesPage() {
  return (
    <>
      <PageHeader
        crumb="Recognised Categories"
        title="Recognised Allied & Healthcare Professions"
        subtitle="The recognised categories of allied and healthcare professionals and the professions within each, per the Schedule to the NCAHP Act, 2021."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Introduction */}
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-navy/70 sm:text-base">
          <p>
            The National Commission for Allied and Healthcare Professions Act,
            2021 identifies recognised categories of allied and healthcare
            professionals and specifies the professions included within each
            category. These categories cover a broad range of laboratory,
            diagnostic, therapeutic, rehabilitation, community care, healthcare
            technology and health information professions.
          </p>
          <p>
            The Sikkim State Allied &amp; Healthcare Council operates within this
            regulatory framework and is responsible for the regulation and
            registration of recognised allied and healthcare professionals in the
            State.
          </p>
        </div>

        {/* Jump nav */}
        <nav className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a
              key={c.no}
              href={`#cat-${c.no}`}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy/70 transition hover:border-blue/40 hover:text-blue"
            >
              {c.no}. {c.title}
            </a>
          ))}
        </nav>

        {/* Categories */}
        <div className="mt-10 space-y-6">
          {categories.map((c) => (
            <div
              key={c.no}
              id={`cat-${c.no}`}
              className="scroll-mt-28 rounded-2xl border border-border bg-white p-6 sm:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl font-semibold text-blue/40">
                  {c.no}
                </span>
                <h2 className="font-serif text-xl font-semibold text-navy sm:text-2xl">
                  {c.title}
                </h2>
              </div>
              {c.overview.map((p) => (
                <p
                  key={p}
                  className="mt-3 text-sm leading-relaxed text-navy/70"
                >
                  {p}
                </p>
              ))}
              <div className="mt-6 space-y-6 border-t border-border pt-6">
                {c.groups.map((g, i) => (
                  <GroupBlock key={g.subtitle ?? `group-${i}`} group={g} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            Registration with SSAHC
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
            Are you a recognised Allied &amp; Healthcare Professional?
          </h2>
          <div className="mt-6 space-y-4 text-left text-sm leading-relaxed text-navy/70">
            <p>
              Professionals belonging to recognised categories may be eligible
              for registration in the State Allied and Healthcare
              Professionals&rsquo; Register, subject to the applicable
              qualifications, requirements and procedures.
            </p>
            <p>
              The NCAHP Act provides for an online and live State Register
              maintained separately for recognised categories. The Register
              includes information such as the professional&rsquo;s name and
              qualifications, as well as academic institutions, training, skills
              and competencies.
            </p>
            <p>
              A person who resides in the State and holds a recognised allied and
              healthcare qualification may apply for entry in the State Register,
              subject to the applicable requirements and prescribed fees.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/notifications"
              className="inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            >
              Register with SSAHC
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/notifications"
              className="inline-flex items-center gap-2 rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Registration Requirements
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
