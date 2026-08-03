import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/** Validate the admin session cookie */
function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session")?.value;
  return !!session && session === process.env.ADMIN_PASSWORD;
}

/** GET /api/admin/export-pdf — generate and return a PDF of all registrations */
export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    // Fetch all registrations sorted by date
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "asc" },
    });

    // --- Build PDF ---
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const exportDate = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "long",
      timeStyle: "short",
    });

    // Header
    doc.setFillColor(13, 11, 43); // deep navy
    doc.rect(0, 0, pageWidth, 25, "F");
    doc.setTextColor(0, 229, 255); // neon cyan
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Globe IT Solutions", 15, 12);
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 220);
    doc.setFont("helvetica", "normal");
    doc.text("Registration Report", 15, 20);
    doc.text(`Exported: ${exportDate}`, pageWidth - 15, 20, { align: "right" });

    // Table
    const tableData = registrations.map((r, i) => [
      i + 1,
      r.name,
      r.fatherName,
      r.phone,
      r.cnic,
      r.address.length > 30 ? r.address.substring(0, 28) + "…" : r.address,
      r.course,
      r.status.toUpperCase(),
      new Date(r.createdAt).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi" }),
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["#", "Name", "Father Name", "Phone", "CNIC", "Address", "Course", "Status", "Date"]],
      body: tableData,
      headStyles: {
        fillColor: [26, 21, 80],
        textColor: [0, 229, 255],
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [30, 30, 60],
      },
      alternateRowStyles: { fillColor: [240, 238, 255] },
      columnStyles: {
        0: { cellWidth: 8 },
        5: { cellWidth: 40 },
        6: { cellWidth: 35 },
      },
      didDrawPage: (data) => {
        // Footer with page numbers
        const pageCount = (doc as jsPDF & { internal: { getNumberOfPages: () => number } })
          .internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 160);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}  |  Globe IT Solutions — Confidential`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: "center" }
        );
      },
    });

    // Return the PDF as binary response
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="globe-it-registrations-${Date.now()}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err) {
    console.error("[export-pdf] Error:", err);
    return NextResponse.json({ error: "Failed to generate PDF." }, { status: 500 });
  }
}
