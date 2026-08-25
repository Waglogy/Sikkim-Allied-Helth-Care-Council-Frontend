"use client";

import {
  signupAdmin,
  login,
  createMember,
  listMembers,
  updateMember,
  deleteMember,
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  createMessage,
  listMessages,
  updateMessage,
  deleteMessage,
  createPublication,
  listPublications,
  updatePublication,
  deletePublication,
  createNotification,
  listNotifications,
  updateNotification,
  deleteNotification,
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
  submitContact,
  listContacts,
  setContactResolved,
  deleteContact,
  submitGrievance,
  listGrievances,
  setGrievanceResolved,
  deleteGrievance,
} from "@/lib/api";
import type {
  CreateMember,
  CreateEvent,
  CreateMessage,
  CreatePublication,
  CreateNotification,
  CreateCategory,
} from "@/lib/api";

/** Input for the resolve-toggle hooks. */
type ResolveInput = { uuid: string; resolved: boolean };
import { useMutation } from "./use-mutation";
import { useQuery } from "./use-query";

/** Input shape for the update hooks: the target UUID plus a full payload. */
type UpdateInput<T> = { uuid: string; data: T };

/* -------------------------------------------------------------------------- */
/*  Resource-specific hooks — the layer components import.                     */
/*                                                                            */
/*  Each is a thin binding of `useMutation` to one API function, so a          */
/*  component just calls e.g. `const { mutate, loading, error } =             */
/*  useCreateMember()`.                                                        */
/* -------------------------------------------------------------------------- */

/** Register a new admin — wraps POST /api/auth/signup. */
export const useAdminSignup = () => useMutation(signupAdmin);

/** Authenticate an admin — wraps POST /api/auth/login. */
export const useLogin = () => useMutation(login);

/** Create a member — wraps POST /api/member. */
export const useCreateMember = () => useMutation(createMember);

/** Create an event — wraps POST /api/event. */
export const useCreateEvent = () => useMutation(createEvent);

/** Create a message — wraps POST /api/message. */
export const useCreateMessage = () => useMutation(createMessage);

/** Create a publication — wraps POST /api/publication. */
export const useCreatePublication = () => useMutation(createPublication);

/** Create a notification — wraps POST /api/notification. */
export const useCreateNotification = () => useMutation(createNotification);

/** Create a category — wraps POST /api/category. */
export const useCreateCategory = () => useMutation(createCategory);

/* -------------------------------------------------------------------------- */
/*  Public form submissions (contact / grievance).                             */
/* -------------------------------------------------------------------------- */

/** Submit a contact message — wraps POST /api/contact (public). */
export const useSubmitContact = () => useMutation(submitContact);

/** Submit a grievance — wraps POST /api/grievance (public). */
export const useSubmitGrievance = () => useMutation(submitGrievance);

/* ---------------- Submissions — admin: read / resolve / delete ------------- */

/** List contact messages — wraps GET /api/contact. */
export const useContacts = () => useQuery(listContacts);

/** List grievances — wraps GET /api/grievance. */
export const useGrievances = () => useQuery(listGrievances);

/** Mark a contact message resolved / unresolved — PATCH /api/contact/{uuid}. */
export const useResolveContact = () =>
  useMutation((input: ResolveInput) => setContactResolved(input.uuid, input.resolved));

/** Mark a grievance resolved / unresolved — PATCH /api/grievance/{uuid}. */
export const useResolveGrievance = () =>
  useMutation((input: ResolveInput) => setGrievanceResolved(input.uuid, input.resolved));

/** Delete a contact message — wraps DELETE /api/contact/{uuid}. */
export const useDeleteContact = () => useMutation(deleteContact);

/** Delete a grievance — wraps DELETE /api/grievance/{uuid}. */
export const useDeleteGrievance = () => useMutation(deleteGrievance);

/* -------------------------------------------------------------------------- */
/*  Update hooks — wrap the PUT endpoints. `mutate({ uuid, data })`.           */
/* -------------------------------------------------------------------------- */

/** Update a member — wraps PUT /api/member/{uuid}. */
export const useUpdateMember = () =>
  useMutation((input: UpdateInput<CreateMember>) =>
    updateMember(input.uuid, input.data)
  );

/** Update an event — wraps PUT /api/event/{uuid}. */
export const useUpdateEvent = () =>
  useMutation((input: UpdateInput<CreateEvent>) =>
    updateEvent(input.uuid, input.data)
  );

/** Update a message — wraps PUT /api/message/{uuid}. */
export const useUpdateMessage = () =>
  useMutation((input: UpdateInput<CreateMessage>) =>
    updateMessage(input.uuid, input.data)
  );

/** Update a publication — wraps PUT /api/publication/{uuid}. */
export const useUpdatePublication = () =>
  useMutation((input: UpdateInput<CreatePublication>) =>
    updatePublication(input.uuid, input.data)
  );

/** Update a notification — wraps PUT /api/notification/{uuid}. */
export const useUpdateNotification = () =>
  useMutation((input: UpdateInput<CreateNotification>) =>
    updateNotification(input.uuid, input.data)
  );

/** Update a category — wraps PUT /api/category/{uuid}. */
export const useUpdateCategory = () =>
  useMutation((input: UpdateInput<CreateCategory>) =>
    updateCategory(input.uuid, input.data)
  );

/* -------------------------------------------------------------------------- */
/*  Delete hooks — wrap the DELETE endpoints. `mutate(uuid)`.                   */
/* -------------------------------------------------------------------------- */

/** Delete a member — wraps DELETE /api/member/{uuid}. */
export const useDeleteMember = () => useMutation(deleteMember);

/** Delete an event — wraps DELETE /api/event/{uuid}. */
export const useDeleteEvent = () => useMutation(deleteEvent);

/** Delete a message — wraps DELETE /api/message/{uuid}. */
export const useDeleteMessage = () => useMutation(deleteMessage);

/** Delete a publication — wraps DELETE /api/publication/{uuid}. */
export const useDeletePublication = () => useMutation(deletePublication);

/** Delete a notification — wraps DELETE /api/notification/{uuid}. */
export const useDeleteNotification = () => useMutation(deleteNotification);

/** Delete a category — wraps DELETE /api/category/{uuid}. */
export const useDeleteCategory = () => useMutation(deleteCategory);

/* -------------------------------------------------------------------------- */
/*  Read hooks — wrap the GET list endpoints. Each fetches on mount and        */
/*  exposes `{ data, loading, error, refetch }`.                               */
/* -------------------------------------------------------------------------- */

/** List members — wraps GET /api/member. */
export const useMembers = () => useQuery(listMembers);

/** List events — wraps GET /api/event. */
export const useEvents = () => useQuery(listEvents);

/** List messages — wraps GET /api/message. */
export const useMessages = () => useQuery(listMessages);

/** List publications — wraps GET /api/publication. */
export const usePublications = () => useQuery(listPublications);

/** List notifications — wraps GET /api/notification. */
export const useNotifications = () => useQuery(listNotifications);

/** List categories (each with its members) — wraps GET /api/category. */
export const useCategories = () => useQuery(listCategories);
