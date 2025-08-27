// Google Analytics 4 Integration
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return;
  }

  // Add Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'property_type',
        'custom_parameter_2': 'price_range',
        'custom_parameter_3': 'neighborhood'
      }
    });
  `;
  document.head.appendChild(script2);
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return;
  }

  window.gtag('config', measurementId, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track real estate specific events
export const trackPropertyView = (propertyData: {
  property_id: string;
  property_type: string;
  price: number;
  neighborhood: string;
  bedrooms?: number;
  bathrooms?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'view_property', {
    event_category: 'Real Estate',
    event_label: propertyData.neighborhood,
    value: propertyData.price,
    custom_parameter_1: propertyData.property_type,
    custom_parameter_2: `$${propertyData.price.toLocaleString()}`,
    custom_parameter_3: propertyData.neighborhood,
    property_id: propertyData.property_id,
    bedrooms: propertyData.bedrooms,
    bathrooms: propertyData.bathrooms,
  });
};

export const trackLeadGeneration = (leadData: {
  form_type: string;
  property_interest?: string;
  estimated_budget?: string;
  timeline?: string;
}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'generate_lead', {
    event_category: 'Lead Generation',
    event_label: leadData.form_type,
    custom_parameter_1: leadData.property_interest,
    custom_parameter_2: leadData.estimated_budget,
    form_type: leadData.form_type,
    timeline: leadData.timeline,
  });
};

export const trackSearchQuery = (searchData: {
  search_term: string;
  search_type: 'property' | 'neighborhood' | 'voice' | 'ai';
  results_count?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'search', {
    event_category: 'Property Search',
    event_label: searchData.search_type,
    search_term: searchData.search_term,
    custom_parameter_1: searchData.search_type,
    results_count: searchData.results_count,
  });
};

export const trackMarketAnalysis = (analysisData: {
  page_type: string;
  neighborhood?: string;
  analysis_type?: string;
}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'view_market_analysis', {
    event_category: 'Market Research',
    event_label: analysisData.page_type,
    custom_parameter_1: analysisData.analysis_type,
    custom_parameter_3: analysisData.neighborhood,
  });
};

export const trackContactAttempt = (contactData: {
  contact_method: 'phone' | 'email' | 'form';
  source_page: string;
  property_context?: string;
}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'contact_attempt', {
    event_category: 'Contact',
    event_label: contactData.contact_method,
    custom_parameter_1: contactData.contact_method,
    source_page: contactData.source_page,
    property_context: contactData.property_context,
  });
};
