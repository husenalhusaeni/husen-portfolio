"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface AdminDashboardProps {
  initialExperiences: Experience[];
}

export default function AdminDashboard({ initialExperiences }: AdminDashboardProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
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
      title,
      company,
      location,
      startDate,
      endDate,
      description,
      imageUrl: imageUrl || "/avatar.jpg",
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
          setSuccess("Pengalaman kerja berhasil diperbarui!");
        } else {
          // Mode Tambah: Masukkan ke paling atas list
          setExperiences([data.data, ...experiences]);
          setSuccess("Pengalaman kerja baru berhasil ditambahkan!");
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
    if (!confirm("Apakah Anda yakin ingin menghapus pengalaman kerja ini?")) return;

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setExperiences(experiences.filter((exp) => exp.id !== id));
        setSuccess("Pengalaman kerja berhasil dihapus.");
        if (editingId === id) resetForm();
      } else {
        setError(data.message || "Gagal menghapus pengalaman.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server untuk menghapus.");
    }
  }

  // Handler Masuk Mode Edit
  function handleEditClick(exp: Experience) {
    setEditingId(exp.id);
    setTitle(exp.title);
    setCompany(exp.company);
    setLocation(exp.location);
    setStartDate(exp.startDate);
    setEndDate(exp.endDate);
    setDescription(exp.description);
    setImageUrl(exp.imageUrl);
    setError("");
    setSuccess("");
  }

  // Reset Input Form
  function resetForm() {
    setEditingId(null);
    setTitle("");
    setCompany("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setDescription("");
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
          <h1 style={{ marginTop: "4px" }}>Manajemen Pengalaman Kerja</h1>
          <p>Selamat datang, Administrator. Kelola lini masa profesional Anda secara dinamis.</p>
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
            {editingId ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja Baru"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Jabatan Pekerjaan *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Customer Service Supervisor"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nama Perusahaan *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: PT Jasa Marga (Persero) Tbk"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Lokasi *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Jakarta"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Logo / Gambar Perusahaan</label>
                <div className="image-upload-wrap">
                  <div className="image-preview-box">
                    <Image
                      src={imageUrl || "/avatar.jpg"}
                      alt="Preview logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="upload-btn-wrap">
                    <span className="upload-label">
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Tanggal Mulai *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Januari 2023"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tanggal Selesai *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Sekarang atau Desember 2024"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Deskripsi Pekerjaan / Tanggung Jawab *</label>
              <textarea
                className="form-textarea"
                placeholder="• Tuliskan poin tanggung jawab utama Anda di sini&#10;• Gunakan simbol bullet (•) untuk baris baru agar tampil rapi di timeline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
              <button type="submit" className="form-button" style={{ flexGrow: 2 }} disabled={loading || uploading}>
                {loading ? "Menyimpan..." : editingId ? "Perbarui Pengalaman" : "Tambahkan Pengalaman"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="btn-secondary" style={{ flexGrow: 1, borderRadius: "12px" }}>
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Kolom 2: Daftar Pengalaman Kerja Saat Ini */}
        <div>
          <h2 className="admin-list-title">Pengalaman Kerja Terdaftar ({experiences.length})</h2>
          <div className="admin-list">
            {experiences.length === 0 ? (
              <div className="glass-card" style={{ padding: "30px", textAlign: "center", color: "var(--text-secondary)" }}>
                Belum ada pengalaman kerja terdaftar. Gunakan formulir di sebelah kiri untuk menambahkan.
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
                      <div className="admin-item-company">
                        {exp.company} ({exp.startDate} - {exp.endDate})
                      </div>
                    </div>
                  </div>
                  <div className="admin-item-actions">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="btn-icon btn-icon-edit"
                      title="Edit Pengalaman"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="btn-icon btn-icon-delete"
                      title="Hapus Pengalaman"
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
