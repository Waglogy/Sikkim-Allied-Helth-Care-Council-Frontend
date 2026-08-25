import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminRegisterForm from "@/components/admin/admin-register-form";

/* -------------------------------------------------------------------------- */
/*  /admin/register — DEVELOPMENT ONLY route.                                 */
/*                                                                            */
/*  Creating an admin is privileged, so this route must not exist in prod.    */
/*  Layered protection:                                                        */
/*    1. notFound() below → a genuine 404 whenever NODE_ENV !== development.    */
/*       `next start` (production) always runs with NODE_ENV=production, so    */
/*       the route is unreachable there.                                       */
/*    2. The form component itself refuses to render outside development.       */
/*    3. robots noindex — never crawled or indexed.                            */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRegisterPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <AdminRegisterForm />;
}
