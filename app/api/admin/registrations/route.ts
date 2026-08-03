import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

/** Validate the admin session cookie */
function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session")?.value;
  return !!session && session === process.env.ADMIN_PASSWORD;
}

/** GET /api/admin/registrations — list all registrations */
export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ registrations });
  } catch (err) {
    console.error("[registrations GET] Error:", err);
    return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
  }
}

/** PATCH /api/admin/registrations — update a registration's status */
export async function PATCH(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !["pending", "confirmed"].includes(status)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, registration: updated });
  } catch (err) {
    console.error("[registrations PATCH] Error:", err);
    return NextResponse.json({ error: "Failed to update registration." }, { status: 500 });
  }
}
