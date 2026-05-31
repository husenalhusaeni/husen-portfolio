import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminDashboard from "./AdminDashboard";
import { Experience } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  // Ambil data langsung dari SQLite secara server-side
  const experiences = await prisma.experience.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Konversi objek database ke serializable JSON format
  const serializedExperiences = experiences.map((exp: Experience) => ({
    id: exp.id,
    type: exp.type,
    title: exp.title,
    company: exp.company,
    location: exp.location,
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: exp.description,
    imageUrl: exp.imageUrl,
  }));

  return <AdminDashboard initialExperiences={serializedExperiences} />;
}
