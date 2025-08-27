import { createRoot } from 'react-dom/client';
import App from './App-simple';
import './index-simple.css';

console.log('🚀 main.tsx: Starting React app initialization...');

// Add a fallback in case React fails
const addFallbackContent = (): void => {
  console.log('🔄 Adding fallback content...');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(to bottom right, #dbeafe, #bfdbfe); font-family: Arial, sans-serif;">
        <header style="background: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center;">
                <h1 style="font-size: 1.875rem; font-weight: 700; color: #1e3a8a; margin: 0;">Skye Canyon Homes</h1>
              </div>
              <div style="color: #1d4ed8; font-weight: 600;">Dr. Jan Duffy, REALTOR®</div>
            </div>
          </div>
        </header>
        
        <main style="max-width: 80rem; margin: 0 auto; padding: 3rem 1rem;">
          <div style="text-align: center;">
            <h2 style="font-size: 2.25rem; font-weight: 700; color: #111827; margin-bottom: 1.5rem;">Luxury Homes in Skye Canyon</h2>
            <p style="font-size: 1.25rem; color: #4b5563; margin-bottom: 2rem; max-width: 48rem; margin-left: auto; margin-right: auto;">
              Discover the finest properties in Las Vegas's premier master-planned community. Expert guidance from Dr. Jan Duffy, your Skye Canyon real estate specialist.
            </p>
            
            <div style="background: white; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 2rem; max-width: 42rem; margin: 0 auto;">
              <h3 style="font-size: 1.5rem; font-weight: 600; color: #1e3a8a; margin-bottom: 1rem;">Contact Dr. Jan Duffy</h3>
              <div style="margin-bottom: 0.75rem;">
                <p style="font-size: 1.125rem; color: #374151; margin: 0;">
                  <span style="font-weight: 600;">Phone:</span> (702) 500-1902
                </p>
              </div>
              <div style="margin-bottom: 0.75rem;">
                <p style="font-size: 1.125rem; color: #374151; margin: 0;">
                  <span style="font-weight: 600;">Email:</span> DrDuffy@SkyeCanyonHomesForSale.com
                </p>
              </div>
              <div style="margin-bottom: 0.75rem;">
                <p style="font-size: 1.125rem; color: #374151; margin: 0;">
                  <span style="font-weight: 600;">Address:</span> 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166
                </p>
              </div>
            </div>
            
            <div style="margin-top: 2rem;">
              <a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" 
                 style="display: inline-flex; align-items: center; padding: 1rem 2rem; border: 1px solid transparent; font-size: 1.125rem; font-weight: 500; border-radius: 0.5rem; color: white; background-color: #2563eb; text-decoration: none;">
                Search Skye Canyon Properties
              </a>
            </div>
          </div>
        </main>
        
        <footer style="background-color: #111827; color: white; padding: 2rem 0; margin-top: 4rem;">
          <div style="max-width: 80rem; margin: 0 auto; padding: 0 1rem; text-align: center;">
            <p style="font-size: 1.125rem; margin: 0;">© 2024 Dr. Jan Duffy Real Estate. All rights reserved.</p>
            <p style="color: #9ca3af; margin: 0.5rem 0 0 0;">Nevada Real Estate License S.0197614</p>
          </div>
        </footer>
      </div>
    `;
    console.log('✅ Fallback content added successfully');
  }
};

try {
  const rootElement: HTMLElement | null = document.getElementById('root');
  console.log('🔍 main.tsx: Root element found:', rootElement);

  if (rootElement) {
    console.log('✅ main.tsx: Creating React root...');
    const root = createRoot(rootElement);
    console.log('✅ main.tsx: React root created, rendering App...');
    root.render(<App />);
    console.log('✅ main.tsx: App rendered successfully!');
  } else {
    console.error('❌ main.tsx: Root element not found!');
    addFallbackContent();
  }
} catch (error) {
  console.error('❌ main.tsx: Error during React initialization:', error);
  addFallbackContent();
}
