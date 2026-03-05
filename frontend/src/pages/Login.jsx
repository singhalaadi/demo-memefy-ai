import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Always redirect to dashboard since demo mode is permanent
    navigate('/dashboard')
  }, [navigate])

  // This page now just redirects, but keeping the component for potential future use
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]">
      <div className="text-center">
        <div className="text-6xl mb-4">�</div>
        <p className="text-white">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}

export default Login