import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import ConfigurationStatus from './components/ConfigurationStatus'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Generator from './pages/Generator'
import Gallery from './pages/Gallery'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6b9d', // Hot pink
      light: '#ff9dc7',
      dark: '#c5396b',
    },
    secondary: {
      main: '#00d2ff', // Cyan
      light: '#66e0ff',
      dark: '#0099cc',
    },
    tertiary: {
      main: '#ffeb3b', // Bright yellow
    },
    background: {
      default: '#0a0a0f', // Very dark purple
      paper: '#1a1a2e', // Dark navy
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    success: {
      main: '#00ff88', // Neon green
    },
    warning: {
      main: '#ff9100', // Orange
    },
    error: {
      main: '#ff4757', // Red
    }
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      background: 'linear-gradient(45deg, #ff6b9d, #00d2ff, #ffeb3b)',
      backgroundSize: '200% 200%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(255, 107, 157, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ff6b9d 0%, #00d2ff 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00d2ff 0%, #ff6b9d 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.05)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#ff6b9d',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d2ff',
            },
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <CustomThemeProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ConfigurationStatus />
          <AuthProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route 
                    path="/generator" 
                    element={
                      <ProtectedRoute>
                        <Generator />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Layout>
            </Router>
          </AuthProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
        </ThemeProvider>
      </CustomThemeProvider>
    </ErrorBoundary>
  )
}

export default App