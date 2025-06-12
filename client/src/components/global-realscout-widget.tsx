import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': any;
    }
  }
  
  interface Window {
    RealScout?: {
      configure: (config: any) => void;
      init: () => void;
      refresh: () => void;
    };
  }
}

export default function GlobalRealScoutWidget() {
  useEffect(() => {
    const loadRealScoutScript = () => {
      // Remove existing script if present
      const existingScript = document.querySelector('script[src*="realscout"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://em.realscout.com/js/realscout-widgets.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.defer = true;
      script.setAttribute('data-widgets-loaded', 'true');
      
      script.onload = () => {
        console.log('RealScout widgets loaded globally');
        
        // Configure RealScout for optimal image loading
        if ((window as any).RealScout) {
          (window as any).RealScout.configure({
            imageLoadingPolicy: 'eager',
            crossOrigin: 'anonymous',
            allowImageFallback: true,
            enableLazyLoading: false,
            imageQuality: 'high',
            preloadImages: true
          });
        }
        
        // Force widget initialization and image loading
        setTimeout(() => {
          const widgets = document.querySelectorAll('realscout-office-listings');
          widgets.forEach((widget: any) => {
            // Trigger widget refresh
            if (widget.reinitialize) {
              widget.reinitialize();
            }
            
            // Force image loading by setting crossorigin attribute
            const images = widget.querySelectorAll('img');
            images.forEach((img: HTMLImageElement) => {
              img.crossOrigin = 'anonymous';
              img.loading = 'eager';
              
              // Reload image if it failed to load
              if (!img.complete || img.naturalHeight === 0) {
                const originalSrc = img.src;
                img.src = '';
                img.src = originalSrc;
              }
            });
          });
          
          // Also apply to any images that might load later
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                  if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as Element;
                    const images = element.querySelectorAll('img');
                    images.forEach((img: HTMLImageElement) => {
                      img.crossOrigin = 'anonymous';
                      img.loading = 'eager';
                    });
                  }
                });
              }
            });
          });
          
          widgets.forEach((widget) => {
            observer.observe(widget, { childList: true, subtree: true });
          });
        }, 1000);
      };

      script.onerror = () => {
        console.error('Failed to load RealScout widgets');
      };

      document.head.appendChild(script);
    };

    loadRealScoutScript();

    return () => {
      const script = document.querySelector('script[src*="realscout"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return null;
}