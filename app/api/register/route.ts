import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Pakistani phone number: starts with 03, 10-11 digits total
const PHONE_REGEX = /^03[0-9]{9}$/;
// CNIC format: XXXXX-XXXXXXX-X
const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

const COURSES = [
  "Machine Learning",
  "Web Development",
  "PHP",
  "AI Flow / AI Automation",
  "Frontend Development",
  "Backend Development",
  "Digital Marketing",
  "Cybersecurity",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, fatherName, phone, cnic, address, course } = body;

    // --- Validation ---
    if (!name?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!fatherName?.trim()) {
      return NextResponse.json({ error: "Father name is required." }, { status: 400 });
    }
    if (!phone?.trim() || !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid Pakistani phone number (e.g. 03001234567)." },
        { status: 400 }
      );
    }
    if (!cnic?.trim() || !CNIC_REGEX.test(cnic.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid CNIC (format: XXXXX-XXXXXXX-X)." },
        { status: 400 }
      );
    }
    if (!address?.trim()) {
      return NextResponse.json({ error: "Address is required." }, { status: 400 });
    }
    if (!course?.trim() || !COURSES.includes(course.trim())) {
      return NextResponse.json({ error: "Please select a valid course." }, { status: 400 });
    }

    // --- Save to database ---
    // NOTE: status defaults to "pending" — never automatically changed or deleted
    const registration = await prisma.registration.create({
      data: {
        name: name.trim(),
        fatherName: fatherName.trim(),
        phone: phone.trim(),
        cnic: cnic.trim(),
        address: address.trim(),
        course: course.trim(),
        // status defaults to "pending" via Prisma schema
      },
    });

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 });
  } catch (err) {
    console.error("[register] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
