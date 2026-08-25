/* -------------------------------------------------------------------------- */
/*  Public entry point for the API layer.                                     */
/*  Import from "@/lib/api" rather than reaching into individual files.        */
/* -------------------------------------------------------------------------- */

export * from "./types";
export { ApiError, getToken, setToken, clearToken } from "./client";

export { signupAdmin, login } from "./endpoints/auth";
export { uploadFile } from "./endpoints/upload";
export type { UploadResult } from "./endpoints/upload";
export {
  createMember,
  listMembers,
  getMember,
  updateMember,
  deleteMember,
} from "./endpoints/members";
export {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./endpoints/categories";
export {
  createEvent,
  listEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "./endpoints/events";
export {
  createMessage,
  listMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "./endpoints/messages";
export {
  createPublication,
  listPublications,
  getPublication,
  updatePublication,
  deletePublication,
} from "./endpoints/publications";
export {
  createNotification,
  listNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
} from "./endpoints/notifications";
export {
  submitContact,
  listContacts,
  setContactResolved,
  deleteContact,
} from "./endpoints/contact";
export {
  submitGrievance,
  listGrievances,
  setGrievanceResolved,
  deleteGrievance,
} from "./endpoints/grievances";
