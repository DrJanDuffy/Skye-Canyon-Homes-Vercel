import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StructuredData from "@/components/structured-data";
import PWAInstaller from "@/components/pwa-installer";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import PropertyDetail from "@/pages/property-detail";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import NorthwestLasVegas from "@/pages/northwest-las-vegas";
import LasVegasRealEstate from "@/pages/las-vegas-real-estate";
import LuxuryHomesLasVegas from "@/pages/luxury-homes-las-vegas";

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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StructuredData />
          <Router />
          <PWAInstaller />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
