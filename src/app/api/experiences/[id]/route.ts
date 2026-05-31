import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak: Memerlukan login admin" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { type, title, company, location, startDate, endDate, description, imageUrl, titleID, companyID, locationID, descriptionID } = body;

    const isTraining = type === "TRAINING";
    if (!title || !company || !location || !startDate || (!isTraining && !endDate) || !description) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi (kecuali tanggal selesai untuk Pelatihan dan gambar)" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.update({
      where: { id },
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
    console.error("PUT experience error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pengalaman kerja" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak: Memerlukan login admin" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Pengalaman kerja berhasil dihapus" });
  } catch (error) {
    console.error("DELETE experience error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus pengalaman kerja" },
      { status: 500 }
    );
  }
}
