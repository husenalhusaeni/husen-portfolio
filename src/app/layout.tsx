import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUHAMMAD SHOLEHUDIN A H | Portofolio Profesional",
  description:
    "Lulusan S1 Manajemen dengan pengalaman di bidang pelayanan jasa, khususnya di perusahaan pengelola jalan tol di Jakarta. Memiliki kemampuan analitis, terbiasa mengoperasikan komputer, serta berorientasi pada pelayanan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="app-container">
          <div className="glowing-orb orb-1"></div>
          <div className="glowing-orb orb-2"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
