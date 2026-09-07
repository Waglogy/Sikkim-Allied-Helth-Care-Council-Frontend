/* -------------------------------------------------------------------------- */
/*  API types — mirror the backend DTOs                                        */
/*  (in.sikkim_allied_health_care_council.server.dto.*)                        */
/* -------------------------------------------------------------------------- */

/** Standard success envelope every endpoint wraps its payload in. */
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  /** ISO-8601 Instant, e.g. "2026-08-24T10:15:30.482Z". */
  timestamp: string;
};

/** Error envelope returned for validation (400), 404 and 409 responses. */
export type ApiErrorBody = {
  success: false;
  message: string;
  /** Field-level validation messages, e.g. { email: "email is required." }. */
  errors?: Record<string, string>;
};

/* ------------------------------- Auth ------------------------------------- */

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "MODERATOR";

export type CreateAdmin = {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
};

export type AdminResponse = {
  uuid: string;
  name: string;
  email: string;
  role: AdminRole;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  /** Signed JWT — send as `Authorization: Bearer <token>`. */
  token: string;
  admin: AdminResponse;
};

/* --------------------------- Member categories ---------------------------- */

export type CategoryType = "EXECUTIVE" | "PROFESSIONAL";

export type CreateCategory = {
  name: string;
  priority: number;
  type: CategoryType;
};

export type CategoryResponse = {
  uuid: string;
  name: string;
  priority: number;
  type: CategoryType;
  /** Members listed under this category (ordered by member priority). */
  members: MemberResponse[];
};

/* ------------------------------ Members ----------------------------------- */

export type CreateMember = {
  name: string;
  designation: string;
  photo?: string;
  description?: string;
  priority: number;
  /** UUID of the category this member falls under (optional). */
  categoryUuid?: string;
};

export type MemberResponse = {
  uuid: string;
  name: string;
  designation: string;
  photo: string | null;
  description: string | null;
  priority: number;
  categoryUuid: string | null;
  categoryName: string | null;
};

/* ------------------------------- Events ----------------------------------- */

export type CreateEvent = {
  name: string;
  description?: string;
  /** LocalDateTime — no timezone, e.g. "2026-09-01T09:30:00". */
  eventDate: string;
  images?: string[];
  documents?: string[];
  /** UUID of the authoring admin. */
  createdBy: string;
};

export type EventResponse = {
  uuid: string;
  name: string;
  description: string | null;
  eventDate: string;
  images: string[] | null;
  documents: string[] | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

/* ------------------------------ Messages ---------------------------------- */

export type CreateMessage = {
  title: string;
  description?: string;
  /** LocalDateTime — no timezone. */
  publishDate?: string;
  photo?: string;
  fileUpload?: string;
  publishStatus: boolean;
  /** Lower value = shown first. */
  priority: number;
  createdBy: string;
};

export type MessageResponse = {
  uuid: string;
  title: string;
  description: string | null;
  publishDate: string | null;
  photo: string | null;
  fileUpload: string | null;
  publishStatus: boolean;
  /** Lower value = shown first. */
  priority: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

/* ---------------------------- Publications -------------------------------- */

export type CreatePublication = {
  title: string;
  description?: string;
  publishDate?: string;
  fileUpload?: string;
  publishStatus: boolean;
  createdBy: string;
};

export type PublicationResponse = {
  uuid: string;
  title: string;
  description: string | null;
  publishDate: string | null;
  fileUpload: string | null;
  publishStatus: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

/* --------------------------- Notifications -------------------------------- */

export type CreateNotification = {
  title: string;
  document?: string;
};

export type NotificationResponse = {
  uuid: string;
  title: string;
  document: string | null;
  createdAt: string;
  updatedAt: string;
};

/* ------------------------- Submissions (public) --------------------------- */

export type CreateContact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResponse = {
  uuid: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  resolved: boolean;
  createdAt: string;
};

export type CreateGrievance = {
  name: string;
  email: string;
  phone?: string;
  registrationNumber?: string;
  category: string;
  subject: string;
  message: string;
};

export type GrievanceResponse = {
  uuid: string;
  name: string;
  email: string;
  phone: string | null;
  registrationNumber: string | null;
  category: string;
  subject: string;
  message: string;
  resolved: boolean;
  createdAt: string;
};
