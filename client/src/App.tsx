import React from 'react';

export default function App(): JSX.Element {
  console.log('🔍 App component is rendering...');
  
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#1e3a8a', fontSize: '3rem', marginBottom: '1rem' }}>
        🎉 React is Working!
      </h1>
      <p style={{ color: '#4b5563', fontSize: '1.5rem', marginBottom: '2rem' }}>
        Skye Canyon Homes
      </p>
      <p style={{ color: '#6b7280', fontSize: '1.2rem', marginBottom: '1rem' }}>
        Dr. Jan Duffy, REALTOR®
      </p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1rem', 
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '2rem'
      }}>
        <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '0.5rem' }}>
          📞 Phone: (702) 500-1902
        </p>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          ✉️ Email: DrDuffy@SkyeCanyonHomesForSale.com
        </p>
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '2rem', opacity: 0.7 }}>
        If you can see this, React is successfully rendering!
      </p>
    </div>
  );
}
