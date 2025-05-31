export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Dr. Jan Duffy",
    "jobTitle": "REALTOR®",
    "description": "Exclusive Sky Canyon real estate specialist in Las Vegas, Nevada with over 15 years of experience in luxury home sales.",
    "url": "https://skycanyon-homes.replit.app",
    "telephone": "(702) 555-0123",
    "email": "jan.duffy@realscout.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Sky Canyon, Las Vegas, Nevada"
    },
    "knowsAbout": [
      "Luxury Real Estate",
      "Sky Canyon Homes",
      "Las Vegas Property Market",
      "Real Estate Investment"
    ],
    "hasCredential": [
      "Doctorate in Business Administration",
      "Nevada Real Estate License",
      "Certified Luxury Home Marketing Specialist"
    ],
    "award": "Top 1% REALTOR® Las Vegas",
    "memberOf": {
      "@type": "Organization",
      "name": "National Association of REALTORS®"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}