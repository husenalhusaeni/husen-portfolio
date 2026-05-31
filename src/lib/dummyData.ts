export interface Experience {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  imageUrl: string | null;
  titleID?: string | null;
  companyID?: string | null;
  locationID?: string | null;
  descriptionID?: string | null;
}

// Kamus Dwi-Bahasa untuk Konten Statis
export const translations = {
  EN: {
    navHome: "Home",
    navEducation: "Academic",
    navExperience: "Work Experience",
    navTraining: "Training",
    navSkills: "Skills",
    navContact: "Contact",
    heroWelcome: "Hello Husain, Welcome",
    heroNamePre: "Hello, I am",
    heroName: "MUHAMMAD SHOLEHUDIN A H",
    heroSubtitle: "Electrical Engineer | IoT Engineer",
    heroDesc: "Bachelor's degree in Management with work experience in the service sector, particularly in toll road operations in Jakarta. Passionate about designing IoT ecosystems and embedded hardware solutions.",
    btnExperiences: "Explore My Journey",
    btnProjects: "See My Projects",
    btnEmail: "Email Me",
    btnLinkedIn: "LinkedIn",
    aboutTitle: "My Story",
    aboutProfile: "Professional Story",
    aboutP1: "With a background in Business Management (S1), I have spent my academic and professional years mastering operational efficiency, data-driven administrative workflows, and strategic teamwork.",
    aboutP2: "My time in the fast-paced Jakarta toll road industry shaped my resilience under pressure. It taught me to communicate with absolute clarity for real-time field operations, and to resolve customer escalations with tact, speed, and courtesy. I view every operational challenge as a chapter of learning.",
    skillsTitle: "The Technical Toolkit",
    eduTitle: "The Foundation",
    eduDegree: "Bachelor Degree (S1) - Management",
    eduSchool: "Universitas Terbuka",
    eduDesc: "Graduated with a strong academic focus on Operational Management and Service Industries. Studied supply chain models, business reporting structures, cost-efficiency analysis, and customer service excellence. Active in leadership workshops, university events, and computer management modules.",
    workTitle: "The Journey of Actions",
    projectsTitle: "Things I've Created & Optimized",
    trainingTitle: "The Growth of Knowledge",
    contactTitle: "Let's Connect & Start a Conversation",
    contactText: "I am actively seeking long-term career growth opportunities in office administration, operational coordination, or field management. Let's discuss how my management foundation and toll-road operational experience can add value to your team.",
    footerText: "built with Next.js, SQLite, Prisma, and Cloudinary.",
  },
  ID: {
    navHome: "Beranda",
    navEducation: "Akademis",
    navExperience: "Pengalaman Kerja",
    navTraining: "Pelatihan",
    navSkills: "Keahlian",
    navContact: "Kontak",
    heroWelcome: "Halo Husain, Selamat Datang",
    heroNamePre: "Halo, Saya",
    heroName: "MUHAMMAD SHOLEHUDIN A H",
    heroSubtitle: "Electronic Engineer | IoT Engineer",
    heroDesc: "Lulusan S1 Manajemen dengan pengalaman kerja di bidang pelayanan jasa, khususnya operasional pengelolaan jalan tol di Jakarta. Memiliki dedikasi tinggi dalam merancang ekosistem IoT dan solusi perangkat keras sistem tertanam.",
    btnExperiences: "Lihat Pengalaman",
    btnProjects: "Lihat Project",
    btnEmail: "Kirim Email",
    btnLinkedIn: "LinkedIn",
    aboutTitle: "Cerita Saya",
    aboutProfile: "Profil Profesional",
    aboutP1: "Sebagai lulusan S1 Manajemen, saya terbiasa menyusun perencanaan strategis, menganalisis data operasional, dan mengorganisasi tim kerja secara efektif.",
    aboutP2: "Pengalaman saya di perusahaan jalan tol metropolitan Jakarta mengasah ketahanan kerja di bawah tekanan tinggi, komunikasi yang lugas untuk koordinasi operasional di lapangan, serta kemampuan menyelesaikan keluhan pengguna jalan tol secara taktis, sopan, dan berorientasi pada kepuasan pelanggan.",
    skillsTitle: "Keahlian",
    eduTitle: "Akademik",
    eduDegree: "Sarjana (S1) - Manajemen",
    eduSchool: "Universitas Terbuka",
    eduDesc: "Lulus dengan fokus studi pada Manajemen Operasional dan Analisis Layanan Jasa. Mempelajari pemodelan rantai pasok, penyusunan laporan administrasi bisnis, riset efisiensi biaya operasional, serta prinsip pelayanan prima dalam industri jasa komersial. Aktif berpartisipasi dalam seminar pengembangan karier, kepanitiaan universitas, dan program pengenalan komputer manajemen.",
    workTitle: "Pengalaman Kerja",
    projectsTitle: "Project Portofolio",
    trainingTitle: "Pelatihan & Sertifikasi",
    contactTitle: "Hubungi Saya",
    contactText: "Saya sangat tertarik untuk berdiskusi mengenai peluang karier jangka panjang di bidang perkantoran (administrasi, koordinasi, manajemen) maupun di operasional lapangan. Silakan hubungi saya untuk kolaborasi profesional lebih lanjut.",
    footerText: "dibangun menggunakan Next.js, SQLite, Prisma, dan Cloudinary.",
  }
};

