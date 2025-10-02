import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Minimal test component
function MinimalApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a2e', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨 MEME FACTORY</h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>App is working! Loading main features...</p>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem 2rem', 
        backgroundColor: '#16213e', 
        borderRadius: '8px' 
      }}>
        React App Successfully Deployed ✅
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MinimalApp />
  </React.StrictMode>,
)