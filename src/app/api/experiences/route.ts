import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error("GET experiences error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data pengalaman" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak: Memerlukan login admin" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, title, company, location, startDate, endDate, description, imageUrl, titleID, companyID, locationID, descriptionID } = body;

    const isTraining = type === "TRAINING";
    if (!title || !company || !location || !startDate || (!isTraining && !endDate) || !description) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi (kecuali tanggal selesai untuk Pelatihan dan gambar)" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        type: type || "WORK",
        title,
        company,
        location,
        startDate,
        endDate,
        description,
        imageUrl: imageUrl || "/avatar.jpg",
        titleID: titleID || title,
        companyID: companyID || company,
        locationID: locationID || location,
        descriptionID: descriptionID || description,
      },
    });

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error("POST experience error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan pengalaman kerja baru" },
      { status: 500 }
    );
  }
}
