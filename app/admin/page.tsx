import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import AdminLogin from "@/components/AdminLogin";
import AdminTable from "@/components/AdminTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Globe IT Solutions",
  description: "Manage course registrations for Globe IT Solutions.",
  robots: "noindex, nofollow", // Keep the admin page out of search results
};

// Force dynamic rendering so the page always reads fresh cookie + DB data
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // --- Auth check via HttpOnly session cookie ---
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAuthenticated = !!session && session === process.env.ADMIN_PASSWORD;

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // --- Fetch all registrations server-side ---
  // NOTE: No auto-deletion, no cron jobs. Data persists permanently in Turso.
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates to strings for client component prop
  const serialized = registrations.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  return <AdminTable initialRegistrations={serialized} />;
}
