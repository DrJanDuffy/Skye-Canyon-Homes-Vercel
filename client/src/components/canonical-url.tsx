import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface CanonicalUrlProps {
  path?: string;
}

export default function CanonicalUrl({ path }: CanonicalUrlProps) {
  const [location] = useLocation();
  
  // Use provided path or current location
  const currentPath = path || location;
  
  // Ensure HTTPS canonical URL
  const canonicalUrl = `https://skyecanyonhomesforsale.com${currentPath === '/' ? '' : currentPath}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
