import { useEffect } from 'react';

// Inline critical CSS for above-the-fold content
export default function CriticalCSSInline() {
  useEffect(() => {
    const criticalCSS = `
      /* Critical above-the-fold styles */
      .hero-section {
        min-height: 80vh;
        background: linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2c5d8f 100%);
        display: flex;
        align-items: center;
        contain: layout style paint;
        transform: translateZ(0);
        will-change: transform;
      }
      
      .navigation {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        backdrop-filter: blur(8px);
        background: rgba(255, 255, 255, 0.95);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        will-change: transform;
        contain: layout style;
      }
      
      .realscout-office-listings {
        min-height: 400px;
        display: block;
        contain: layout style;
        content-visibility: auto;
      }
      
      /* Prevent layout shift */
      .property-card {
        aspect-ratio: 16/12;
        contain: layout;
      }
      
      /* Font optimization */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Inter'), url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* Reduce reflow and repaint */
      * {
        box-sizing: border-box;
      }
      
      img {
        max-width: 100%;
        height: auto;
        image-rendering: crisp-edges;
      }
      
      /* Critical button styles */
      .btn-primary {
        background: #4a90e2;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        border: none;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease;
        transform: translateZ(0);
      }
      
      .btn-primary:hover {
        background: #357abd;
      }
      
      /* Immediate visible text styles */
      h1, h2, .hero-title {
        font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.2;
        margin: 0;
        transform: translateZ(0);
      }
      
      /* Force GPU acceleration for smooth rendering */
      .hero-section * {
        backface-visibility: hidden;
        perspective: 1000px;
      }
    `;

    // Inject critical CSS immediately
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalCSS;
    styleElement.setAttribute('data-critical-css', 'true');
    document.head.insertBefore(styleElement, document.head.firstChild);

    return () => {
      const criticalStyle = document.querySelector('style[data-critical-css="true"]');
      if (criticalStyle) {
        document.head.removeChild(criticalStyle);
      }
    };
  }, []);

  return null;
}