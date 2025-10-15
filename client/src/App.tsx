import React from 'react';

export default function App(): JSX.Element {
  console.log('🔍 Simple App component is rendering...');
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1e3a8a' }}>Skye Canyon Homes</h1>
      <p style={{ color: '#4b5563' }}>Dr. Jan Duffy, REALTOR®</p>
      <p style={{ color: '#6b7280' }}>React App is working! Testing...</p>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <p>If you can see this, React is rendering correctly.</p>
        <p>Current time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
