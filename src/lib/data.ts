/* Shared content for the site. Replace with real data / CMS later. */

export type Notification = {
  date: string;
  tag: "Registration" | "Notice" | "Order" | "Circular" | "Result";
  title: string;
  href?: string;
};

export const notifications: Notification[] = [
  {
    date: "18 Jul 2026",
    tag: "Registration",
    title:
      "Opening of online registration for Allied & Healthcare professionals (2026–27)",
  },
  {
    date: "09 Jul 2026",
    tag: "Notice",
    title:
      "Verification schedule for provisional certificates — district-wise camps",
  },
  {
    date: "27 Jun 2026",
    tag: "Order",
    title: "Constitution of the Academic & Examination sub-committee",
  },
  {
    date: "14 Jun 2026",
    tag: "Circular",
    title: "Guidelines for recognition of allied healthcare institutions",
  },
  {
    date: "02 Jun 2026",
    tag: "Notice",
    title: "Public notice regarding fraudulent registration certificates",
  },
  {
    date: "21 May 2026",
    tag: "Result",
    title: "Declaration of results — provisional registration examination",
  },
  {
    date: "08 May 2026",
    tag: "Circular",
    title: "Revised fee structure for registration and renewal",
  },
  {
    date: "26 Apr 2026",
    tag: "Order",
    title: "Adoption of the code of professional conduct and ethics",
  },
];

export type CouncilEvent = {
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  desc?: string;
  past?: boolean;
};

export const events: CouncilEvent[] = [
  {
    day: "12",
    month: "Sep",
    year: "2026",
    title: "2nd Foundation Day of the Council",
    place: "Chintan Bhawan, Gangtok",
    time: "10:00 AM",
    desc: "Observance of the Council's second foundation day with felicitation of registered professionals.",
  },
  {
    day: "30",
    month: "Aug",
    year: "2026",
    title: "State-level workshop on Allied Health Education",
    place: "STNM Auditorium, Gangtok",
    time: "11:00 AM",
    desc: "A workshop bringing together institutions and faculty to align on education standards.",
  },
  {
    day: "22",
    month: "Aug",
    year: "2026",
    title: "Registration verification camp — East Sikkim",
    place: "District Hospital, Gangtok",
    time: "09:30 AM",
    desc: "On-site verification of documents for provisional registration applicants.",
  },
  {
    day: "15",
    month: "Apr",
    year: "2026",
    title: "Orientation on the code of professional conduct",
    place: "Council Office, Gangtok",
    time: "02:00 PM",
    desc: "Orientation session for newly registered members on ethics and conduct.",
    past: true,
  },
];

export type Member = {
  name: string;
  role: string;
  initials: string;
  bio?: string;
};

export const members: Member[] = [
  {
    name: "Chairperson",
    role: "Head of the Council",
    initials: "CP",
    bio: "Presides over the Council and its meetings, providing overall direction and leadership.",
  },
  {
    name: "Vice-Chairperson",
    role: "Deputy Head",
    initials: "VC",
    bio: "Assists the Chairperson and acts in their absence on Council matters.",
  },
  {
    name: "Registrar",
    role: "Chief Executive Officer",
    initials: "RG",
    bio: "Chief executive responsible for registration, records and day-to-day administration.",
  },
  {
    name: "Member Secretary",
    role: "Statutory Member",
    initials: "MS",
    bio: "Coordinates statutory functions and maintains the proceedings of the Council.",
  },
  {
    name: "Member (Academic)",
    role: "Academic Affairs",
    initials: "MA",
    bio: "Oversees curriculum recognition and academic standards for allied health courses.",
  },
  {
    name: "Member (Ethics)",
    role: "Professional Conduct",
    initials: "ME",
    bio: "Handles matters of professional ethics, conduct and disciplinary review.",
  },
  {
    name: "Member (Legal)",
    role: "Legal & Statutory Affairs",
    initials: "ML",
    bio: "Advises the Council on legal, regulatory and statutory compliance.",
  },
  {
    name: "Member (Public)",
    role: "Public Representative",
    initials: "MP",
    bio: "Represents public interest in the deliberations and decisions of the Council.",
  },
];

export const departments = [
  "Registration & Licensing",
  "Academic & Examinations",
  "Ethics & Professional Conduct",
  "Legal & Statutory Affairs",
  "Public Grievance Cell",
  "Administration & Accounts",
];
