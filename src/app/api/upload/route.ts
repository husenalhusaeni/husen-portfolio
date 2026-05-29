import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdmin } from "@/lib/auth";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Admin
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak: Memerlukan login admin" },
        { status: 401 }
      );
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    // 3. Konversi file ke Buffer dan Base64 Data URI
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type;
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    // 4. Periksa apakah kredensial Cloudinary sudah lengkap
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.warn("Cloudinary credentials are not configured. Returning local fallback URI.");
      // Simulasi berhasil jika belum diisi, agar aplikasi tidak error
      return NextResponse.json({
        success: true,
        url: "/avatar.jpg",
        message: "Unggah disimulasikan karena Cloudinary belum dikonfigurasi di file .env",
      });
    }

    // 5. Upload ke Cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        fileUri,
        {
          folder: "portfolio-experiences",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      message: "Gambar berhasil diunggah ke Cloudinary",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengunggah gambar ke server" },
      { status: 500 }
    );
  }
}
