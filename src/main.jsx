import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/layout/Layout";
import ConfigurationStatus from "./components/ConfigurationStatus";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import ProtectedRoute from "./components/ProtectedRoute";
import GeneratorSimple from "./pages/GeneratorSimple";
import "./index.css";

// Debug function to test components step by step
function DebugApp() {
  console.log('DebugApp rendering...');
  
  try {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <ConfigurationStatus />
          <AuthProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/generator" element={<ProtectedRoute><GeneratorSimple /></ProtectedRoute>} />
                  <Route path="*" element={
                <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      MEMEFY AI 🎨
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                      Debug Mode: Testing Components...
                    </p>
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                      <p className="text-green-400 font-semibold">✅ ErrorBoundary Works</p>
                      <p className="text-green-400 font-semibold">✅ ThemeProvider Works</p>
                      <p className="text-green-400 font-semibold">✅ AuthProvider Works</p>
                      <p className="text-green-400 font-semibold">✅ Router Works</p>
                      <p className="text-green-400 font-semibold">✅ Layout Works</p>
                      <p className="text-green-400 font-semibold">✅ ConfigurationStatus Works</p>
                      <p className="text-green-400 font-semibold">✅ Basic Pages Work (Landing, Login, Gallery)</p>
                      <p className="text-green-400 font-semibold">✅ ProtectedRoute Works (redirects correctly)</p>
                      <p className="text-yellow-400 font-semibold">🔧 Testing Generator Page...</p>
                      <p className="text-gray-400 text-sm">Click Generator in navbar to test</p>
                    </div>
                  </div>
                </div>
                  } />
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
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('DebugApp error:', error);
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#ff0000', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div>
          <h1>DEBUG ERROR - ThemeProvider</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
}

function App() {
  return <DebugApp />;
}

// Add error handling for the root render
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render app:", error);
  // Fallback render
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0a0a0f; color: white; font-family: sans-serif;">
      <div style="text-align: center;">
        <h1>MEMEFY AI</h1>
        <p>Loading error: ${error.message}</p>
        <p>Please refresh the page</p>
      </div>
    </div>
  `;
}
