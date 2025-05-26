export const locales = ['vi', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'vi';

export interface TranslationStructure {
  common: {
    search: string;
    viewDetails: string;
    backToHome: string;
    loading: string;
    error: string;
    contact: string;
  };
  header: {
    banner: string;
    tagline1: string;
    tagline2: string;
    transportation: {
      overview: string;
      overviewDesc: string;
      car: string;
      carDesc: string;
      moto: string;
      motoDesc: string;
      bus: string;
      busDesc: string;
      taxi: string;
      taxiDesc: string;
      rideHailing: string;
      rideHailingDesc: string;
    };
  };
  navigation: {
    home: string;
    transportation: string;
    bus: string;
    taxi: string;
    moto: string;
    car: string;
    flights: string;
    accommodations: string;
    food: string;
    contact: string;
  };
  footer: {
    description: string;
    explore: string;
    contact: string;
    newsletter: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    subscribe: string;
    copyright: string;
  };
  homepage: {
    hero: {
      title: string;
      highlightedTitle: string;
      subtitle: string;
    };
    sections: {
      exploreTitle: string;
      exploreSubtitle: string;
      transportation: {
        title: string;
        description: string;
        link: string;
      };
      moto: {
        title: string;
        description: string;
        link: string;
      };
      car: {
        title: string;
        description: string;
        link: string;
      };
      bus: {
        title: string;
        description: string;
        link: string;
      };
      taxi: {
        title: string;
        description: string;
        link: string;
      };
    };
  };
} 