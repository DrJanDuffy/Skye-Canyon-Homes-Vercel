import { Switch, Route } from "wouter";

function HomePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Skye Canyon Homes for Sale | Las Vegas NV Real Estate</h1>
      <p>Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®.</p>
      
      {/* RealScout Widget - Homepage */}
      <div style={{ margin: '20px 0', border: '1px solid #ddd', padding: '10px', minHeight: '400px' }}>
        <h2>Featured Listings - Skye Canyon</h2>
        <div 
          data-realscout="office-listings"
          agent-encoded-id="QWdlbnQtMjI1MDUw"
          price-min="550000"
          price-max="9999999"
          style={{ minHeight: '300px' }}
        >
          Loading RealScout listings...
        </div>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h2>Contact Dr. Jan Duffy</h2>
        <p>Phone: (702) 500-1902</p>
        <p>Specializing in Skye Canyon luxury homes and new construction</p>
      </div>
    </div>
  );
}

function PropertiesPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>All Skye Canyon Homes for Sale</h1>
      
      {/* RealScout Widget - All Properties */}
      <div 
        data-realscout="office-listings"
        agent-encoded-id="QWdlbnQtMjI1MDUw"
        price-min="400000"
        price-max="9999999"
        style={{ minHeight: '600px', border: '1px solid #ddd', padding: '10px' }}
      >
        Loading all available properties...
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
  return <Router />;
}

export default App;