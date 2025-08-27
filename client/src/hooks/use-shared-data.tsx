import { useQuery } from '@tanstack/react-query';

// Shared data fetching hook to eliminate duplicate API calls
export function useSharedData() {
  // Shared properties query
  const propertiesQuery = useQuery({
    queryKey: ['/api/properties'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
  });

  // Shared featured properties query
  const featuredPropertiesQuery = useQuery({
    queryKey: ['/api/properties/featured'],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Shared market stats query
  const marketStatsQuery = useQuery({
    queryKey: ['/api/market-stats'],
    staleTime: 10 * 60 * 1000, // 10 minutes for market data
    gcTime: 20 * 60 * 1000,
  });

  // Shared agent bio query
  const agentBioQuery = useQuery({
    queryKey: ['/api/agent-bio'],
    staleTime: 30 * 60 * 1000, // 30 minutes for static content
    gcTime: 60 * 60 * 1000,
  });

  // Shared community data query
  const communityDataQuery = useQuery({
    queryKey: ['/api/community-data'],
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    properties: propertiesQuery.data || [],
    featuredProperties: featuredPropertiesQuery.data || [],
    marketStats: marketStatsQuery.data,
    agentBio: agentBioQuery.data,
    communityData: communityDataQuery.data,
    isLoading:
      propertiesQuery.isLoading ||
      featuredPropertiesQuery.isLoading ||
      marketStatsQuery.isLoading ||
      agentBioQuery.isLoading ||
      communityDataQuery.isLoading,
    error:
      propertiesQuery.error ||
      featuredPropertiesQuery.error ||
      marketStatsQuery.error ||
      agentBioQuery.error ||
      communityDataQuery.error,
    refetch: {
      properties: propertiesQuery.refetch,
      featuredProperties: featuredPropertiesQuery.refetch,
      marketStats: marketStatsQuery.refetch,
      agentBio: agentBioQuery.refetch,
      communityData: communityDataQuery.refetch,
    },
  };
}
