import React from 'react';

export default function App(): JSX.Element {
  try {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '3rem', marginBottom: '1rem' }}>
          Skye Canyon Homes
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1.5rem', marginBottom: '2rem' }}>
          Dr. Jan Duffy, REALTOR®
        </p>
        <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>
          React App is Working! 🎉
        </p>
        <p style={{ color: '#6b7280', fontSize: '1rem', marginTop: '1rem' }}>
          Phone: (702) 500-1902
        </p>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Email: DrDuffy@SkyeCanyonHomesForSale.com
        </p>
      </div>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '3rem', marginBottom: '1rem' }}>
          Skye Canyon Homes
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1.5rem', marginBottom: '2rem' }}>
          Dr. Jan Duffy, REALTOR®
        </p>
        <p style={{ color: '#dc2626', fontSize: '1.2rem' }}>
          Content loaded with error handling
        </p>
        <p style={{ color: '#6b7280', fontSize: '1rem', marginTop: '1rem' }}>
          Phone: (702) 500-1902
        </p>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Email: DrDuffy@SkyeCanyonHomesForSale.com
        </p>
      </div>
    );
  }
}
