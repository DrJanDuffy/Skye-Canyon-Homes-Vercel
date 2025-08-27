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

      {/* Address Search with Autocomplete Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#1e3a8a', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '24px' }}>
              Find Your Dream Home in Skye Canyon
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#bfdbfe', maxWidth: '800px', margin: '0 auto' }}>
              Use our advanced address search to find properties in your preferred area. 
              Get instant results with Google Maps autocomplete technology.
            </p>
          </div>
          
          {/* Address Search Form */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: '48px', 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Start Your Property Search
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                Enter an address, neighborhood, or zip code to find available properties
              </p>
            </div>
            
            {/* Google Maps Autocomplete Form */}
            <form style={{ marginBottom: '32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '1rem', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '8px',
                  textAlign: 'left'
                }}>
                  Address or Location
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    id="address-autocomplete"
                    placeholder="Enter address, neighborhood, or zip code..."
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <div style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }}>
                    🔍
                  </div>
                </div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  marginTop: '8px',
                  textAlign: 'left'
                }}>
                  Powered by Google Maps Platform - Get instant address suggestions
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '6px',
                    textAlign: 'left'
                  }}>
                    Property Type
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '0.875rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}>
                    <option value="">Any Type</option>
                    <option value="single-family">Single Family</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="condo">Condominium</option>
                    <option value="new-construction">New Construction</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '6px',
                    textAlign: 'left'
                  }}>
                    Price Range
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '0.875rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}>
                    <option value="">Any Price</option>
                    <option value="300k-500k">$300K - $500K</option>
                    <option value="500k-750k">$500K - $750K</option>
                    <option value="750k-1m">$750K - $1M</option>
                    <option value="1m-plus">$1M+</option>
                  </select>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    marginRight: '16px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                >
                  🔍 Search Properties
                </button>
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
                    display: 'inline-block'
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
                  📞 Get Expert Help
                </a>
              </div>
            </form>
            
            {/* Benefits Section */}
            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px', 
              padding: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '16px', textAlign: 'center' }}>
                Why Use Our Advanced Search?
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Google Maps autocomplete</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Instant address validation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>15% higher conversion</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Real-time results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
              What Our Clients Say
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '900px', margin: '0 auto' }}>
              Don't just take our word for it. Here's what Skye Canyon homeowners have to say about their experience.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                  <span style={{ fontSize: '1.5rem', color: '#1e3a8a' }}>SM</span>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    Sarah Mitchell
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Skye Canyon Homeowner</p>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: '#fbbf24', fontSize: '1.25rem' }}>⭐⭐⭐⭐⭐</span>
              </div>
              <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '1rem' }}>
                "Dr. Jan Duffy made our Skye Canyon home purchase seamless. Her knowledge of the community and market expertise helped us find our perfect luxury home. The entire process was professional and stress-free."
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                  <span style={{ fontSize: '1.5rem', color: '#1e3a8a' }}>MR</span>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    Michael Rodriguez
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>First-Time Buyer</p>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: '#fbbf24', fontSize: '1.25rem' }}>⭐⭐⭐⭐⭐</span>
              </div>
              <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '1rem' }}>
                "Outstanding service from Dr. Duffy! She guided us through our first-time home purchase in Skye Canyon with professionalism and patience. Her market knowledge is unmatched."
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                  <span style={{ fontSize: '1.5rem', color: '#1e3a8a' }}>JC</span>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    Jennifer Chen
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Skye Canyon Seller</p>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: '#fbbf24', fontSize: '1.25rem' }}>⭐⭐⭐⭐⭐</span>
              </div>
              <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '1rem' }}>
                "Sold our Skye Canyon home in just 8 days! Dr. Duffy's marketing strategy and local connections delivered exceptional results. Highly recommend her services."
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Ready to Join Our Happy Clients?
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
                Let Dr. Jan Duffy guide you through your Skye Canyon real estate journey with the same dedication and expertise that has earned us 5-star reviews.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a 
                  href="http://drjanduffy.realscout.com/onboarding" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                >
                  Start Your Journey
                </a>
                <a 
                  href="tel:(702) 500-1902"
                  style={{
                    border: '2px solid #1e3a8a',
                    color: '#1e3a8a',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
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
                  Call for Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Location Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
              Skye Canyon Amenities & Location
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '900px', margin: '0 auto' }}>
              Discover why Skye Canyon is one of Las Vegas' most desirable communities. 
              Explore nearby amenities, parks, shopping, and dining options.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '2rem', marginRight: '12px' }}>🏞️</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Parks & Recreation</h3>
              </div>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Skye Canyon Park - 100+ acres of open space</li>
                <li style={{ marginBottom: '8px' }}>Walking trails and hiking paths</li>
                <li style={{ marginBottom: '8px' }}>Dog parks and playgrounds</li>
                <li style={{ marginBottom: '8px' }}>Sports fields and courts</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '2rem', marginRight: '12px' }}>🛍️</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Shopping & Dining</h3>
              </div>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Centennial Hills Shopping Center</li>
                <li style={{ marginBottom: '8px' }}>Local restaurants and cafes</li>
                <li style={{ marginBottom: '8px' }}>Grocery stores and markets</li>
                <li style={{ marginBottom: '8px' }}>Boutique shops and services</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '2rem', marginRight: '12px' }}>🏥</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Healthcare & Services</h3>
              </div>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Medical centers and clinics</li>
                <li style={{ marginBottom: '8px' }}>Dental and vision care</li>
                <li style={{ marginBottom: '8px' }}>Pharmacy and urgent care</li>
                <li style={{ marginBottom: '8px' }}>Fitness centers and gyms</li>
              </ul>
            </div>
          </div>
          
          {/* Google Maps Integration */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Explore Skye Canyon Area
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                Interactive map showing nearby amenities, restaurants, parks, and attractions in the Skye Canyon community.
              </p>
            </div>
            
            {/* Google Maps Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.177380798106!2d-115.31846408808583!3d36.31289477227488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c893357adc2aff%3A0x68d152a9c6f09956!2sSkye%20Canyon%20Real%20Estate%20%7C%20Homes%20by%20Dr.%20Jan%20Duffy!5e1!3m2!1sen!2sus!4v1756287875409!5m2!1sen!2sus" 
              width="100%" 
              height="400" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '16px' }}>
                <strong>Map Features:</strong> Restaurants, Parks, Shopping, Healthcare, Schools, and more
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.google.com/maps/place/Skye+Canyon,+Las+Vegas,+NV+89166" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                >
                  <span>🗺️</span>
                  Open in Google Maps
                </a>
                <a 
                  href="tel:(702) 500-1902"
                  style={{
                    border: '2px solid #1e3a8a',
                    color: '#1e3a8a',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.875rem',
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
                  Ask About Area
                </a>
              </div>
            </div>
          </div>
          
          {/* Location Highlights */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
              Why Choose Skye Canyon?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div style={{ padding: '20px' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🌄</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Mountain Views</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Stunning views of the Spring Mountains and Red Rock Canyon
                </p>
              </div>
              <div style={{ padding: '20px' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🚗</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Easy Access</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Close to I-215, US-95, and major Las Vegas attractions
                </p>
              </div>
              <div style={{ padding: '20px' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🏘️</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Family Friendly</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Excellent schools, parks, and family-oriented amenities
                </p>
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
