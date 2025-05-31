import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StructuredData from "@/components/structured-data";
import PWAInstaller from "@/components/pwa-installer";
import PerformanceOptimizer from "@/components/performance-optimizer";
import PerformanceMonitor from "@/components/performance-monitor";
import CriticalCSS from "@/components/critical-css";
import VoiceAssistant from "@/components/voice-assistant";
import VoiceSearchSchema from "@/components/voice-search-schema";
import EnhancedStructuredData from "@/components/enhanced-structured-data";
import AIContentOptimizer from "@/components/ai-content-optimizer";
import GEOAuthoritySignals from "@/components/geo-authority-signals";
import MobileOptimizer from "@/components/mobile-optimizer";
import { usePredictiveLoading } from "@/hooks/use-predictive-loading";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import PropertyDetail from "@/pages/property-detail";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import NorthwestLasVegas from "@/pages/northwest-las-vegas";
import LasVegasRealEstate from "@/pages/las-vegas-real-estate";
import LuxuryHomesLasVegas from "@/pages/luxury-homes-las-vegas";
import SkyeCanyonGuide from "@/pages/skye-canyon-guide";
import MarketAnalysis from "@/pages/market-analysis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/about" component={About} />
      <Route path="/northwest-las-vegas" component={NorthwestLasVegas} />
      <Route path="/las-vegas-real-estate" component={LasVegasRealEstate} />
      <Route path="/luxury-homes-las-vegas" component={LuxuryHomesLasVegas} />
      <Route path="/skye-canyon-guide" component={SkyeCanyonGuide} />
      <Route path="/market-analysis" component={MarketAnalysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  usePredictiveLoading();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CriticalCSS />
          <MobileOptimizer />
          <PerformanceOptimizer />
          <PerformanceMonitor />
          <StructuredData />
          <EnhancedStructuredData />
          <AIContentOptimizer />
          <GEOAuthoritySignals />
          <VoiceSearchSchema />
          <Router />
          <VoiceAssistant />
          <PWAInstaller />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
