import { Helmet } from "react-helmet-async";

export default function GoogleSearchConsole() {
  return (
    <Helmet>
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      
      {/* Search Console Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Skye Canyon Homes for Sale",
          "alternateName": "Dr. Jan Duffy Real Estate",
          "url": "https://skyecanyonhomesforsale.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://skyecanyonhomesforsale.com/properties?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "RealEstateAgent",
            "name": "Dr. Jan Duffy",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "10111 W. Skye Canyon Park Drive",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89166",
              "addressCountry": "US"
            },
            "telephone": "(702) 500-1902",
            "email": "DrDuffy@SkyeCanyonHomesForSale.com"
          }
        })}
      </script>
    </Helmet>
  );
}