import { useEffect, useState } from 'react';

export default function MobileOptimizer() {
  const [isMobile, setIsMobile] = useState(false);
  const [_orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    // Mobile viewport optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }

    // Touch optimization for iOS
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';

    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute(
              'content',
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
          }
        }
      });

      input.addEventListener('blur', () => {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute(
              'content',
              'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
            );
          }
        }
      });
    });

    // Mobile-specific optimizations
    if (isMobile) {
      // Add mobile-specific classes
      document.documentElement.classList.add('mobile-device');

      // Optimize touch scroll performance
      document.body.style.webkitOverflowScrolling = 'touch';

      // Hide address bar on scroll (mobile Safari)
      let lastScrollTop = 0;
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          window.scrollTo(0, scrollTop + 1);
        }
        lastScrollTop = scrollTop;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, [isMobile]);

  useEffect(() => {
    // Apply mobile-specific CSS optimizations
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile-specific optimizations */
      @media (max-width: 767px) {
        /* Optimize tap targets */
        .btn, button, a, [role="button"] {
          min-height: 44px;
          min-width: 44px;
          padding: 12px 16px;
        }
        
        /* Improve text readability */
        body {
          font-size: 16px;
          line-height: 1.5;
        }
        
        /* Optimize property cards for mobile */
        .property-card {
          margin-bottom: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* Mobile navigation */
        .navigation {
          padding: 8px 16px;
          backdrop-filter: blur(10px);
        }
        
        /* Touch-friendly forms */
        input, select, textarea {
          font-size: 16px;
          padding: 14px 16px;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: #3b82f6;
          outline: none;
          transform: scale(1.02);
          transition: all 0.2s ease;
        }
        
        /* Optimize hero section for mobile */
        .hero-section {
          min-height: 100vh;
          padding: 60px 20px 40px;
        }
        
        .hero-section h1 {
          font-size: 2rem;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        
        .hero-section p {
          font-size: 1.1rem;
          margin-bottom: 24px;
        }
        
        /* Mobile property grid */
        .properties-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          padding: 0 16px;
        }
        
        /* Swipeable property cards */
        .property-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 16px;
          padding: 0 16px;
        }
        
        .property-carousel .property-card {
          flex: 0 0 280px;
          scroll-snap-align: start;
        }
        
        /* Mobile contact forms */
        .contact-form {
          padding: 24px 20px;
        }
        
        /* Optimize images for mobile */
        .property-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        /* Mobile-friendly pricing */
        .price-display {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e40af;
        }
        
        /* Touch-optimized buttons */
        .cta-button {
          width: 100%;
          padding: 16px 24px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 12px;
          margin: 8px 0;
        }
        
        /* Safe area handling for newer phones */
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        /* Performance optimizations */
        * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        
        .scroll-container {
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }
      }
      
      /* Landscape orientation optimizations */
      @media (max-width: 767px) and (orientation: landscape) {
        .hero-section {
          min-height: 90vh;
          padding: 40px 20px 20px;
        }
        
        .hero-section h1 {
          font-size: 1.8rem;
        }
        
        .mobile-nav {
          height: 50px;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component only applies mobile optimizations
}
