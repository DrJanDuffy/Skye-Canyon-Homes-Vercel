import { Helmet } from 'react-helmet-async';

export default function ReviewSchema() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dr. Jan Duffy Real Estate',
    image: 'https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg',
    telephone: '(702) 500-1902',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10111 W Skye Canyon Park Dr',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89166',
      addressCountry: 'US',
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody:
          'Dr. Jan Duffy made our Skye Canyon home purchase seamless. Her knowledge of Toll Brothers communities and the local market was invaluable. Professional, responsive, and truly cares about her clients.',
        datePublished: '2024-11-15',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Michael R.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody:
          "Exceptional service from start to finish. Dr. Duffy's expertise in luxury homes and new construction saved us time and money. Highly recommend for anyone buying in Northwest Las Vegas.",
        datePublished: '2024-10-28',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Jennifer L.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody:
          'Dr. Jan Duffy sold our home in Centennial Hills 15% above asking price in just 8 days. Her marketing strategy and negotiation skills are outstanding. True professional!',
        datePublished: '2024-12-03',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'David K.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody:
          'Working with Dr. Duffy on our Lennar home purchase was fantastic. She guided us through every step and her relationships with builders made the process smooth.',
        datePublished: '2024-09-22',
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
    </Helmet>
  );
}
