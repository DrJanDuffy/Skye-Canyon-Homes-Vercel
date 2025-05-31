import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Shield, Gem, Star } from "lucide-react";

export default function LuxuryHomesLasVegas() {
  return (
    <>
      <Helmet>
        <title>Luxury Homes Las Vegas | High-End Real Estate | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Luxury homes for sale in Las Vegas featuring Skye Canyon, The Ridges, and exclusive communities. Expert service from Dr. Jan Duffy, licensed Nevada REALTOR®." />
        <meta name="keywords" content="luxury homes Las Vegas, high-end real estate, exclusive communities, Nevada luxury properties" />
        <meta property="og:title" content="Luxury Homes Las Vegas | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Discover Las Vegas luxury homes in premier communities with expert guidance from Dr. Jan Duffy." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/luxury-homes-las-vegas" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Luxury Homes Las Vegas
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover exclusive properties in Las Vegas's most prestigious communities
            </p>
          </div>
        </section>

        {/* Luxury Communities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Premier Luxury Communities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Skye Canyon</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$650K - $1.2M+</p>
                  <p className="text-gray-600">Premier guard-gated community with luxury amenities</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">The Ridges</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$800K - $3M+</p>
                  <p className="text-gray-600">Exclusive hillside community with stunning views</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Spanish Trail</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$500K - $1.5M</p>
                  <p className="text-gray-600">Established luxury golf community</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}