// Helper Penerjemah untuk Data Dinamis Bawaan (Seed)
export function translateItem(item: Experience, currentLang: "EN" | "ID"): Experience {
  if (currentLang === "EN") return item;

  // Jika ada terjemahan kustom dari database, pakai langsung
  if (item.titleID || item.descriptionID) {
    return {
      ...item,
      title: item.titleID || item.title,
      description: item.descriptionID || item.description,
      company: item.companyID || item.company,
      location: item.locationID || item.location,
    };
  }

  const itemTranslations: Record<string, { title?: string; company?: string; description?: string; location?: string }> = {
    "Customer Service Supervisor": {
      title: "Supervisor Pelayanan Pelanggan",
      description: "• Memimpin tim pelayanan pelanggan di gerbang tol wilayah Jakarta untuk memastikan kelancaran transaksi dan kepuasan pengguna jalan tol.\n• Mengelola operasional harian, termasuk koordinasi dengan tim lapangan dan penyelesaian cepat serta taktis atas keluhan pelanggan.\n• Menganalisis laporan harian volume kendaraan dan efisiensi waktu transaksi tol menggunakan aplikasi internal dan Ms. Office."
    },
    "Toll Road Operations Staff": {
      title: "Staf Operasional Jalan Tol",
      description: "• Melakukan pengawasan langsung terhadap kondisi lalu lintas jalan tol, kesiapan gardu transaksi, serta penanganan gangguan lalu lintas (mobil derek & tim rescue).\n• Berkomunikasi secara efektif dengan Sentral Komunikasi (Senkom) untuk koordinasi cepat saat terjadi insiden di lapangan.\n• Menyusun laporan administrasi operasional jalan tol secara rutin dengan akurasi dan ketelitian tinggi menggunakan komputer."
    },
    "Digitalization of Toll Transaction Reporting": {
      title: "Digitalisasi Pelaporan Transaksi Tol",
      description: "• Mengembangkan sistem pelaporan digital berbasis otomasi spreadsheet untuk menyusun laporan volume kendaraan dan pendapatan gerbang tol harian.\n• Mengurangi waktu pemrosesan laporan administratif harian dari 3 jam menjadi 45 menit dengan akurasi data 100%.\n• Meningkatkan efisiensi kerja tim operasional gerbang tol melalui standarisasi alur pengisian laporan."
    },
    "Toll Gate Flow Optimization": {
      title: "Optimalisasi Alur Gardu Tol Otomatis (GTO)",
      description: "• Merancang ulang tata letak rambu petunjuk dan marka jalan di gerbang tol untuk meningkatkan visibilitas dan kecepatan transaksi Gardu Tol Otomatis.\n• Berhasil mengurangi waktu antrean kendaraan rata-rata sebesar 15% pada jam sibuk sore hari.\n• Berkolaborasi dengan tim teknisi dan kepolisian jalan raya untuk memastikan keselamatan dan kelancaran arus lalu lintas."
    },
    "Excellent Service Management Certification": {
      title: "Sertifikasi Manajemen Pelayanan Prima (Excellent Service)",
      description: "• Sertifikasi profesional dalam penanganan keluhan pelanggan, teknik komunikasi asertif, dan psikologi pelayanan jasa.\n• Mempelajari strategi penanganan konflik secara damai dan taktis dalam lingkungan operasional berkecepatan tinggi."
    },
    "Toll Road Incident Response & Rescue Readiness": {
      title: "Kesiapsiagaan Operasional & Tanggap Darurat Jalan Tol",
      description: "• Sertifikat pelatihan penanganan insiden darurat, kecelakaan lalu lintas tol, koordinasi tim rescue, dan penutupan jalur cepat secara aman.\n• Mengembangkan ketahanan mental dan fisik untuk kesiapan kerja di lapangan dalam berbagai kondisi cuaca."
    }
  };

  const found = itemTranslations[item.title];
  if (found) {
    return {
      ...item,
      title: found.title || item.title,
      description: found.description || item.description,
      company: found.company || item.company,
      location: found.location || item.location,
    };
  }
  return item;
}
