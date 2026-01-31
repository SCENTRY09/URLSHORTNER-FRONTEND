import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UrlForm from '../components/UrlForm'
import UrlList from '../components/UrlList'
import { urlAPI } from '../api/api'

const Dashboard = ({ setToken }) => {
  const [urls, setUrls] = useState([])
  const navigate = useNavigate()

  const fetchUrls = async () => {
    try {
      const response = await urlAPI.getAll()
      setUrls(response.data.result)
    } catch (err) {
      console.error('Failed to fetch URLs:', err)
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

 const handleLogout = () => {
  localStorage.removeItem("token");
  setToken(null);
  navigate("/login", { replace: true });
};


  const handleUrlCreated = () => {
    fetchUrls()
  }

  const handleUrlDeleted = () => {
    fetchUrls()
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1e293b', margin: '0' }}>URL Shortener</h1>
          <button
            onClick={handleLogout}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Sign Out
          </button>
        </div>
        
        <UrlForm onUrlCreated={handleUrlCreated} />
        <UrlList urls={urls} onUrlDeleted={handleUrlDeleted} />
      </div>
    </div>
  )
}

export default Dashboard