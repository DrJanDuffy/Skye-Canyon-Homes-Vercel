import { Helmet } from 'react-helmet-async';
import { useSearchParams } from '@/hooks/use-search-params';
import BackToTop from '@/components/back-to-top';
import Breadcrumb from '@/components/breadcrumb';
import FAQSection from '@/components/faq-section';

import FollowUpBossListings from '@/components/followup-boss-listings';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import RealScoutListings from '@/components/realscout-listings';

export default function Properties() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.search || '';
  return (
    <>
      <Helmet>
        <title>
          {searchQuery 
            ? `Search Results for "${searchQuery}" - Skye Canyon Properties | Dr. Jan Duffy REALTOR®`
            : "Skye Canyon Properties for Sale MLS Listings 89166 | Dr. Jan Duffy REALTOR®"
          }
        </title>
        <meta
          name="description"
          content={
            searchQuery
              ? `Find Skye Canyon properties matching "${searchQuery}" in Las Vegas, NV 89166. Expert assistance from Dr. Jan Duffy REALTOR® for luxury homes and golf course properties.`
              : "Browse current Skye Canyon MLS properties for sale in Las Vegas, NV 89166. Luxury homes, golf course properties, and new construction. Expert service by Dr. Jan Duffy REALTOR®."
          }
        />
        <meta
          name="keywords"
          content="Skye Canyon properties, MLS listings 89166, luxury homes Las Vegas, golf course properties, new construction, Desert Highlands Golf Course, guard gated community"
        />

        {/* Geo-specific meta tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2648;-115.3275" />
        <meta name="geo.zipcode" content="89166" />

        {/* Enhanced Open Graph tags */}
        <meta
          property="og:title"
          content="Skye Canyon Properties for Sale MLS Listings 89166 | Dr. Jan Duffy REALTOR®"
        />
        <meta
          property="og:description"
          content="Browse current Skye Canyon MLS properties for sale in Las Vegas, NV 89166. Luxury homes, golf course properties, and new construction."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/properties" />
        <meta
          property="og:image"
          content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Skye Canyon Homes for Sale" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skye Canyon Properties MLS Listings 89166" />
        <meta
          name="twitter:description"
          content="Browse current Skye Canyon MLS properties for sale in Las Vegas, NV 89166. Expert service by Dr. Jan Duffy REALTOR®."
        />
        <meta
          name="twitter:image"
          content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg"
        />

        <link rel="canonical" href={`https://skyecanyonhomesforsale.com/properties${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`} />
        <meta name="robots" content={searchQuery && searchQuery.length < 3 ? "noindex, follow" : "index, follow, max-image-preview:large"} />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Header */}
        <section className="bg-realscout-blue text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Skye Canyon Homes Properties MLS Listings Nevada 89166
              </h1>
              <p className="text-xl opacity-90">
                Discover luxury homes in Las Vegas's premier community
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[{ label: 'Properties' }]} />
        </div>

        {/* Search Results Section */}
        {searchQuery && (
          <section className="py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-lg text-gray-600">
                  Showing properties matching your search criteria
                </p>
              </div>
              <RealScoutListings className="w-full" variant="all-properties" />
            </div>
          </section>
        )}

        {/* Current MLS Listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current Skye Canyon MLS Listings Las Vegas Nevada
              </h2>
              <p className="text-xl text-gray-600">
                Latest properties for sale from Dr. Jan Duffy's active portfolio
              </p>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Featured Listings</h3>
            </div>
            <RealScoutListings className="w-full" variant="mid-range" />
          </div>
        </section>

        {/* All Available Properties */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                All Available Skye Canyon Properties Nevada 89166
              </h2>
              <p className="text-xl text-gray-600">
                Complete listing of Skye Canyon homes and Las Vegas area properties
              </p>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Browse All Properties</h3>
            </div>
            <RealScoutListings className="w-full" variant="all-properties" />
          </div>
        </section>

        {/* Client Portfolio */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Exclusive Skye Canyon Client Portfolio Nevada
              </h2>
              <p className="text-xl text-gray-600">
                Properties managed through Dr. Jan Duffy's CRM system
              </p>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Exclusive Client Listings</h3>
            </div>
            <FollowUpBossListings />
          </div>
        </section>

        {/* FAQ Section for Properties */}
        <FAQSection
          title="Property Search & Buying Process FAQs"
          pageType="general"
          faqs={[
            {
              question: 'How do I search for Skye Canyon properties?',
              answer:
                'Use our advanced search tools to filter by price, bedrooms, bathrooms, and specific features. Dr. Jan Duffy also provides exclusive access to off-market listings and upcoming properties.',
            },
            {
              question: 'What is the typical timeline for buying a home?',
              answer:
                'The home buying process typically takes 30-45 days from offer acceptance to closing. Pre-approval can be completed in 1-3 days, and property searches can begin immediately.',
            },
            {
              question: 'Do you have access to new construction homes?',
              answer:
                'Yes, Dr. Jan Duffy works with premier builders in Skye Canyon and can help you secure new construction homes, including quick move-in properties and custom builds.',
            },
            {
              question: 'What are closing costs in Las Vegas?',
              answer:
                'Closing costs typically range from 2-5% of the purchase price and include title insurance, escrow fees, inspections, and loan origination fees. Dr. Jan Duffy provides detailed cost estimates upfront.',
            },
            {
              question: 'Can I view properties virtually?',
              answer:
                'Yes, we offer virtual tours, video walkthroughs, and detailed photo galleries for most properties. In-person showings can be scheduled at your convenience.',
            },
          ]}
        />

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
