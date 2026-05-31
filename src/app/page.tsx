"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations, translateItem, type Experience } from "../lib/dummyData";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<"EN" | "ID">("EN"); // Bahasa Inggris sebagai bahasa utama
  const [activeImage, setActiveImage] = useState<string | null>(null); // State Lightbox Modal
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State Hamburger Menu

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

  const t = translations[lang];

  // Filter Kategori
  const workExperiences = experiences.filter((exp) => exp.type === "WORK");
  const projects = experiences.filter((exp) => exp.type === "PROJECT");
  const trainingCertifications = experiences.filter((exp) => exp.type === "TRAINING");

  // Ikon-Ikon SVG Kustom untuk Keahlian
  const skillIcons = {
    iot: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25V18M9.75 13.5H14.25" />
      </svg>
    ),
    microcontroller: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5M15.75 3v1.5M8.25 19.5V21M12 19.5V21M15.75 19.5V21M3 8.25h1.5M3 12h1.5M3 15.75h1.5M19.5 8.25H21M19.5 12H21M19.5 15.75H21M6.75 6.75h10.5v10.5H6.75V6.75z" />
      </svg>
    ),
    hardware: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    cProgramming: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
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
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/husain.png"
            alt="Husain Logo"
            width={100}
            height={25}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Kontainer Link Menu (Rapat Kanan) */}
        <ul className={`nav-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
          <li>
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>{t.navHome}</a>
          </li>
          <li>
            <a href="#education" onClick={() => setMobileMenuOpen(false)}>{t.navEducation}</a>
          </li>
          {workExperiences.length > 0 && (
            <li>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)}>{t.navExperience}</a>
            </li>
          )}
          {trainingCertifications.length > 0 && (
            <li>
              <a href="#training" onClick={() => setMobileMenuOpen(false)}>{t.navTraining}</a>
            </li>
          )}
          <li>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>{t.navSkills}</a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.navContact}</a>
          </li>
        </ul>

        {/* Header Right Area: Language Selector & Hamburger Icon */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", zIndex: 1001 }}>
          {/* Pemilih Bahasa (Language Selector) */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <button
              onClick={() => setLang("EN")}
              className="btn-secondary"
              style={{
                padding: "4px 8px",
                fontSize: "0.75rem",
                borderColor: lang === "EN" ? "var(--accent-primary)" : "rgba(0,0,0,0.06)",
                background: lang === "EN" ? "rgba(124, 58, 237, 0.08)" : "transparent",
                color: lang === "EN" ? "var(--accent-primary)" : "var(--text-secondary)",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 700
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ID")}
              className="btn-secondary"
              style={{
                padding: "4px 8px",
                fontSize: "0.75rem",
                borderColor: lang === "ID" ? "var(--accent-primary)" : "rgba(0,0,0,0.06)",
                background: lang === "ID" ? "rgba(124, 58, 237, 0.08)" : "transparent",
                color: lang === "ID" ? "var(--accent-primary)" : "var(--text-secondary)",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 700
              }}
            >
              ID
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button
            className={`menu-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          {/* <span className="hero-welcome">{t.heroWelcome}</span> */}
          <h1 className="hero-name">
            {t.heroName}
          </h1>
          <div className="hero-subtitle">
            {t.heroSubtitle}
          </div>
          <p className="hero-desc">
            {t.heroDesc}
          </p>
          <div className="hero-actions">
            {workExperiences.length > 0 && (
              <a href="#experience" className="btn-primary">
                {t.btnExperiences}
              </a>
            )}
            <a href="#skills" className="btn-secondary">
              {lang === "EN" ? "View Skills" : "Lihat Keahlian"}
            </a>
          </div>
        </div>
      </section>

      {/* Chapter 1: Academic Background */}
      <section id="education" className="story-section">
        <div className="story-grid">
          {/* Left Side: Storytelling Narrative & Card */}
          <div className="story-content-side">
            <span className="story-chapter-badge">Chapter 1</span>
            <h2 className="story-title-h2">{t.eduTitle}</h2>

            {/* The Story of S1 Management & IT Sinergy */}
            <div className="story-narrative">
              <p>{t.aboutP1}</p>
              <p style={{ marginTop: "12px" }}>
                {lang === "EN"
                  ? "Studying Business Management provided me with core knowledge in operations and workflows. However, my passion for logic and hardware drove me to self-study Embedded Electronics and Microcontroller engineering."
                  : "Mempelajari Manajemen Bisnis membekali saya dengan pemahaman mendalam tentang manajemen operasional dan alur kerja. Namun, ketertarikan saya pada logika dan perangkat keras mendorong saya mempelajari Elektronika Tertanam (Embedded) dan mikrokontroler melalu pelatihan keentrian ketenagakerjaan."}
              </p>
            </div>

            <div className="education-card-story glass-card">
              <span className="education-period">2020 - 2025</span>
              <h3 className="education-degree-story">{t.eduDegree}</h3>
              <h4 className="education-school-story">{t.eduSchool}</h4>
              <p className="education-desc-story">
                {t.eduDesc}
              </p>
            </div>
          </div>

          {/* Right Side: Cozy Study Illustration Snapshot */}
          <div className="story-visual-side">
            <div className="polaroid-snapshot-frame">
              <div className="polaroid-img-wrap">
                <Image
                  src="/academic_story1.jpeg"
                  alt="Academic Foundation Illustration"
                  fill
                  className="polaroid-img"
                  priority
                />
              </div>
              <div className="polaroid-caption">
                <span className="handwritten-text">
                  {lang === "EN" ? "My study corner - Management" : "Sudut belajar saya - Manajemen"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Work Experience */}
      {workExperiences.length > 0 && (
        <section id="experience" className="story-section bg-soft-alt">
          <div className="story-grid story-grid-reverse">
            {/* Left Side: Work Experience Illustration Snapshot (Sticky) */}
            <div className="story-visual-side">
              <div className="polaroid-snapshot-frame">
                <div className="polaroid-img-wrap">
                  <Image
                    src="/work_story.png"
                    alt="Toll Road Operations Illustration"
                    fill
                    className="polaroid-img"
                  />
                </div>
                <div className="polaroid-caption">
                  <span className="handwritten-text">
                    {lang === "EN" ? "Jakarta Toll Road Operations HQ" : "Pusat Pengendali Operasional Jalan Tol Jakarta"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Career Timeline */}
            <div className="story-content-side">
              <span className="story-chapter-badge">Chapter 2</span>
              <h2 className="story-title-h2">{t.workTitle}</h2>

              <div className="story-narrative">
                <p>{t.aboutP2}</p>
              </div>

              <div className="timeline-story">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                    <span className="hero-welcome">Loading Experiences...</span>
                  </div>
                ) : (
                  workExperiences.map((exp) => {
                    const translated = translateItem(exp, lang);
                    // Filter projects related to this company to show dynamic achievements
                    const relatedProjects = projects.filter(
                      (proj) => proj.company.toLowerCase().includes(exp.company.toLowerCase().split(" ")[1] || "___")
                    );

                    return (
                      <div key={exp.id} className="timeline-item-story">
                        <div className="timeline-dot-story"></div>
                        <div className="timeline-card-story glass-card">
                          <div className="timeline-header-story">
                            {/* <div className="timeline-logo-wrap-story">
                              <Image
                                src={exp.imageUrl || "/avatar.jpg"}
                                alt={exp.company}
                                width={48}
                                height={48}
                                className="timeline-logo-story"
                              />
                            </div> */}
                            <div className="timeline-title-wrap-story">
                              <h3 className="timeline-job-story">{translated.title}</h3>
                              <span className="timeline-company-story">{translated.company}</span>
                              <div className="timeline-meta-story">
                                <span className="timeline-date-story">{exp.startDate} - {exp.endDate}</span>
                                <span className="timeline-location-story">{exp.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="timeline-desc-story">
                            {translated.description}
                          </div>

                          {/* Documentation Image Showcase */}
                          {exp.imageUrl && exp.imageUrl !== "/avatar.jpg" && (
                            <div className="experience-doc-wrap" onClick={() => setActiveImage(exp.imageUrl)}>
                              {/* <div className="doc-overlay">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                                </svg>
                                <span>{lang === "EN" ? "Click to view document" : "Klik untuk melihat dokumen"}</span>
                              </div> */}
                              <Image
                                src={exp.imageUrl}
                                alt="Documentation Proof"
                                width={280}
                                height={160}
                                className="experience-doc-img"
                              />
                            </div>
                          )}

                          {/* Related Tech Projects & Innovations */}
                          {relatedProjects.length > 0 && (
                            <div className="related-projects-section">
                              <h4 className="related-projects-title">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.761a.75.75 0 00-.016-1.011L15 6.75M9.813 15.904L15 11.25m-5.187 4.654l-5.885-3.53a.75.75 0 00-.77.027l.083.048z" />
                                </svg>
                                {lang === "EN" ? "Key Innovations & Projects Done Here:" : "Inovasi & Project Utama yang Diselesaikan:"}
                              </h4>
                              <div className="related-projects-grid">
                                {relatedProjects.map((proj) => {
                                  const projTranslated = translateItem(proj, lang);
                                  return (
                                    <div key={proj.id} className="related-proj-card">
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <h5 className="related-proj-title">{projTranslated.title}</h5>
                                        <span className="related-proj-date">{proj.startDate}</span>
                                      </div>
                                      <p className="related-proj-desc">{projTranslated.description}</p>
                                      {proj.imageUrl && proj.imageUrl !== "/avatar.jpg" && (
                                        <div className="related-proj-img-trigger" onClick={() => setActiveImage(proj.imageUrl)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                          {lang === "EN" ? "View system blueprint" : "Lihat rancangan sistem"}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Chapter 3: Pelatihan / Training */}
      {trainingCertifications.length > 0 && (
        <section id="training" className="story-section">
          <div className="story-grid">
            {/* Left Side: Dynamic Polaroid Corkboard Gallery */}
            <div className="story-content-side">
              <span className="story-chapter-badge">Chapter 3</span>
              <h2 className="story-title-h2">{t.trainingTitle}</h2>

              <div className="story-narrative">
                <p>
                  {lang === "EN"
                    ? "Continuous personal development is crucial to operational preparedness. I have earned industry-standard certifications in both elite electronics."
                    : "Peningkatan keahlian berkelanjutan adalah kunci kesiapan operasional di lapangan. Saya melatih diri melalui sertifikasi profesional di bidang elektornika."}
                </p>
              </div>

              <div className="training-story-grid">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                    Loading Training...
                  </div>
                ) : (
                  trainingCertifications.map((train) => {
                    const translated = translateItem(train, lang);
                    return (
                      <div key={train.id} className="training-story-card glass-card">
                        <div className="training-story-header">
                          <div className="training-story-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="training-story-title">{translated.title}</h3>
                            <span className="training-story-company">{translated.company}</span>
                            <div className="training-story-date">{train.startDate}</div>
                          </div>
                        </div>
                        <p className="training-story-desc">{translated.description}</p>
                        {train.imageUrl && train.imageUrl !== "/avatar.jpg" && (
                          <div className="training-doc-wrap" onClick={() => setActiveImage(train.imageUrl)}>
                            {/* <div className="doc-overlay">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                              </svg>
                              <span>{lang === "EN" ? "View Certificate" : "Lihat Sertifikat"}</span>
                            </div> */}
                            <Image src={train.imageUrl} alt="Certificate Document" fill className="training-doc-img" />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Side: Training & Certificates Illustration Snapshot */}
            <div className="story-visual-side">
              <div className="polaroid-snapshot-frame">
                <div className="polaroid-img-wrap">
                  <Image
                    src="/training_story.png"
                    alt="Training & Certificates Illustration"
                    fill
                    className="polaroid-img"
                  />
                </div>
                <div className="polaroid-caption">
                  <span className="handwritten-text">
                    {lang === "EN" ? "Credentials & Operational Vest" : "Sertifikat & Rompi Tanggap Darurat Lapangan"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Chapter 4: Skills Section - Gained Practical Competencies */}
      <section id="skills" className="story-section bg-soft-alt" style={{ paddingBottom: "100px" }}>
        <div className="story-grid story-grid-reverse">
          {/* Left Side: Skills IoT Illustration Snapshot */}
          <div className="story-visual-side">
            <div className="polaroid-snapshot-frame">
              <div className="polaroid-img-wrap">
                <Image
                  src="/skills_story.png"
                  alt="IoT Connectivity Illustration"
                  fill
                  className="polaroid-img"
                />
              </div>
              <div className="polaroid-caption">
                <span className="handwritten-text">
                  {lang === "EN" ? "Designing and soldering smart hardware" : "Merakit dan memprogram perangkat cerdas"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Embedded Systems, IoT, & Management Skills Grid */}
          <div className="story-content-side">
            <span className="story-chapter-badge">Chapter 4</span>
            <h2 className="story-title-h2">{t.skillsTitle}</h2>

            <div className="story-narrative">
              <p>
                {lang === "EN"
                  ? "Over the years, I've built a balanced competency structure, spanning Management, Service, and IoT Engineering, enabling me to maximize my potential based on the job description. This ranges from writing low-latency microcontroller firmware and integrating IoT sensors to leading business services with customer diplomacy, and maintaining business relationships between customers and the company in accordance with established SOPs."
                  : "Selama bertahun - tahun, saya telah membangun struktur kompetensi yang seimbang. Mulai di bidang Manajemen, Pelayanan Jasa, maupun IoT Engineer, sehingga dapat mengoptimalkan potensi yang saya miliki sesuai jobdesk yang di butuhkan. Mulai dari menulis firmware mikrokontroler latensi rendah, mengintegrasikan sensor IoT, hingga memimpin layanan bisnis dengan diplomasi pelanggan, serta dapat menjalani hubungan bisnis antara customer dan perusahaan sesuai dengan SOP yang tertera."}
              </p>
            </div>

            {/* Sub-Category 1: IoT & Embedded Systems */}
            <div className="skills-subcategory-wrap">
              <h3 className="skills-sub-title">
                <span className="glow-bullet glow-bullet-iot"></span>
                IoT & Embedded Systems
              </h3>
              <div className="skills-showcase-grid">
                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon text-iot">{skillIcons.iot}</span>
                    <span className="skill-story-name">IoT Development</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "90%", background: "var(--accent-secondary)" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon text-iot">{skillIcons.microcontroller}</span>
                    <span className="skill-story-name">Microcontrollers</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "88%", background: "var(--accent-secondary)" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon text-iot">{skillIcons.hardware}</span>
                    <span className="skill-story-name">Hardware Integration</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "85%", background: "var(--accent-secondary)" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon text-violet">{skillIcons.cProgramming}</span>
                    <span className="skill-story-name">Embedded C/C++</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "82%", background: "var(--accent-primary)" }}></div></div>
                </div>
              </div>
            </div>

            {/* Sub-Category 2: Management & Soft Skills */}
            <div className="skills-subcategory-wrap" style={{ marginTop: "35px" }}>
              <h3 className="skills-sub-title">
                <span className="glow-bullet glow-bullet-mgmt"></span>
                Management & Operations
              </h3>
              <div className="skills-showcase-grid">
                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon">{skillIcons.office}</span>
                    <span className="skill-story-name">Ms. Office</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "95%" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon">{skillIcons.komunikasi}</span>
                    <span className="skill-story-name">{lang === "EN" ? "Effective Comm" : "Komunikasi Efektif"}</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "92%" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon">{skillIcons.speaking}</span>
                    <span className="skill-story-name">Public Speaking</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "88%" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon">{skillIcons.negosiasi}</span>
                    <span className="skill-story-name">{lang === "EN" ? "Negotiation" : "Negosiasi"}</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "90%" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon">{skillIcons.waktu}</span>
                    <span className="skill-story-name">{lang === "EN" ? "Time Mgt" : "Manajemen Waktu"}</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "94%" }}></div></div>
                </div>

                <div className="skill-story-card">
                  <div className="skill-story-header">
                    <span className="skill-story-icon">{skillIcons.tim}</span>
                    <span className="skill-story-name">{lang === "EN" ? "Teamwork" : "Kerja Sama Tim"}</span>
                  </div>
                  <div className="skill-meter"><div className="skill-progress" style={{ width: "95%" }}></div></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ paddingBottom: "130px" }}>
        <h2 className="section-title">{t.contactTitle}</h2>
        <div className="contact-container glass-card" style={{ padding: "50px 40px" }}>
          <p className="contact-text">
            {t.contactText}
          </p>
          <div className="contact-links">
            <a href="mailto:husenalhusaeni8@gmail.com" className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ marginRight: "4px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              {t.btnEmail}
            </a>
            <a href="https://www.linkedin.com/in/muhammad-sholehudin-al-hussaeni-ba98801a6/?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              {t.btnLinkedIn}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} MUHAMMAD SHOLEHUDIN A H. {t.footerText}
        </p>
      </footer>

      {/* Lightbox Modal for Large Images */}
      {activeImage && (
        <div className="lightbox-modal" onClick={() => setActiveImage(null)}>
          <button className="lightbox-close" onClick={() => setActiveImage(null)}>
            &times;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt="Large Documentation View" className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}
