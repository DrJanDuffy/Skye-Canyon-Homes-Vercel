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

      {/* Services Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
              Comprehensive Real Estate Services
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '900px', margin: '0 auto' }}>
              From first-time buyers to luxury property investors, I offer tailored services 
              to meet all your Skye Canyon real estate needs.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.5rem' }}>🔍</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Buyer Representation</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Expert guidance through the entire buying process with exclusive access to off-market properties, 
                market analysis, and negotiation support.
              </p>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Property search and screening</li>
                <li style={{ marginBottom: '8px' }}>Market value analysis</li>
                <li style={{ marginBottom: '8px' }}>Negotiation and closing</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.5rem' }}>📈</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Seller Services</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Strategic marketing, professional photography, and maximum exposure for your Skye Canyon property 
                to achieve the best possible sale price.
              </p>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Professional marketing strategy</li>
                <li style={{ marginBottom: '8px' }}>High-quality photography</li>
                <li style={{ marginBottom: '8px' }}>Market positioning</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.5rem' }}>🏗️</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>New Construction</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Specialized knowledge of new construction homes and builder partnerships in Skye Canyon, 
                ensuring you get the best deals and quality.
              </p>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Builder relationships</li>
                <li style={{ marginBottom: '8px' }}>Design center guidance</li>
                <li style={{ marginBottom: '8px' }}>Warranty support</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.5rem' }}>💰</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Investment Properties</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                Market analysis and investment opportunities in Skye Canyon's growing real estate market, 
                helping you build wealth through real estate.
              </p>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>ROI analysis</li>
                <li style={{ marginBottom: '8px' }}>Market trends</li>
                <li style={{ marginBottom: '8px' }}>Property management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RealScout Integration Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
              Search Skye Canyon Properties
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '900px', margin: '0 auto' }}>
              Access exclusive MLS listings, market insights, and personalized property recommendations 
              through our RealScout integration.
            </p>
          </div>
          
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '48px', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Start Your Property Search
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                Get instant access to the latest Skye Canyon listings with advanced search filters, 
                market data, and personalized recommendations.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a 
                href="http://drjanduffy.realscout.com/onboarding" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
              >
                <span>🔍</span>
                Search Properties
              </a>
              <a 
                href="tel:(702) 500-1902"
                style={{
                  border: '2px solid #1e3a8a',
                  color: '#1e3a8a',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#1e3a8a';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#1e3a8a';
                }}
              >
                <span>📞</span>
                Get Expert Advice
              </a>
            </div>
            
            <div style={{ marginTop: '32px', padding: '24px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '16px', textAlign: 'center' }}>
                What You'll Get
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Real-time MLS updates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Advanced search filters</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Market insights</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Property alerts</span>
                </div>
              </div>
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

      {/* Footer */}
      <footer style={{ padding: '60px 0', backgroundColor: '#111827', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Skye Canyon Homes
              </h3>
              <p style={{ fontSize: '1rem', color: '#bfdbfe', marginBottom: '20px' }}>
                Your trusted real estate partner in Skye Canyon and North Las Vegas.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://www.facebook.com/drjanduffy" target="_blank" rel="noopener noreferrer" style={{ color: '#bfdbfe', fontSize: '1.5rem' }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/drjanduffy" target="_blank" rel="noopener noreferrer" style={{ color: '#bfdbfe', fontSize: '1.5rem' }}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/drjanduffy" target="_blank" rel="noopener noreferrer" style={{ color: '#bfdbfe', fontSize: '1.5rem' }}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Quick Links
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#hero" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '1rem' }}>
                    Home
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#about" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '1rem' }}>
                    About
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#services" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '1rem' }}>
                    Services
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#realscout" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '1rem' }}>
                    RealScout
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#contact" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '1rem' }}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Contact Us
              </h3>
              <p style={{ fontSize: '1rem', color: '#bfdbfe', marginBottom: '12px' }}>
                <span>📞</span> (702) 500-1902
              </p>
              <p style={{ fontSize: '1rem', color: '#bfdbfe', marginBottom: '12px' }}>
                <span>✉️</span> DrDuffy@SkyeCanyonHomesForSale.com
              </p>
              <p style={{ fontSize: '1rem', color: '#bfdbfe' }}>
                <span>📍</span> 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #374151' }}>
            <p style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>
              © {new Date().getFullYear()} Skye Canyon Homes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
