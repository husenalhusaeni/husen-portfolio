"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // Berhasil login, arahkan ke dasbor admin
        router.push("/admin");
      } else {
        setError(data.message || "Kata sandi yang dimasukkan salah.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "16px" }}>
            <span className="hero-welcome">Kembali ke Portfolio</span>
          </Link>
          <h2 className="login-title">Admin</h2>
          <p className="login-subtitle">Masukkan kata sandi</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Kata Sandi Admin
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Menghubungkan..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
