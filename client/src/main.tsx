import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log('🚀 main.tsx: Starting React app initialization...');

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('❌ Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
});

try {
  const rootElement: HTMLElement | null = document.getElementById('root');
  console.log('🔍 main.tsx: Root element found:', rootElement);

  if (rootElement) {
    console.log('✅ main.tsx: Creating React root...');
    const root = createRoot(rootElement);
    console.log('✅ main.tsx: React root created, rendering App...');
    
    // Add error boundary for React rendering
    try {
      root.render(<App />);
      console.log('✅ main.tsx: App rendered successfully!');
    } catch (renderError) {
      console.error('❌ main.tsx: Error during React rendering:', renderError);
      // Fallback content if React fails
      rootElement.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
          <h1 style="color: #1e3a8a;">Skye Canyon Homes</h1>
          <p style="color: #4b5563;">Dr. Jan Duffy, REALTOR®</p>
          <p style="color: #6b7280;">Loading... Please check console for errors.</p>
        </div>
      `;
    }
  } else {
    console.error('❌ main.tsx: Root element not found!');
    document.body.innerHTML = '<h1>Error: Root element not found</h1>';
  }
} catch (error) {
  console.error('❌ main.tsx: Error during React initialization:', error);
  document.body.innerHTML = '<h1>Error: React initialization failed</h1>';
}
