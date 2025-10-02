import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

// Simple test pages
function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
          MEMEFY AI 🎨
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Create viral memes with AI power!
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <p className="text-green-400 font-semibold">✅ App Successfully Restored</p>
          <p className="text-sm mt-2 opacity-75">Testing basic routing...</p>
        </div>
      </div>
    </div>
  )
}

function TestApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)