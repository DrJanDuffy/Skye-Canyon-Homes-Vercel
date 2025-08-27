import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import React, { Suspense } from 'react';

import Home from '@/pages/home';
import Properties from '@/pages/properties';
import PropertyDetail from '@/pages/property-detail';
import NotFound from '@/pages/not-found';
import NorthwestLasVegas from '@/pages/northwest-las-vegas';
import SkyeCanyonGuide from '@/pages/skye-canyon-guide';
import SkyeCanyonSchools from '@/pages/skye-canyon-schools';
import SkyeCanyonParks from '@/pages/skye-canyon-parks';
import SkyeCanyonCommunities from '@/pages/skye-canyon-communities';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/northwest-las-vegas" component={NorthwestLasVegas} />
      <Route path="/skye-canyon-guide" component={SkyeCanyonGuide} />
      <Route path="/skye-canyon-schools" component={SkyeCanyonSchools} />
      <Route path="/skye-canyon-parks" component={SkyeCanyonParks} />
      <Route path="/skye-canyon-communities" component={SkyeCanyonCommunities} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
