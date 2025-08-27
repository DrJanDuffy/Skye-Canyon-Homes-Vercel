import { useEffect } from 'react';

interface AutomatedConversionTrackerProps {
  onConversionEvent?: (eventType: string, data: any) => void;
}

export default function AutomatedConversionTracker({
  onConversionEvent,
}: AutomatedConversionTrackerProps) {
  useEffect(() => {
    // Track voice search conversion events
    const handleVoiceSearchLimit = (event: CustomEvent) => {
      const { searchCount, query } = event.detail;

      // Log conversion analytics
      if (window.gtag) {
        window.gtag('event', 'voice_search_limit_reached', {
          event_category: 'conversion',
          event_label: 'realscout_popup_triggered',
          value: searchCount,
        });
      }

      // Trigger automated RealScout onboarding popup
      setTimeout(() => {
        createRealScoutConversionPopup(query);
      }, 1500);

      onConversionEvent?.('voice_search_limit', { searchCount, query });
    };

    // Listen for voice search limit events
    window.addEventListener('voiceSearchLimitReached', handleVoiceSearchLimit as EventListener);

    return () => {
      window.removeEventListener(
        'voiceSearchLimitReached',
        handleVoiceSearchLimit as EventListener
      );
    };
  }, [onConversionEvent]);

  const createRealScoutConversionPopup = (lastQuery: string) => {
    // Remove existing popup if present
    const existingPopup = document.getElementById('realscout-conversion-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create conversion-optimized popup
    const overlay = document.createElement('div');
    overlay.id = 'realscout-conversion-popup';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-out;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
      background: white;
      padding: 2.5rem;
      border-radius: 1rem;
      max-width: 550px;
      width: 90%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      position: relative;
      animation: slideUp 0.4s ease-out;
    `;

    popup.innerHTML = `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      </style>
      
      <div style="margin-bottom: 2rem;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;">
          <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 style="font-size: 1.75rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
          Continue Your Property Search
        </h3>
        <p style="color: #6b7280; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">
          You've explored our voice search feature! Ready to discover all available properties in Skye Canyon with our comprehensive MLS platform?
        </p>
        
        ${
          lastQuery
            ? `
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
            <p style="color: #4b5563; font-size: 0.9rem; margin: 0;">
              Last search: <strong>"${lastQuery}"</strong>
            </p>
          </div>
        `
            : ''
        }
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <a href="http://drjanduffy.realscout.com/onboarding" 
           target="_blank" 
           rel="noopener noreferrer"
           onclick="trackConversionClick('realscout_onboarding', 'voice_search_popup')"
           style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 1rem 2rem; border-radius: 0.75rem; text-decoration: none; font-weight: 700; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s; box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
          </svg>
          Search All Properties
        </a>
        <button onclick="closeConversionPopup()" 
                style="background: transparent; border: 2px solid #d1d5db; color: #6b7280; padding: 1rem 1.5rem; border-radius: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
          Browse Later
        </button>
      </div>
      
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #059669;">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span style="font-size: 0.9rem; font-weight: 500;">Live MLS Data</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #059669;">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
          <span style="font-size: 0.9rem; font-weight: 500;">Expert Agent Support</span>
        </div>
      </div>
      
      <p style="font-size: 0.8rem; color: #9ca3af; margin: 0;">
        Voice searches reset daily • No obligation • Free property alerts
      </p>
      
      <script>
        function trackConversionClick(platform, source) {
          if (window.gtag) {
            window.gtag('event', 'conversion_click', {
              event_category: 'lead_generation',
              event_label: platform + '_from_' + source,
              value: 1
            });
          }
        }
        
        function closeConversionPopup() {
          const popup = document.getElementById('realscout-conversion-popup');
          if (popup) {
            popup.style.animation = 'fadeOut 0.2s ease-in';
            setTimeout(() => popup.remove(), 200);
          }
          
          if (window.gtag) {
            window.gtag('event', 'popup_dismissed', {
              event_category: 'engagement',
              event_label: 'voice_search_popup'
            });
          }
        }
        
        // Close on overlay click
        document.getElementById('realscout-conversion-popup').addEventListener('click', function(e) {
          if (e.target === this) {
            closeConversionPopup();
          }
        });
      </script>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Auto-close after 45 seconds
    setTimeout(() => {
      const popup = document.getElementById('realscout-conversion-popup');
      if (popup) {
        const closeButton = popup.querySelector('button');
        if (closeButton) {
          closeButton.click();
        }
      }
    }, 45000);
  };

  return null; // This component doesn't render anything visible
}
