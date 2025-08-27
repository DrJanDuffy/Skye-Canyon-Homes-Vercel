import React from 'react';

export default function App(): JSX.Element {
  console.log('🔍 App component is rendering...');
  
  return (
    <>
      {/* Hero Section */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '24px' }}>
            Skye Canyon Homes
          </h1>
          <p style={{ fontSize: '2rem', marginBottom: '32px', color: '#bfdbfe' }}>
            Dr. Jan Duffy, REALTOR®
          </p>
          <p style={{ fontSize: '1.25rem', marginBottom: '48px', color: '#93c5fd', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
            Premier Skye Canyon real estate specialist with 15+ years of exclusive community expertise. 
            Luxury homes, investment properties, and comprehensive buyer/seller services in Las Vegas, Nevada.
          </p>
          
          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <a 
              href="http://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'white',
                color: '#1e3a8a',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                textDecoration: 'none',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              Search Properties
            </a>
            <a 
              href="tel:(702) 500-1902"
              style={{
                border: '2px solid white',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#1e3a8a';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Call (702) 500-1902
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
              Your Skye Canyon Real Estate Expert
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '900px', margin: '0 auto' }}>
              With over 15 years of experience in Skye Canyon and North Las Vegas, 
              I provide personalized service backed by deep market knowledge and strong community relationships.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <span style={{ fontSize: '2rem' }}>🏠</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Luxury Homes</h3>
              <p style={{ color: '#6b7280' }}>
                Specialized expertise in high-end Skye Canyon properties, from custom estates to golf course homes.
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <span style={{ fontSize: '2rem' }}>📊</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Market Analysis</h3>
              <p style={{ color: '#6b7280' }}>
                Comprehensive market insights and property valuations to ensure you make informed decisions.
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <span style={{ fontSize: '2rem' }}>🤝</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Personalized Service</h3>
              <p style={{ color: '#6b7280' }}>
                Dedicated support throughout your entire real estate journey, from first contact to closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#1e3a8a', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '32px' }}>
            Ready to Find Your Dream Home?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '48px', color: '#bfdbfe' }}>
            Let's discuss your Skye Canyon real estate goals and start your journey today.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Contact Information</h3>
              <div style={{ color: '#bfdbfe' }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span>📞</span>
                  <a href="tel:(702) 500-1902" style={{ color: '#bfdbfe', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#bfdbfe'}>
                    (702) 500-1902
                  </a>
                </p>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span>✉️</span>
                  <a href="mailto:DrDuffy@SkyeCanyonHomesForSale.com" style={{ color: '#bfdbfe', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#bfdbfe'}>
                    DrDuffy@SkyeCanyonHomesForSale.com
                  </a>
                </p>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>📍</span>
                  <span>10111 W. Skye Canyon Park Drive<br />Las Vegas, NV 89166</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Office Hours</h3>
              <div style={{ color: '#bfdbfe' }}>
                <p style={{ marginBottom: '8px' }}>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p style={{ marginBottom: '8px' }}>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <a 
              href="http://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'white',
                color: '#1e3a8a',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                textDecoration: 'none',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              Start Your Search
            </a>
            <a 
              href="tel:(702) 500-1902"
              style={{
                border: '2px solid white',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#1e3a8a';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
