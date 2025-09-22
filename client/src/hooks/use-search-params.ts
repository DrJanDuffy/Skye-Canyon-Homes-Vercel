import { useLocation } from 'wouter';
import { useMemo } from 'react';

export function useSearchParams() {
  const [location] = useLocation();
  
  return useMemo(() => {
    // Handle server-side rendering
    if (typeof window === 'undefined') {
      return {};
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    
    return params;
  }, [location]);
}

export function useSearchParam(key: string): string | null {
  const searchParams = useSearchParams();
  return searchParams[key] || null;
}
