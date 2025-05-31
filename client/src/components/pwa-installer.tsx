import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    setDeferredPrompt(null);
  };

  if (!showInstallBanner) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border-blue-200 bg-blue-50 md:left-auto md:right-4 md:w-96">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">
              Get Skye Canyon Apps
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Choose your preferred way to search properties
            </p>
            
            <div className="space-y-2 mb-3">
              <div className="border border-blue-200 rounded-lg p-2 bg-white">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Full Property Search</h4>
                <p className="text-xs text-blue-600 mb-2">Complete MLS database with advanced filters</p>
                <a
                  href="https://app.bhhsnv.com/a1drjanduffy-4986"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-realscout-blue text-white px-3 py-2 rounded text-sm font-medium hover:bg-realscout-navy transition-colors text-center"
                  onClick={handleDismiss}
                >
                  Open Property Search
                </a>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-2 bg-white">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Skye Canyon Guide</h4>
                <p className="text-xs text-blue-600 mb-2">Market insights and neighborhood expertise</p>
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install Guide App
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="w-full text-blue-600 hover:text-blue-800 text-sm"
            >
              Not now
            </Button>
          </div>
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}