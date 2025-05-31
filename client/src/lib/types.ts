export interface SearchFilters {
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  timeframe?: string;
  priceRange?: string;
  message?: string;
}
