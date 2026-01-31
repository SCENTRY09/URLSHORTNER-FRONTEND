import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/api.js";
import { useEffect } from "react";

const Login = ({ setToken })=> {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SUBMIT CLICKED");

  try {
    const response = await authAPI.login(formData);

    console.log("RESPONSE:", response.data);

    // ✅ SAVE TOKEN
    localStorage.setItem("token", response.data.token);

    // ✅ UPDATE REACT STATE (THIS TRIGGERS REDIRECT)
     setToken(response.data.token);

    // ✅ NAVIGATE IMMEDIATELY
    navigate("/dashboard", { replace: true });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
  }
};





  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Sign In
          </button>
        </form>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#64748b",
    fontSize: "0.95rem",
  },
  inputGroup: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.875rem",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: "#ffffff",
  },
  button: {
    width: "100%",
    padding: "0.875rem",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "background-color 0.2s",
  },
  error: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    textAlign: "center",
    fontSize: "0.9rem",
    border: "1px solid #fecaca",
  },
  footerText: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#64748b",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "600",
  },
};
