interface RealScoutListingsProps {
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': any;
    }
  }
}

export default function RealScoutListings({ className = "" }: RealScoutListingsProps) {

  return (
    <>
      <style>{`
        /* Enhanced RealScout Widget Styling */
        realscout-office-listings {
          display: block !important;
          width: 100% !important;
          min-height: 500px !important;
          background: white !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }

        /* Force all images to display */
        realscout-office-listings img,
        realscout-office-listings [src],
        realscout-office-listings picture,
        realscout-office-listings [style*="background-image"] {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: cover !important;
          border-radius: 8px !important;
          transition: transform 0.3s ease !important;
        }

        /* Property card styling */
        realscout-office-listings .property-card,
        realscout-office-listings .listing-card {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 12px !important;
          padding: 16px !important;
          margin-bottom: 16px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
          transition: box-shadow 0.3s ease !important;
        }

        realscout-office-listings .property-card:hover,
        realscout-office-listings .listing-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
          transform: translateY(-2px) !important;
        }

        /* Price styling */
        realscout-office-listings .price,
        realscout-office-listings .property-price {
          color: #2563eb !important;
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          margin-bottom: 8px !important;
        }

        /* Address styling */
        realscout-office-listings .address,
        realscout-office-listings .property-address {
          color: #374151 !important;
          font-weight: 600 !important;
          font-size: 1.1rem !important;
          margin-bottom: 8px !important;
        }

        /* Details styling */
        realscout-office-listings .details,
        realscout-office-listings .property-details {
          color: #6b7280 !important;
          font-size: 0.9rem !important;
          display: flex !important;
          gap: 12px !important;
          margin-top: 8px !important;
        }

        /* Button styling */
        realscout-office-listings button,
        realscout-office-listings .btn {
          background: #2563eb !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: background 0.3s ease !important;
        }

        realscout-office-listings button:hover,
        realscout-office-listings .btn:hover {
          background: #1d4ed8 !important;
        }

        /* Grid layout */
        realscout-office-listings .listings-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
          gap: 20px !important;
          padding: 20px !important;
        }

        /* Loading state */
        realscout-office-listings:empty:after {
          content: "Loading luxury properties..." !important;
          display: block !important;
          text-align: center !important;
          padding: 40px !important;
          color: #6b7280 !important;
          font-size: 1.1rem !important;
        }

        /* Remove any obstructing overlays */
        realscout-office-listings .overlay,
        realscout-office-listings .loading-overlay {
          display: none !important;
        }
      `}</style>
      <div className={`${className} realscout-container`} style={{ minHeight: '400px' }}>
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
          data-production="true"
          style="width: 100%; min-height: 500px;"
        ></realscout-office-listings>
        
        {/* Fallback content if widget fails to load */}
        <noscript>
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Current Listings</h3>
            <p className="text-gray-600">Please enable JavaScript to view our current property listings.</p>
          </div>
        </noscript>
      </div>
    </>
  );
}