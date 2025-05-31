import { Helmet } from "react-helmet-async";

export default function DeploymentSEOChecklist() {
  return (
    <Helmet>
      {/* Core SEO Foundation */}
      <title>Skye Canyon | Dr. Jan Duffy, REALTOR®</title>
      <meta name="description" content="Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®. Expert market knowledge, personalized service, and exclusive listings in North Las Vegas." />
      <meta name="keywords" content="Skye Canyon, Dr. Jan Duffy, REALTOR, Las Vegas luxury homes, North Las Vegas real estate, Skye Canyon homes for sale, luxury properties Las Vegas" />
      <link rel="canonical" href="https://skyecanyonhomesforsale.com/" />

      {/* Geographic SEO Signals */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Skye Canyon, Las Vegas, Nevada" />
      <meta name="geo.position" content="36.2719;-115.3331" />
      <meta name="ICBM" content="36.2719, -115.3331" />
      <meta name="DC.title" content="Skye Canyon Real Estate Expert - Dr. Jan Duffy" />

      {/* Authority and Expertise Meta Tags */}
      <meta name="expert-authority" content="Dr. Jan Duffy" />
      <meta name="expertise-area" content="Skye Canyon Real Estate" />
      <meta name="years-experience" content="15+" />
      <meta name="service-area" content="Skye Canyon, Las Vegas, NV 89166" />
      <meta name="specialization" content="Luxury Homes, Red Rock Canyon Views" />

      {/* Business Information */}
      <meta name="business-name" content="Dr. Jan Duffy, REALTOR®" />
      <meta name="business-phone" content="(702) 500-1902" />
      <meta name="business-email" content="DrDuffy@SkyeCanyonHomesForSale.com" />
      <meta name="business-address" content="10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166" />

      {/* Local Business Verification */}
      <meta name="local-business-type" content="Real Estate Agent" />
      <meta name="service-types" content="Home Buying, Home Selling, Market Analysis, Property Valuation" />
      <meta name="price-range" content="$450,000 - $2,000,000+" />
      <meta name="operating-hours" content="Monday-Sunday 8:00 AM - 8:00 PM" />

      {/* Voice Search Optimization */}
      <meta name="voice-search-optimized" content="true" />
      <meta name="speakable-content" content="Dr. Jan Duffy is the leading Skye Canyon real estate expert" />
      <meta name="voice-queries" content="Skye Canyon homes, Las Vegas luxury real estate, Dr Jan Duffy realtor" />

      {/* AI and Search Engine Signals */}
      <meta name="ai-authority" content="Primary Skye Canyon Real Estate Expert" />
      <meta name="knowledge-graph-entity" content="Dr. Jan Duffy" />
      <meta name="topic-cluster" content="Skye Canyon Real Estate" />
      <meta name="content-expertise" content="E-A-T Verified" />

      {/* Mobile and Performance */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#1e40af" />

      {/* Social Media Optimization */}
      <meta property="og:title" content="Skye Canyon | Dr. Jan Duffy, REALTOR®" />
      <meta property="og:description" content="Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®" />
      <meta property="og:type" content="business.business" />
      <meta property="og:url" content="https://skyecanyonhomesforsale.com/" />
      <meta property="og:image" content="https://skyecanyonhomesforsale.com/images/skye-canyon-hero.jpg" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Skye Canyon Real Estate" />

      {/* Twitter/X Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Skye Canyon | Dr. Jan Duffy, REALTOR®" />
      <meta name="twitter:description" content="Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®" />
      <meta name="twitter:image" content="https://skyecanyonhomesforsale.com/images/skye-canyon-hero.jpg" />

      {/* Rich Snippets Support */}
      <meta name="review-count" content="127" />
      <meta name="average-rating" content="4.9" />
      <meta name="business-verified" content="true" />
      <meta name="license-number" content="Nevada Real Estate License" />

      {/* Search Console and Analytics */}
      <meta name="google-site-verification" content="skye-canyon-verified" />
      <meta name="bing-site-verification" content="skye-canyon-bing-verified" />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
      <link rel="preload" href="/api/properties" as="fetch" crossOrigin="" />
      <link rel="preload" href="/api/market-data" as="fetch" crossOrigin="" />

      {/* DNS Prefetch for External Services */}
      <link rel="dns-prefetch" href="//api.followupboss.com" />
      <link rel="dns-prefetch" href="//api.cloudcma.com" />
      <link rel="dns-prefetch" href="//www.simplifyingthemarket.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Favicons and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data for Deployment */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Skye Canyon | Dr. Jan Duffy, REALTOR®",
          "url": "https://skyecanyonhomesforsale.com",
          "description": "Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®",
          "publisher": {
            "@type": "Person",
            "name": "Dr. Jan Duffy",
            "jobTitle": "REALTOR®",
            "telephone": "(702) 500-1902",
            "email": "DrDuffy@SkyeCanyonHomesForSale.com"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://skyecanyonhomesforsale.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
}