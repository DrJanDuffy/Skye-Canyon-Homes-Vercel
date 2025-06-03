import fs from 'fs';
import path from 'path';

// Create optimized client bundle for production
const clientJS = `
// Dr. Jan Duffy Real Estate - Production Bundle
(function() {
  'use strict';

  // Track RealScout widget interactions
  function trackWidgetEvent(type, data) {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'realscout_interaction',
        parameters: { interaction_type: type, ...data, timestamp: new Date().toISOString() }
      })
    }).catch(console.error);
  }

  // Initialize RealScout widgets
  function initRealScout() {
    if (typeof window.RealScout !== 'undefined') {
      console.log('RealScout initialized for property searches and home valuations');
    } else {
      setTimeout(initRealScout, 1000);
    }
  }

  // Create main application
  function createApp() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = \`
      <!-- Navigation -->
      <nav class="nav-header">
        <div class="container">
          <div style="font-weight: 700; font-size: 1.25rem; color: #1e40af;">
            Dr. Jan Duffy REALTOR®
          </div>
          <div style="display: flex; gap: 1rem;">
            <a href="tel:+17025001902" class="btn-primary">Call (702) 500-1902</a>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div style="position: absolute; inset: 0; opacity: 0.6;">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Skye Canyon homes" 
            style="width: 100%; height: 100%; object-fit: cover;"
            loading="eager"
          />
        </div>
        
        <div class="container" style="position: relative; z-index: 2;">
          <div class="text-center">
            <div style="display: inline-flex; align-items: center; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border-radius: 9999px; padding: 0.5rem 1rem; margin-bottom: 1rem;">
              <span style="font-size: 0.875rem; font-weight: 500;">🏆 Top Skye Canyon Specialist Since 2009</span>
            </div>
            
            <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.1;">
              Skye Canyon Homes for Sale
            </h1>
            <h2 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem; opacity: 0.95;">
              Dr. Jan Duffy, REALTOR®
            </h2>
            <p style="font-size: 1.125rem; opacity: 0.9; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
              Luxury Real Estate Expert | Toll Brothers & Lennar Partner | Las Vegas, Nevada 89166
            </p>
            
            <!-- Stats -->
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-bottom: 3rem;">
              <div class="text-center">
                <div style="font-size: 2rem; font-weight: 700;">150+</div>
                <div style="font-size: 0.875rem; opacity: 0.8;">Homes Sold</div>
              </div>
              <div class="text-center">
                <div style="font-size: 2rem; font-weight: 700;">15+</div>
                <div style="font-size: 0.875rem; opacity: 0.8;">Years Experience</div>
              </div>
              <div class="text-center">
                <div style="font-size: 2rem; font-weight: 700;">98%</div>
                <div style="font-size: 0.875rem; opacity: 0.8;">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <!-- RealScout Widget Section -->
          <div style="background: rgba(255,255,255,0.95); border-radius: 1rem; padding: 2rem; max-width: 48rem; margin: 0 auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
            <div class="text-center mb-6" style="color: #111827;">
              <h3 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem;">
                Find Your Dream Home in Skye Canyon
              </h3>
              <p style="font-size: 1.125rem; color: #4b5563;">
                Search available properties or get your home's current market value
              </p>
            </div>
            
            <div class="grid grid-cols-1 gap-4 mb-6" style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div style="background: #dbeafe; padding: 1.5rem; border-radius: 0.5rem; text-align: center;">
                <h4 style="font-weight: 600; color: #1e3a8a; margin-bottom: 0.75rem;">Search Homes for Sale</h4>
                <realscout-search 
                  agent-encoded-id="QWdlbnQtMjI1MDUw"
                  search-type="buy"
                  location="Skye Canyon, Las Vegas, NV"
                  price-min="400000"
                  price-max="3000000"
                  property-types="SFR,MF,TC"
                  data-production="true">
                </realscout-search>
                <p style="font-size: 0.875rem; color: #1e40af; margin-top: 0.75rem;">
                  Browse luxury homes, new construction, and custom properties
                </p>
              </div>
              
              <div style="background: #dcfce7; padding: 1.5rem; border-radius: 0.5rem; text-align: center;">
                <h4 style="font-weight: 600; color: #14532d; margin-bottom: 0.75rem;">Get Your Home's Value</h4>
                <realscout-cma 
                  agent-encoded-id="QWdlbnQtMjI1MDUw"
                  location="Skye Canyon, Las Vegas, NV"
                  data-production="true">
                </realscout-cma>
                <p style="font-size: 0.875rem; color: #15803d; margin-top: 0.75rem;">
                  Instant market analysis with recent comparable sales
                </p>
              </div>
            </div>
            
            <div class="text-center" style="color: #111827;">
              <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
                Powered by RealScout MLS • Updated daily with live data
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center;">
                <button class="btn-primary" onclick="trackWidgetEvent('search_clicked', {location: 'hero'})">
                  Advanced Property Search
                </button>
                <a href="tel:+17025001902" style="background: white; border: 2px solid #3b82f6; color: #3b82f6; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; display: inline-block;">
                  Contact Dr. Jan Duffy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Current Listings -->
      <section class="py-16 bg-white">
        <div class="container">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Current Skye Canyon Listings
            </h2>
            <p style="font-size: 1.25rem; color: #6b7280;">
              Live inventory of available homes
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-lg" style="overflow: hidden;">
            <div style="background: linear-gradient(to right, #3b82f6, #1e40af); color: white; padding: 1.5rem;">
              <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Search Skye Canyon Homes</h3>
              <p style="color: #bfdbfe; margin-bottom: 1rem;">Browse available properties and find your dream home</p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <button class="bg-white" style="background: white; color: #3b82f6; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; border: none; cursor: pointer;" onclick="trackWidgetEvent('search_all_clicked', {location: 'listings'})">
                  Search All Homes
                </button>
                <button style="background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; border: 2px solid #60a5fa; cursor: pointer;" onclick="trackWidgetEvent('home_value_clicked', {location: 'listings'})">
                  Get Home Value
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <realscout-office-listings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                sort-order="NEWEST" 
                listing-status="For Sale" 
                property-types="SFR,MF,TC,LAND" 
                price-min="400000"
                price-max="3000000"
                max-listings="12"
                show-photos="true"
                show-details="true"
                layout="grid"
                columns="3"
                data-production="true">
              </realscout-office-listings>
            </div>
            
            <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 1.5rem; text-align: center;">
              <p style="color: #374151; margin-bottom: 1rem; font-weight: 500;">
                Ready to explore more properties or get your home's value?
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center;">
                <button class="btn-primary" onclick="trackWidgetEvent('view_all_clicked', {location: 'bottom_cta'})">
                  View All Available Homes
                </button>
                <button style="background: #16a34a; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; border: none; cursor: pointer;" onclick="trackWidgetEvent('instant_valuation_clicked', {location: 'bottom_cta'})">
                  Get Instant Home Valuation
                </button>
              </div>
              <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.75rem;">
                Click any property above to start your search or get detailed information
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section style="padding: 3rem 0; background: linear-gradient(to right, #3b82f6, #1e40af); color: white;">
        <div class="container text-center">
          <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem;">Ready to Find Your Perfect Home?</h2>
          <p style="font-size: 1.25rem; color: #bfdbfe; margin-bottom: 2rem;">
            Search Skye Canyon properties or get your home's current market value instantly
          </p>
          <div style="display: flex; flex-direction: column; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
            <button style="background: white; color: #3b82f6; padding: 1rem 2rem; border-radius: 0.5rem; font-weight: 600; font-size: 1.125rem; border: none; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);" onclick="trackWidgetEvent('final_search_clicked', {location: 'footer'})">
              Search Available Homes
            </button>
            <button style="background: #3b82f6; color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-weight: 600; font-size: 1.125rem; border: 2px solid #60a5fa; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);" onclick="trackWidgetEvent('final_valuation_clicked', {location: 'footer'})">
              Get Home Valuation
            </button>
          </div>
          <p style="font-size: 0.875rem; color: #bfdbfe; margin-bottom: 2rem;">
            Powered by RealScout MLS • Updated in real-time
          </p>
          <div>
            <p style="font-size: 1.125rem; font-weight: 600;">Dr. Jan Duffy, REALTOR®</p>
            <p style="color: #bfdbfe;">Phone: (702) 500-1902</p>
            <p style="color: #bfdbfe;">10111 W Skye Canyon Park Dr, Las Vegas, NV 89166</p>
            <p style="color: #bfdbfe;">Mo-Fr 9AM-6PM, Sa 9AM-5PM, Su 11AM-4PM</p>
          </div>
        </div>
      </section>
    \`;
  }

  // Initialize everything
  function init() {
    createApp();
    initRealScout();
    
    // Track page load
    trackWidgetEvent('page_loaded', {
      page: 'home',
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
    
    // Add click tracking for all buttons
    document.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        const text = e.target.textContent.toLowerCase();
        if (text.includes('search') || text.includes('value') || text.includes('home')) {
          trackWidgetEvent('interaction', {
            element: e.target.tagName,
            text: e.target.textContent,
            location: e.target.closest('section')?.className || 'unknown'
          });
        }
      }
    });
  }

  // Make trackWidgetEvent available globally
  window.trackWidgetEvent = trackWidgetEvent;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;

// Write the production JavaScript
fs.writeFileSync('dist/public/assets/index.js', clientJS);

console.log('Production client bundle created successfully!');