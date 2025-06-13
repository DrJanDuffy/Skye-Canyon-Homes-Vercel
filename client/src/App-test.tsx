import { Switch, Route } from "wouter";

function TestHome() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Skye Canyon Homes - Test Page</h1>
      <p>This is a test to verify React is working.</p>
      <div 
        data-realscout="office-listings"
        agent-encoded-id="QWdlbnQtMjI1MDUw"
        price-min="550000"
        price-max="9999999"
        style={{ minHeight: '400px', border: '1px solid #ccc', padding: '10px' }}
      >
        RealScout Widget Loading...
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={TestHome} />
      <Route>404 - Page Not Found</Route>
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;