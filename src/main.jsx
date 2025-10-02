import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ConfigurationStatus from "./components/ConfigurationStatus";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Generator from "./pages/Generator";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

function App() {
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
              background: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            },
          }}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
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
