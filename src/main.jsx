import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Add error handling for the root render
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback render
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0a0a0f; color: white; font-family: sans-serif;">
      <div style="text-align: center;">
        <h1>MEMEFY-AI</h1>
        <p>Loading error: ${error.message}</p>
        <p>Please refresh the page</p>
      </div>
    </div>
  `;
}