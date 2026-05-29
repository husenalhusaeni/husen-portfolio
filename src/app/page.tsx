"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  imageUrl: string | null;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch("/api/experiences");
        const json = await res.json();
        if (json.success) {
          setExperiences(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat data pengalaman:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  // Ikon-Ikon SVG Kustom untuk Keahlian
  const skillIcons = {
    office: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    komunikasi: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.083.294.13.602.13.922 0 1.913-1.876 3.659-4.845 4.542a13.93 13.93 0 0 1-1.828.435 12.338 12.338 0 0 1-5.3-.266c-.347-.12-.662-.274-.945-.467a9.224 9.224 0 0 1-2.762-2.204 12.42 12.42 0 0 1-2.5-4.156c-.095-.291-.14-.593-.14-.903 0-2.507 3.208-4.529 7.747-4.529 4.538 0 7.746 2.022 7.746 4.529Zm-17.72 1.34L3 13.882c-.083.294-.13.602-.13.922 0 2.507 3.208 4.529 7.747 4.529 1.637 0 3.14-.265 4.398-.727l3.528 1.125a.75.75 0 0 0 1.012-.862l-1.3-4.156c.095-.291.14-.593.14-.903 0-.488-.12-.962-.34-1.402" />
      </svg>
    ),
    speaking: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    negosiasi: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    waktu: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    tim: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <Link href="/" className="nav-logo">
          M. SHOLEHUDIN A H
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#home">Beranda</a>
          </li>
          <li>
            <a href="#about">Tentang</a>
          </li>
          <li>
            <a href="#experience">Pengalaman</a>
          </li>
          <li>
            <a href="#contact">Kontak</a>
          </li>
        </ul>
        <Link href="/login" className="nav-admin-btn">
          Area Admin
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <span className="hero-welcome">Selamat Datang di Portofolio Saya</span>
          <h1 className="hero-name">
            Halo, Saya <br />
            <span>MUHAMMAD SHOLEHUDIN A H</span>
          </h1>
          <p className="hero-desc">
            Lulusan S1 Manajemen dengan pengalaman kerja solid di bidang pelayanan jasa, khususnya operasional pengelolaan jalan tol di Jakarta. Saya menggabungkan keahlian analitis manajemen bisnis dengan dedikasi tinggi pada pelayanan pelanggan serta siap beradaptasi di lingkungan kerja perkantoran maupun lapangan.
          </p>
          <div className="hero-actions">
            <a href="#experience" className="btn-primary">
              Lihat Pengalaman
            </a>
            <a href="#contact" className="btn-secondary">
              Hubungi Saya
            </a>
          </div>
        </div>
        <div className="hero-avatar-container">
          <div className="hero-avatar-wrapper">
            <Image
              src="/avatar.jpg"
              alt="Muhammad Sholehudin A H"
              width={300}
              height={300}
              className="hero-avatar"
              priority
            />
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="glass-card" style={{ padding: "60px 50px", marginBottom: "80px" }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          Tentang & Keahlian
        </h2>
        <div className="about-grid">
          <div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "20px", color: "#ffffff" }}>Profil Profesional</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
              Sebagai lulusan S1 Manajemen, saya terbiasa menyusun perencanaan strategis, menganalisis data operasional, dan mengorganisasi tim kerja secara efektif.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Pengalaman saya di perusahaan jalan tol metropolitan Jakarta mengasah ketahanan kerja di bawah tekanan tinggi, komunikasi yang lugas untuk koordinasi operasional di lapangan, serta kemampuan menyelesaikan keluhan pengguna jalan tol secara taktis, sopan, dan berorientasi pada kepuasan pelanggan.
            </p>
          </div>
          <div className="skills-container">
            <h3>Keahlian Utama</h3>
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">{skillIcons.office}</div>
                <span className="skill-name">Ms. Office</span>
              </div>
              <div className="skill-card">
                <div className="skill-icon">{skillIcons.komunikasi}</div>
                <span className="skill-name">Komunikasi Efektif</span>
              </div>
              <div className="skill-card">
                <div className="skill-icon">{skillIcons.speaking}</div>
                <span className="skill-name">Public Speaking</span>
              </div>
              <div className="skill-card">
                <div className="skill-icon">{skillIcons.negosiasi}</div>
                <span className="skill-name">Negosiasi</span>
              </div>
              <div className="skill-card">
                <div className="skill-icon">{skillIcons.waktu}</div>
                <span className="skill-name">Manajemen Waktu</span>
              </div>
              <div className="skill-card">
                <div className="skill-icon">{skillIcons.tim}</div>
                <span className="skill-name">Kerja Sama Tim</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <h2 className="section-title">Pengalaman Kerja</h2>

        <div className="timeline">
          {loading ? (
            // Loading State
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
              <span className="hero-welcome">Memuat Pengalaman Kerja...</span>
            </div>
          ) : experiences.length === 0 ? (
            // Empty State
            <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)" }}>Belum ada data pengalaman kerja.</p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "8px" }}>
                Gunakan menu Area Admin untuk menambahkan pengalaman kerja Anda.
              </p>
            </div>
          ) : (
            // Experiences Timeline
            experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card glass-card">
                  <div className="timeline-header">
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <div className="timeline-logo-wrap">
                        <Image
                          src={exp.imageUrl || "/avatar.jpg"}
                          alt={exp.company}
                          width={50}
                          height={50}
                          className="timeline-logo"
                        />
                      </div>
                      <div className="timeline-title-wrap">
                        <h3 className="timeline-job">{exp.title}</h3>
                        <span className="timeline-company">{exp.company}</span>
                      </div>
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-date">{exp.startDate} - {exp.endDate}</span>
                      <span className="timeline-location">{exp.location}</span>
                    </div>
                  </div>
                  <div className="timeline-desc">
                    {exp.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ paddingBottom: "130px" }}>
        <h2 className="section-title">Hubungi Saya</h2>
        <div className="contact-container glass-card" style={{ padding: "50px 40px" }}>
          <p className="contact-text">
            Saya sangat tertarik untuk berdiskusi mengenai peluang karier jangka panjang di bidang perkantoran (administrasi, koordinasi, manajemen) maupun di operasional lapangan. Silakan hubungi saya untuk kolaborasi profesional lebih lanjut.
          </p>
          <div className="contact-links">
            <a href="mailto:muhammadsholehudin.ah@gmail.com" className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ marginRight: "4px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Kirim Email
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} MUHAMMAD SHOLEHUDIN A H. Portofolio ini dibangun menggunakan Next.js, SQLite, Prisma, dan Cloudinary.
        </p>
      </footer>
    </>
  );
}
