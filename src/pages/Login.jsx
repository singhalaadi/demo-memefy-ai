import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

const Login = () => {
  const { user, signInWithGoogle, signInWithDemo, loading } = useAuth()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      toast.success('Welcome back! 🎉')
    } catch (error) {
      toast.error('Login failed. Please try again. 😅')
    }
  }

  const handleDemoLogin = () => {
    setIsDemo(true)
    signInWithDemo()
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]' 
          : 'bg-gradient-to-br from-[#f0f9ff] via-[#e0e7ff] to-[#f8fafc]'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          ⚡
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]' 
        : 'bg-gradient-to-br from-[#f0f9ff] via-[#e0e7ff] to-[#f8fafc]'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass p-8 rounded-3xl text-center">
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back!</h1>
            <p className="text-gray-400">Ready to create some viral content?</p>
          </motion.div>

          {/* Login Options */}
          <div className="space-y-4">
            {/* Google Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              className="w-full bg-white text-gray-800 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <span className="text-gray-400 text-sm font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            {/* Demo Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoLogin}
              className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:from-cyan-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
              disabled={isDemo}
            >
              <span className="text-xl">🎮</span>
              {isDemo ? 'Loading Demo...' : 'Try Demo Mode'}
            </motion.button>

            <p className="text-gray-500 text-sm mt-4">
              Demo mode lets you explore all features without signing up!
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-dark rounded-xl">
              <div className="text-2xl mb-1">🤖</div>
              <p className="text-xs text-gray-400">AI Generation</p>
            </div>
            <div className="text-center p-3 glass-dark rounded-xl">
              <div className="text-2xl mb-1">📈</div>
              <p className="text-xs text-gray-400">Viral Analytics</p>
            </div>
            <div className="text-center p-3 glass-dark rounded-xl">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-xs text-gray-400">Trend Tracking</p>
            </div>
            <div className="text-center p-3 glass-dark rounded-xl">
              <div className="text-2xl mb-1">🚀</div>
              <p className="text-xs text-gray-400">Quick Share</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              By continuing, you agree that memes are life 🔥
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login