import { Switch, Route } from 'wouter';
import { useEffect } from 'react';

// Navigation Component
function Navigation() {
  return (
    <nav
      style={{
        backgroundColor: '#1e40af',
        padding: '15px 20px',
        color: 'white',
        borderBottom: '3px solid #3b82f6',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Dr. Jan Duffy, REALTOR® | Skye Canyon Specialist
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </a>
          <a href="/properties" style={{ color: 'white', textDecoration: 'none' }}>
            All Properties
          </a>
          <span style={{ color: '#fbbf24' }}>(702) 500-1902</span>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div
      style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc' }}
    >
      <Navigation />

      {/* Hero Section */}
      <div
        style={{
          backgroundColor: '#1e40af',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
            Skye Canyon Homes for Sale | Las Vegas NV Real Estate
          </h1>
          <p style={{ fontSize: '24px', marginBottom: '30px' }}>
            Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®
          </p>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Expert market knowledge, personalized service, and exclusive listings in North Las Vegas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* RealScout Widget - Homepage */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            marginBottom: '40px',
          }}
        >
          <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#1e40af' }}>
            Featured Skye Canyon Listings - $550K+
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-office-listings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                price-min="550000" 
                price-max="9999999"
                style="min-height: 500px; width: 100%; display: block;">
              </realscout-office-listings>`,
            }}
          ></div>
        </div>

        {/* Contact Section */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#1e40af' }}>
            Contact Dr. Jan Duffy - Skye Canyon Expert
          </h2>
          <div style={{ fontSize: '20px', marginBottom: '15px' }}>
            <strong>Phone: </strong>
            <span style={{ color: '#dc2626', fontSize: '24px' }}>(702) 500-1902</span>
          </div>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Specializing in Skye Canyon luxury homes and new construction
          </p>
          <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '15px' }}>
            Licensed Nevada REALTOR® | Northwest Las Vegas Expert | Over 15 Years Experience
          </p>
        </div>
      </div>
    </div>
  );
}

function PropertiesPage() {
  return (
    <div
      style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc' }}
    >
      <Navigation />

      {/* Page Header */}
      <div
        style={{
          backgroundColor: '#1e40af',
          color: 'white',
          padding: '40px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '40px', marginBottom: '15px', fontWeight: 'bold' }}>
            All Skye Canyon Homes for Sale
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>
            Browse our complete inventory of available properties in Skye Canyon
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* RealScout Widget - All Properties */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '30px',
          }}
        >
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#1e40af' }}>
            Complete Property Listings - Starting at $400K
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-office-listings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                price-min="400000" 
                price-max="9999999"
                style="min-height: 800px; width: 100%; display: block;">
              </realscout-office-listings>`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/properties" component={PropertiesPage} />
      <Route>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  // Initialize RealScout widgets when app loads
  useEffect(() => {
    // RealScout script is already loaded in HTML, just need to trigger widget initialization
    const initRealScout = () => {
      if (window.customElements && window.customElements.get('realscout-office-listings')) {
        console.log('RealScout widgets initialized');
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(initRealScout, 1000);
  }, []);

  return <Router />;
}

export default App;
