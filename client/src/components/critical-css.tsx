export default function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical above-the-fold styles */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2563eb 100%);
        }
        
        .nav-bar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(229, 231, 235, 0.8);
        }
        
        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Reduce layout shifts */
        .property-card {
          aspect-ratio: 16/9;
          min-height: 300px;
        }
        
        .market-stats {
          min-height: 200px;
        }
        
        /* Optimize font loading */
        .font-loaded {
          font-display: swap;
        }
      `
    }} />
  );
}