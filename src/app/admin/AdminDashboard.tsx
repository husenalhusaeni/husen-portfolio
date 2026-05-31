"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Experience {
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

interface AdminDashboardProps {
  initialExperiences: Experience[];
}

export default function AdminDashboard({ initialExperiences }: AdminDashboardProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [type, setType] = useState("WORK");
  
  // English Fields
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Indonesian Fields
  const [titleID, setTitleID] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [locationID, setLocationID] = useState("");
  const [descriptionID, setDescriptionID] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  // Handler Logout
  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  }

  // Handler Unggah Gambar (Cloudinary)
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
        setSuccess(data.message || "Gambar berhasil diunggah.");
      } else {
        setError(data.message || "Gagal mengunggah gambar.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi saat mengunggah.");
    } finally {
      setUploading(false);
    }
  }

  // Handler Submit Form (Tambah / Edit)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const payload = {
      type,
      title,
      company,
      location,
      startDate,
      endDate,
      description,
      imageUrl: imageUrl || "/avatar.jpg",
      titleID,
      companyID,
      locationID,
      descriptionID,
    };

    try {
      const url = editingId ? `/api/experiences/${editingId}` : "/api/experiences";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (editingId) {
          // Mode Edit: Update state lokal
          setExperiences(
            experiences.map((exp) => (exp.id === editingId ? data.data : exp))
          );
          setSuccess("Data berhasil diperbarui!");
        } else {
          // Mode Tambah: Masukkan ke paling atas list
          setExperiences([data.data, ...experiences]);
          setSuccess("Data baru berhasil ditambahkan!");
        }
        resetForm();
      } else {
        setError(data.message || "Gagal memproses data.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }

  // Handler Hapus Pengalaman
  async function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setExperiences(experiences.filter((exp) => exp.id !== id));
        setSuccess("Data berhasil dihapus.");
        if (editingId === id) resetForm();
      } else {
        setError(data.message || "Gagal menghapus data.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server untuk menghapus.");
    }
  }

  // Handler Masuk Mode Edit
  function handleEditClick(exp: Experience) {
    setEditingId(exp.id);
    setType(exp.type || "WORK");
    setTitle(exp.title || "");
    setCompany(exp.company || "");
    setLocation(exp.location || "");
    setTitleID(exp.titleID || "");
    setCompanyID(exp.companyID || "");
    setLocationID(exp.locationID || "");
    setStartDate(exp.startDate || "");
    setEndDate(exp.endDate || "");
    setDescription(exp.description || "");
    setDescriptionID(exp.descriptionID || "");
    setImageUrl(exp.imageUrl);
    setError("");
    setSuccess("");
  }

  // Reset Input Form
  function resetForm() {
    setEditingId(null);
    setType("WORK");
    setTitle("");
    setCompany("");
    setLocation("");
    setTitleID("");
    setCompanyID("");
    setLocationID("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setDescriptionID("");
    setImageUrl(null);
  }

  return (
    <div className="admin-container">
      {/* Header Panel */}
      <div className="admin-header">
        <div className="admin-title-wrap">
          <Link href="/" style={{ textDecoration: "none", color: "var(--accent-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>
            &larr; Lihat Website Utama
          </Link>
          <h1 style={{ marginTop: "4px" }}>Manajemen Portofolio Dinamis</h1>
          <p>Selamat datang, Administrator. Kelola Pengalaman Kerja, Project, dan Pelatihan Anda secara terintegrasi.</p>
        </div>
        <div className="admin-actions-top">
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>
            Keluar (Logout)
          </button>
        </div>
      </div>

      {success && <div className="glass-card" style={{ padding: "10px 18px", borderColor: "rgba(34, 197, 94, 0.3)", background: "rgba(34, 197, 94, 0.08)", color: "#22c55e", marginBottom: "24px", borderRadius: "8px", fontWeight: "500", textAlign: "center" }}>{success}</div>}
      {error && <div className="error-message" style={{ marginBottom: "24px" }}>{error}</div>}

      {/* Main Grid */}
      <div className="admin-grid">
        {/* Kolom 1: Formulir Input */}
        <div className="admin-form-card glass-card">
          <h2 className="admin-form-title">
            {editingId ? "Edit Data Portofolio" : "Tambah Data Portofolio Baru"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Tipe Data *</label>
              <select
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="WORK">Pengalaman Kerja</option>
                <option value="PROJECT">Project Portofolio</option>
                <option value="TRAINING">Pelatihan & Sertifikasi</option>
              </select>
            </div>

            {/* Row 1: Title (EN & ID) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">
                  {type === "WORK" ? "Jabatan Pekerjaan (EN) *" : type === "PROJECT" ? "Nama Project (EN) *" : "Nama Pelatihan (EN) *"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={type === "WORK" ? "e.g. Customer Service Supervisor" : type === "PROJECT" ? "e.g. Toll Gate Flow Optimization" : "e.g. Excellent Service Certification"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  {type === "WORK" ? "Jabatan Pekerjaan (ID)" : type === "PROJECT" ? "Nama Project (ID)" : "Nama Pelatihan (ID)"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={type === "WORK" ? "Contoh: Supervisor Pelayanan Pelanggan" : type === "PROJECT" ? "Contoh: Optimalisasi Gardu Tol Otomatis" : "Contoh: Sertifikasi Pelayanan Prima"}
                  value={titleID}
                  onChange={(e) => setTitleID(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Company/Institution (EN & ID) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">
                  {type === "WORK" ? "Nama Perusahaan (EN) *" : type === "PROJECT" ? "Perusahaan / Organisasi (EN) *" : "Lembaga Penyelenggara (EN) *"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={type === "WORK" || type === "PROJECT" ? "e.g. PT Jasa Marga" : "e.g. MarkPlus Institute"}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  {type === "WORK" ? "Nama Perusahaan (ID)" : type === "PROJECT" ? "Perusahaan / Organisasi (ID)" : "Lembaga Penyelenggara (ID)"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={type === "WORK" || type === "PROJECT" ? "Contoh: PT Jasa Marga" : "Contoh: MarkPlus Institute"}
                  value={companyID}
                  onChange={(e) => setCompanyID(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Location (EN & ID) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Lokasi (EN) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jakarta, Indonesia"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Lokasi (ID)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Jakarta, Indonesia"
                  value={locationID}
                  onChange={(e) => setLocationID(e.target.value)}
                />
              </div>
            </div>

            {/* Row 4: Dates & Image */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">
                  {type === "TRAINING" ? "Tanggal Perolehan *" : "Tanggal Mulai *"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={type === "TRAINING" ? "e.g. Aug 2023" : "e.g. Jan 2023"}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {type === "TRAINING" ? "Masa Berlaku" : "Tanggal Selesai *"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={type === "TRAINING" ? "e.g. Forever / 2026" : "e.g. Present"}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required={type !== "TRAINING"}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dokumentasi Gambar / Logo</label>
                <div className="image-upload-wrap">
                  <div className="upload-btn-wrap">
                    <span className="upload-label" style={{ fontSize: "0.85rem", padding: "10px" }}>
                      {uploading ? "Mengunggah..." : "Pilih File"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="upload-file-input"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5: Descriptions (EN & ID) */}
            <div className="form-group">
              <label className="form-label">Deskripsi & Tanggung Jawab (EN) *</label>
              <textarea
                className="form-textarea"
                placeholder="• Write your key description points here&#10;• Use bullet point (•) for new lines"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Deskripsi & Tanggung Jawab (ID)</label>
              <textarea
                className="form-textarea"
                placeholder="• Tuliskan poin penjelasan Bahasa Indonesia Anda di sini&#10;• Gunakan simbol bullet (•) untuk baris baru"
                value={descriptionID}
                onChange={(e) => setDescriptionID(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
              <button type="submit" className="form-button" style={{ flexGrow: 2 }} disabled={loading || uploading}>
                {loading ? "Menyimpan..." : editingId ? "Perbarui Data" : "Tambahkan Data"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="btn-secondary" style={{ flexGrow: 1, borderRadius: "12px" }}>
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Kolom 2: Daftar Portofolio Terdaftar */}
        <div>
          <h2 className="admin-list-title">Data Terdaftar ({experiences.length})</h2>
          <div className="admin-list">
            {experiences.length === 0 ? (
              <div className="glass-card" style={{ padding: "30px", textAlign: "center", color: "var(--text-secondary)" }}>
                Belum ada data terdaftar. Gunakan formulir di sebelah kiri untuk menambahkan.
              </div>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="admin-item glass-card">
                  <div className="admin-item-info">
                    <Image
                      src={exp.imageUrl || "/avatar.jpg"}
                      alt={exp.company}
                      width={44}
                      height={44}
                      className="admin-item-img"
                    />
                    <div>
                      <div className="admin-item-title">{exp.title}</div>
                      <div className="admin-item-company" style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                        <span className={`badge ${exp.type === "PROJECT" ? "badge-project" :
                            exp.type === "TRAINING" ? "badge-training" : "badge-work"
                          }`}>
                          {exp.type === "PROJECT" ? "Project" :
                            exp.type === "TRAINING" ? "Pelatihan" : "Kerja"}
                        </span>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                          {exp.company} ({exp.startDate} - {exp.endDate || "Selesai"})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="admin-item-actions">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="btn-icon btn-icon-edit"
                      title="Edit Data"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="btn-icon btn-icon-delete"
                      title="Hapus Data"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
