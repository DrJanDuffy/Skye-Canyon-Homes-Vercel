import React from 'react';
import { Router, Route } from 'wouter';
import ModernHeader from '@/components/modern-header';
import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import Properties from '@/pages/properties';
import PropertyDetail from '@/pages/property-detail';
import LasVegasRealEstate from '@/pages/las-vegas-real-estate';
import LuxuryHomesLasVegas from '@/pages/luxury-homes-las-vegas';
import MarketAnalysis from '@/pages/market-analysis';
import NeighborhoodAnalysis from '@/pages/neighborhood-analysis';
import PrivacyPolicy from '@/pages/privacy-policy';
import TermsOfService from '@/pages/terms-of-service';
import VoiceSearch from '@/pages/voice-search';
import SkyeCanyonGuide from '@/pages/skye-canyon-guide';
import SkyeCanyonCommunities from '@/pages/skye-canyon-communities';
import SkyeCanyonParks from '@/pages/skye-canyon-parks';
import SkyeCanyonSchools from '@/pages/skye-canyon-schools';
import NorthwestLasVegas from '@/pages/northwest-las-vegas';
import PerformanceDashboard from '@/pages/performance-dashboard';
import LeadDashboard from '@/pages/lead-dashboard';
import FollowupBossStatus from '@/pages/followup-boss-status';
import SeoManagement from '@/pages/seo-management';
import HomeSimple from '@/pages/home-simple';
import NotFound from '@/pages/not-found';
import Search from '@/pages/search';

// Service Pages
import BuyerAgent from '@/pages/services/buyer-agent';
import FirstTimeBuyer from '@/pages/services/first-time-buyer';
import LuxuryProperties from '@/pages/services/luxury-properties';
import NewConstruction from '@/pages/services/new-construction';
import SellerAgent from '@/pages/services/seller-agent';
import Relocation from '@/pages/services/relocation';

export default function App(): JSX.Element {
  console.log('🔍 App component is rendering...');
  
  return (
    <Router>
      <ModernHeader />
      
      {/* Main Routes */}
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/las-vegas" component={LasVegasRealEstate} />
      <Route path="/las-vegas-real-estate" component={LasVegasRealEstate} />
      <Route path="/luxury-homes-las-vegas" component={LuxuryHomesLasVegas} />
      <Route path="/market-analysis" component={MarketAnalysis} />
      <Route path="/neighborhood-analysis" component={NeighborhoodAnalysis} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/voice-search" component={VoiceSearch} />
      <Route path="/skye-canyon-guide" component={SkyeCanyonGuide} />
      <Route path="/skye-canyon-communities" component={SkyeCanyonCommunities} />
      <Route path="/skye-canyon-parks" component={SkyeCanyonParks} />
      <Route path="/skye-canyon-schools" component={SkyeCanyonSchools} />
      <Route path="/northwest-las-vegas" component={NorthwestLasVegas} />
      <Route path="/performance-dashboard" component={PerformanceDashboard} />
      <Route path="/lead-dashboard" component={LeadDashboard} />
      <Route path="/followup-boss-status" component={FollowupBossStatus} />
      <Route path="/seo-management" component={SeoManagement} />
      <Route path="/home-simple" component={HomeSimple} />
      
      {/* Service Routes */}
      <Route path="/services/buyer-agent" component={BuyerAgent} />
      <Route path="/services/first-time-buyer" component={FirstTimeBuyer} />
      <Route path="/services/luxury-properties" component={LuxuryProperties} />
      <Route path="/services/new-construction" component={NewConstruction} />
      <Route path="/services/seller-agent" component={SellerAgent} />
      <Route path="/services/relocation" component={Relocation} />
      
      {/* Search Route */}
      <Route path="/search" component={Search} />
      <Route path="/search/:query" component={Search} />
      
      {/* 404 Route - must be last */}
      <Route component={NotFound} />
    </Router>
  );
}
