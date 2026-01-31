import React from "react";
import { urlAPI } from "../api/api";

const UrlList = ({ urls, onUrlDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await urlAPI.delete(id);
      onUrlDeleted();
    } catch (err) {
      console.error("Failed to delete URL:", err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!urls.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
          border: "1px solid #e2e8f0",
        }}
      >
        <p style={{ color: "#64748b", fontSize: "1rem" }}>No URLs created yet. Create your first short URL above!</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
      }}
    >
      <h3 style={{ marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "600", color: "#1e293b" }}>Your URLs</h3>

      <div>
        {urls.map((url) => {
          const shortUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/${url.code}`;

          return (
            <div
              key={url.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "1rem",
                backgroundColor: "#f8fafc",
              }}
            >
              <div style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#374151", fontSize: "0.9rem" }}>Short URL:</strong>{" "}
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}
                >
                  {shortUrl}
                </a>

                <button
                  onClick={() => copyToClipboard(shortUrl)}
                  style={{
                    marginLeft: "0.75rem",
                    padding: "0.375rem 0.75rem",
                    fontSize: "0.8rem",
                    backgroundColor: "#6b7280",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                  Copy
                </button>
              </div>

              <div style={{ marginBottom: "0.75rem", wordBreak: "break-all" }}>
                <strong style={{ color: "#374151", fontSize: "0.9rem" }}>Original URL:</strong> 
                <span style={{ color: "#64748b" }}> {url.targetUrl}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <small style={{ color: "#64748b" }}>
                  Created:{" "}
                  {url.createdAt
                    ? new Date(url.createdAt).toLocaleDateString()
                    : "-"}
                </small>

                <button
                  onClick={() => handleDelete(url.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UrlList;