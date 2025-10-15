import { createRoot } from 'react-dom/client';
import React from 'react';

console.log('🚀 Minimal main.tsx: Starting React app initialization...');

function MinimalApp() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1e3a8a' }}>Skye Canyon Homes</h1>
      <p style={{ color: '#4b5563' }}>Dr. Jan Duffy, REALTOR®</p>
      <p style={{ color: '#6b7280' }}>Minimal React App is working!</p>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <p>React is rendering correctly.</p>
        <p>Current time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

try {
  const rootElement: HTMLElement | null = document.getElementById('root');
  console.log('🔍 Minimal main.tsx: Root element found:', rootElement);

  if (rootElement) {
    console.log('✅ Minimal main.tsx: Creating React root...');
    const root = createRoot(rootElement);
    console.log('✅ Minimal main.tsx: React root created, rendering App...');
    
    root.render(<MinimalApp />);
    console.log('✅ Minimal main.tsx: App rendered successfully!');
  } else {
    console.error('❌ Minimal main.tsx: Root element not found!');
    document.body.innerHTML = '<h1>Error: Root element not found</h1>';
  }
} catch (error) {
  console.error('❌ Minimal main.tsx: Error during React initialization:', error);
  document.body.innerHTML = '<h1>Error: React initialization failed</h1>';
}
