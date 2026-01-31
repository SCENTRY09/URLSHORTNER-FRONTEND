import React, { useState } from "react";
import { urlAPI } from "../api/api";

const UrlForm = ({ onUrlCreated }) => {
  const [formData, setFormData] = useState({ url: "", code: "" });
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const response = await urlAPI.shorten(formData);

      // 🔥 IMPORTANT: short URL must point to BACKEND
      const generatedShortUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}${response.data.code}`;

      setShortUrl(generatedShortUrl);
      setFormData({ url: "", code: "" });

      // refresh URL list in dashboard
      onUrlCreated();

    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to create short URL"
      );
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: "2rem",
        border: "1px solid #e2e8f0",
      }}
    >
      <h3 style={{ marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "600", color: "#1e293b" }}>Create Short URL</h3>

      {error && (
        <div style={{ color: "#dc2626", marginBottom: "1.5rem", backgroundColor: "#fef2f2", padding: "0.75rem", borderRadius: "8px", border: "1px solid #fecaca", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      {shortUrl && (
        <div style={{ marginBottom: "1.5rem", color: "#059669", backgroundColor: "#ecfdf5", padding: "0.75rem", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
          Short URL created:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}
          >
            {shortUrl}
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.25rem" }}>
          <input
            type="url"
            placeholder="Enter URL to shorten"
            value={formData.url}
            onChange={(e) =>
              setFormData({ ...formData, url: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "0.875rem",
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "0.95rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })
            }
            style={{
              width: "100%",
              padding: "0.875rem",
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "0.95rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.875rem 2rem",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Shorten URL
        </button>
      </form>
    </div>
  );
};

export default UrlForm;