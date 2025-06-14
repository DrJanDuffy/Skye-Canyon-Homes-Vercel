import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { Suspense, useEffect } from "react";
import StructuredData from "@/components/structured-data-fixed";
import PWAInstaller from "@/components/pwa-installer";
import PerformanceOptimizer from "@/components/performance-optimizer";
import PerformanceMonitor from "@/components/performance-monitor";
import CriticalCSS from "@/components/critical-css";
import PerformanceCriticalLoader from "@/components/performance-critical-loader";
import VoiceAssistant from "@/components/voice-assistant";
import VoiceSearchSchema from "@/components/voice-search-schema";
import EnhancedStructuredData from "@/components/enhanced-structured-data";
import ComprehensiveSchemaMarkup from "@/components/comprehensive-schema";
import AIContentOptimizer from "@/components/ai-content-optimizer";
import GEOAuthoritySignals from "@/components/geo-authority-signals";
import MobileOptimizer from "@/components/mobile-optimizer";
import AnalyticsTracker from "@/components/analytics-tracker";
import SEOOptimizer from "@/components/seo-optimizer";
import DeploymentSEOChecklist from "@/components/deployment-seo-checklist";
import PerformanceCritical from "@/components/performance-critical";
import ImageCompression from "@/components/image-compression";
import ProductionReadiness from "@/components/production-readiness";
import GoogleRichSnippets from "@/components/google-rich-snippets";
import GlobalRealScoutWidget from "@/components/global-realscout-widget";
import BusinessAuthoritySchema from "@/components/business-authority-schema";
import ReviewSchema from "@/components/review-schema";
import PropertyListingSchema from "@/components/property-listing-schema";

import { usePredictiveLoading } from "@/hooks/use-predictive-loading";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import PropertyDetail from "@/pages/property-detail";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import VoiceSearchPage from "@/pages/voice-search";
import BuyerAgentServices from "@/pages/services/buyer-agent";
import FirstTimeBuyerServices from "@/pages/services/first-time-buyer";
import LuxuryPropertyServices from "@/pages/services/luxury-properties";
import NewConstructionServices from "@/pages/services/new-construction";
import RelocationServices from "@/pages/services/relocation";
import SellerAgentServices from "@/pages/services/seller-agent";
import TestService from "@/pages/services/test";
import LeadDashboard from "@/pages/lead-dashboard";
import FollowUpBossStatus from "@/pages/followup-boss-status";
import NotFound from "@/pages/not-found";
import NorthwestLasVegas from "@/pages/northwest-las-vegas";
import LasVegasRealEstate from "@/pages/las-vegas-real-estate";
import LuxuryHomesLasVegas from "@/pages/luxury-homes-las-vegas";
import SkyeCanyonGuide from "@/pages/skye-canyon-guide";
import SkyeCanyonSchools from "@/pages/skye-canyon-schools";
import SkyeCanyonParks from "@/pages/skye-canyon-parks";
import SkyeCanyonCommunities from "@/pages/skye-canyon-communities";
import MarketAnalysis from "@/pages/market-analysis";
import NeighborhoodAnalysis from "@/pages/neighborhood-analysis";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/voice-search" component={VoiceSearchPage} />
      <Route path="/services/buyer-agent" component={BuyerAgentServices} />
      <Route path="/services/first-time-buyer" component={FirstTimeBuyerServices} />
      <Route path="/services/luxury-properties" component={LuxuryPropertyServices} />
      <Route path="/services/new-construction" component={NewConstructionServices} />
      <Route path="/services/relocation" component={RelocationServices} />
      <Route path="/services/seller-agent" component={SellerAgentServices} />
      <Route path="/services/test" component={TestService} />
      <Route path="/leads" component={LeadDashboard} />
      <Route path="/followup-boss-status" component={FollowUpBossStatus} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/northwest-las-vegas" component={NorthwestLasVegas} />
      <Route path="/las-vegas-real-estate" component={LasVegasRealEstate} />
      <Route path="/luxury-homes-las-vegas" component={LuxuryHomesLasVegas} />
      <Route path="/skye-canyon-guide" component={SkyeCanyonGuide} />
      <Route path="/skye-canyon-schools" component={SkyeCanyonSchools} />
      <Route path="/skye-canyon-parks" component={SkyeCanyonParks} />
      <Route path="/skye-canyon-communities" component={SkyeCanyonCommunities} />
      <Route path="/market-analysis" component={MarketAnalysis} />
      <Route path="/neighborhood-analysis" component={NeighborhoodAnalysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  usePredictiveLoading();

  // Initialize Google Analytics when app loads
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      import('./lib/google-analytics').then(({ initGA }) => {
        initGA();
      });
    } else {
      console.warn('Google Analytics Measurement ID not configured');
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <GlobalRealScoutWidget />
          <CriticalCSS />
          <AnalyticsTracker />
          <GoogleRichSnippets />
          <BusinessAuthoritySchema />
          <ReviewSchema />
          <PropertyListingSchema />
          <StructuredData />
          <Router />
          
          {/* Load essential SEO components */}
          <Suspense fallback={null}>
            <EnhancedStructuredData />
            <GEOAuthoritySignals />
            <VoiceSearchSchema />
            <PWAInstaller />
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
