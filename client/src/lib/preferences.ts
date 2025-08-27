interface UserPreferences {
  propertyType: string;
  features: string[];
  lifestyle: string[];
  timeline: string;
  communication: string;
}

export async function saveUserPreferences(preferences: UserPreferences) {
  try {
    // Save to local storage for immediate use
    localStorage.setItem('skyeCanyon_userPreferences', JSON.stringify(preferences));

    // Send to backend for CRM integration and personalized matching
    const response = await fetch('/api/user-preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preferences,
        timestamp: new Date().toISOString(),
        source: 'Skye Canyon Preference Collector',
      }),
    });

    if (response.ok) {
      // Trigger personalized property matching
      await generatePersonalizedMatches(preferences);
      return { success: true };
    } else {
      throw new Error('Failed to save preferences');
    }
  } catch (error) {
    return { success: false, error };
  }
}

export async function generatePersonalizedMatches(preferences: UserPreferences) {
  try {
    const response = await fetch('/api/personalized-matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (response.ok) {
      const matches = await response.json();
      return matches;
    }
  } catch (_error) {}
}

export function getUserPreferences(): UserPreferences | null {
  try {
    const stored = localStorage.getItem('skyeCanyon_userPreferences');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function calculatePreferenceScore(property: any, preferences: UserPreferences): number {
  let score = 0;

  // Property type matching
  if (preferences.propertyType && property.style === preferences.propertyType) {
    score += 20;
  }

  // Feature matching
  preferences.features.forEach((feature) => {
    if (property.features?.includes(feature)) {
      score += 15;
    }
  });

  // Lifestyle matching
  preferences.lifestyle.forEach((lifestyle) => {
    switch (lifestyle) {
      case 'family':
        if (property.bedrooms >= 3 && property.neighborhood === 'family-friendly') {
          score += 10;
        }
        break;
      case 'entertaining':
        if (property.features?.includes('pool') || property.features?.includes('outdoor-space')) {
          score += 10;
        }
        break;
      case 'quiet':
        if (property.location === 'cul-de-sac' || property.noise_level === 'low') {
          score += 10;
        }
        break;
      case 'active':
        if (
          property.nearbyAmenities?.includes('trails') ||
          property.nearbyAmenities?.includes('fitness')
        ) {
          score += 10;
        }
        break;
      case 'pets':
        if (property.features?.includes('large-yard') || property.petFriendly) {
          score += 10;
        }
        break;
      case 'remote-work':
        if (property.features?.includes('home-office') || property.bedrooms >= 4) {
          score += 10;
        }
        break;
    }
  });

  return Math.min(score, 100); // Cap at 100%
}
