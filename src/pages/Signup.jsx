import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api/api'

const Signup = () => {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authAPI.signup(formData)
      navigate('/login')
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Signup failed'
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '420px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>Create Account</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#64748b', fontSize: '0.95rem' }}>Join us to start shortening URLs</p>
        {error && <div style={{ color: '#dc2626', marginBottom: '1.5rem', textAlign: 'center', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fecaca', fontSize: '0.9rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstname}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              style={{ width: '100%', padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#ffffff' }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              style={{ width: '100%', padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#ffffff' }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#ffffff' }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#ffffff' }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '0.875rem', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Create Account
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup