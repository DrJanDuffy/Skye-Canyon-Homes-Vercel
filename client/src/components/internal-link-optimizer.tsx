import { Link } from 'wouter';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  keyword?: string;
}

export function InternalLink({ href, children, className = '', keyword }: InternalLinkProps) {
  const baseClass = 'text-blue-600 hover:text-blue-800 transition-colors font-medium';

  return (
    <Link href={href} className={`${baseClass} ${className}`} title={keyword}>
      {children}
    </Link>
  );
}

// Strategic internal linking for content sections
export const ContentLinks = {
  SkyeCanyon: () => (
    <InternalLink href="/skye-canyon-guide" keyword="Skye Canyon community information">
      Skye Canyon
    </InternalLink>
  ),

  Properties: () => (
    <InternalLink href="/properties" keyword="Skye Canyon homes for sale">
      available properties
    </InternalLink>
  ),

  MarketData: () => (
    <InternalLink href="/market-analysis" keyword="Las Vegas real estate market analysis">
      current market data
    </InternalLink>
  ),

  BuyerServices: () => (
    <InternalLink href="/services/buyer-agent" keyword="Skye Canyon buyer agent services">
      expert buyer representation
    </InternalLink>
  ),

  LuxuryHomes: () => (
    <InternalLink href="/luxury-homes-las-vegas" keyword="luxury homes Las Vegas">
      luxury properties
    </InternalLink>
  ),

  NewConstruction: () => (
    <InternalLink href="/services/new-construction" keyword="Skye Canyon new construction">
      new construction homes
    </InternalLink>
  ),

  Schools: () => (
    <InternalLink href="/skye-canyon-schools" keyword="Skye Canyon schools information">
      top-rated schools
    </InternalLink>
  ),

  GolfCourse: () => (
    <InternalLink href="/luxury-homes-las-vegas" keyword="Desert Highlands Golf Course homes">
      Desert Highlands Golf Course
    </InternalLink>
  ),

  Northwest: () => (
    <InternalLink href="/northwest-las-vegas" keyword="Northwest Las Vegas real estate">
      Northwest Las Vegas
    </InternalLink>
  ),

  VoiceSearch: () => (
    <InternalLink href="/voice-search" keyword="AI voice search real estate">
      voice search technology
    </InternalLink>
  ),
};

// Contextual linking for enhanced SEO
export function ContextualContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Why Choose <ContentLinks.SkyeCanyon /> for Your Next Home?
      </h3>
      <div className="space-y-4 text-gray-700">
        <p>
          As Las Vegas' premier guard-gated community, <ContentLinks.SkyeCanyon /> offers
          unparalleled luxury living with direct access to the <ContentLinks.GolfCourse />. Our{' '}
          <ContentLinks.Properties /> showcase the finest homes in the 89166 area.
        </p>

        <p>
          Whether you're interested in <ContentLinks.LuxuryHomes /> or exploring{' '}
          <ContentLinks.NewConstruction /> options, our comprehensive
          <ContentLinks.MarketData /> ensures you make informed decisions in this competitive{' '}
          <ContentLinks.Northwest /> market.
        </p>

        <p>
          Families particularly appreciate access to <ContentLinks.Schools /> and the convenience of
          our advanced <ContentLinks.VoiceSearch /> platform for discovering properties that match
          your specific criteria.
        </p>

        <p>
          Experience the difference of working with a dedicated <ContentLinks.BuyerServices />
          specialist who understands every nuance of the <ContentLinks.SkyeCanyon /> lifestyle.
        </p>
      </div>
    </div>
  );
}
