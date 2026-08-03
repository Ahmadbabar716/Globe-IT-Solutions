import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin password not configured." },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    // Set an HttpOnly session cookie — simple, lightweight auth
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", process.env.ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
