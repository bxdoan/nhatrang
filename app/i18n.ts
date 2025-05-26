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
    backToTransportation: string;
    callNow: string;
    messageZalo: string;
    messageTelegram: string;
    bookNow: string;
    viewService: string;
    contactForBooking: string;
    priceNote: string;
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
  transportation: {
    hero: {
      title: string;
      subtitle: string;
    };
    intro: {
      title: string;
      description: string;
    };
    moto: {
      title: string;
      description: string;
      features: string[];
      link: string;
    };
    car: {
      title: string;
      description: string;
      features: string[];
      link: string;
    };
    taxi: {
      title: string;
      description: string;
      features: string[];
      link: string;
    };
    bus: {
      title: string;
      description: string;
      features: string[];
      link: string;
    };
    boat: {
      title: string;
      description: string;
      features: string[];
    };
    rideHailing: {
      title: string;
      description: string;
      features: string[];
      link: string;
    };
    airport: {
      title: string;
      description: string;
      busTitle: string;
      busDescription: string;
      busFeatures: string[];
      transferTitle: string;
      transferDescription: string;
      transferFeatures: string[];
    };
  };
  moto: {
    hero: {
      title: string;
      subtitle: string;
    };
    backToTransportation: string;
    serviceTitle: string;
    serviceDescription: string;
    serviceNote: string;
    categories: {
      manual: {
        title: string;
        price: string;
        description: string;
      };
      scooter: {
        title: string;
        price: string;
        description: string;
      };
      premium: {
        title: string;
        price: string;
        description: string;
      };
    };
    gallery: {
      title: string;
      note: string;
    };
    procedures: {
      title: string;
      description: string;
      documents: {
        idCard: {
          title: string;
          description: string;
        };
        license: {
          title: string;
          description: string;
        };
      };
      deliveryNote: string;
      conditions: {
        title: string;
        items: string[];
      };
      importantNotes: {
        title: string;
        items: string[];
      };
    };
    touring: {
      title: string;
      description: string;
      destinations: {
        baiDai: {
          title: string;
          description: string;
        };
        ninhVan: {
          title: string;
          description: string;
        };
        ponagar: {
          title: string;
          description: string;
        };
        daiLanh: {
          title: string;
          description: string;
        };
      };
      tips: {
        title: string;
        items: string[];
      };
    };
    benefits: {
      title: string;
      newBikes: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
    };
    contactSection: {
      title: string;
      description: string;
    };
    faq: {
      title: string;
      questions: {
        price: {
          question: string;
          answer: string;
        };
        procedures: {
          question: string;
          answer: string;
        };
        delivery: {
          question: string;
          answer: string;
        };
        insurance: {
          question: string;
          answer: string;
        };
        types: {
          question: string;
          answer: string;
        };
      };
    };
  };
  car: {
    hero: {
      title: string;
      subtitle: string;
    };
    backToTransportation: string;
    contactSection: {
      title: string;
      description: string;
    };
    airportService: {
      title: string;
      guarantee: string;
      categories: {
        car4: {
          title: string;
          price: string;
          description: string;
        };
        car7: {
          title: string;
          price: string;
          description: string;
        };
        car16: {
          title: string;
          price: string;
          description: string;
        };
      };
      gallery: {
        title: string;
        note: string;
      };
      notes: {
        title: string;
        items: string[];
      };
    };
    tourService: {
      title: string;
      description: string;
      destinations: {
        dalat: {
          title: string;
          description: string;
        };
        vinhHy: {
          title: string;
          description: string;
        };
        binhBa: {
          title: string;
          description: string;
        };
        phanRang: {
          title: string;
          description: string;
        };
      };
      additionalRoutes: string;
      routes: string[];
      commitment: {
        title: string;
        items: string[];
      };
    };
  };
  taxi: {
    hero: {
      title: string;
      subtitle: string;
    };
    backToTransportation: string;
    intro: {
      title: string;
      description: string;
      warning: string;
    };
    companies: {
      title: string;
      features: string;
      rating: string;
      operatingHours: string;
      fare: string;
      contact: string;
    };
    types: {
      title: string;
      car4: {
        title: string;
        capacity: string;
        priceRange: string;
        bestFor: string;
      };
      car7: {
        title: string;
        capacity: string;
        priceRange: string;
        bestFor: string;
      };
      vip: {
        title: string;
        capacity: string;
        priceRange: string;
        bestFor: string;
      };
    };
    routes: {
      title: string;
      note: string;
      headers: {
        route: string;
        distance: string;
        estimatedPrice: string;
        time: string;
      };
    };
    tips: {
      title: string;
      items: {
        reputableCompanies: string;
        useMeter: string;
        bookByPhone: string;
        confirmPrice: string;
        keepReceipt: string;
      };
    };
    alternatives: {
      title: string;
      description: string;
      moto: {
        title: string;
        description: string;
      };
      car: {
        title: string;
        description: string;
      };
    };
    contactSection: {
      title: string;
      description: string;
    };
  };
  bus: {
    hero: {
      title: string;
      subtitle: string;
    };
    backToTransportation: string;
    searchPlaceholder: string;
    searchResults: string;
    noResults: string;
    routes: {
      title: string;
      frequency: string;
    };
    routeInfo: {
      title: string;
      routeName: string;
      operatingHours: string;
      frequency: string;
      fare: string;
      information: string;
      lastUpdated: string;
      stops: string;
    };
    stopInfo: {
      title: string;
      description: string;
      routesThrough: string;
      noRoutes: string;
    };
    mapLegend: {
      title: string;
      startPoint: string;
      endPoint: string;
      busStop: string;
      busRoute: string;
    };
    information: {
      title: string;
      fareSection: {
        title: string;
        cityRoute: string;
        airportRoute: string;
        monthlyPass: string;
        discount: string;
      };
      scheduleSection: {
        title: string;
        cityRoutes: string;
        airportRoute: string;
        frequency: string;
      };
      notesSection: {
        title: string;
        cashOnly: string;
        checkSchedule: string;
      };
      contactSection: {
        title: string;
        busCenter: string;
        hotline: string;
      };
    };
    dataUpdate: {
      title: string;
      description: string;
      lastUpdate: string;
      stats: {
        routes: string;
        stops: string;
        support: string;
      };
    };
    faq: {
      title: string;
      questions: {
        fare: {
          question: string;
          answer: string;
        };
        schedule: {
          question: string;
          answer: string;
        };
        routes: {
          question: string;
          answer: string;
        };
        airport: {
          question: string;
          answer: string;
        };
        payment: {
          question: string;
          answer: string;
        };
      };
    };
  };
  flights: {
    hero: {
      title: string;
      subtitle: string;
    };
    airportInfo: {
      title: string;
      intro: {
        title: string;
        description1: string;
        description2: string;
      };
      contact: {
        title: string;
        address: string;
        phone: string;
        email: string;
        website: string;
      };
      transportation: {
        title: string;
        taxi: string;
        bus: string;
        shuttle: string;
        rental: string;
      };
      facilities: {
        title: string;
        items: string[];
      };
    };
    rentalServices: {
      title: string;
      moto: {
        title: string;
        description: string;
        features: string[];
        link: string;
      };
      car: {
        title: string;
        description: string;
        features: string[];
        link: string;
      };
    };
  };
  rideHailing: {
    hero: {
      title: string;
      subtitle: string;
    };
    backToTransportation: string;
    intro: {
      title: string;
      description: string;
    };
    types: {
      title: string;
      traditional: {
        title: string;
        description: string;
        priceRange: string;
        advantages: string[];
        disadvantages: string[];
      };
      app: {
        title: string;
        description: string;
        priceRange: string;
        advantages: string[];
        disadvantages: string[];
      };
    };
    apps: {
      title: string;
      grab: {
        name: string;
        description: string;
        features: string[];
      };
      maxim: {
        name: string;
        description: string;
        features: string[];
      };
    };
    comparison: {
      title: string;
      headers: {
        criteria: string;
        traditional: string;
        app: string;
      };
      rows: {
        price: {
          criteria: string;
          traditional: string;
          app: string;
        };
        convenience: {
          criteria: string;
          traditional: string;
          app: string;
        };
        safety: {
          criteria: string;
          traditional: string;
          app: string;
        };
        availability: {
          criteria: string;
          traditional: string;
          app: string;
        };
        payment: {
          criteria: string;
          traditional: string;
          app: string;
        };
      };
    };
    tips: {
      title: string;
      items: string[];
    };
    routes: {
      title: string;
      note: string;
    };
    alternatives: {
      title: string;
      description: string;
    };
    contactSection: {
      title: string;
      description: string;
    };
  };
  contact: {
    hero: {
      title: string;
      subtitle: string;
    };
    contactInfo: {
      title: string;
      phone: string;
      email: string;
      address: string;
    };
    socialMedia: {
      title: string;
    };
    map: {
      title: string;
    };
    form: {
      title: string;
      successMessage: string;
      fields: {
        name: {
          label: string;
          placeholder: string;
        };
        email: {
          label: string;
          placeholder: string;
        };
        phone: {
          label: string;
          placeholder: string;
        };
        subject: {
          label: string;
          placeholder: string;
          options: {
            tourism: string;
            rental: string;
            tour: string;
            accommodation: string;
            other: string;
          };
        };
        message: {
          label: string;
          placeholder: string;
        };
      };
      submitButton: string;
      submittingButton: string;
    };
    payment: {
      title: string;
      bankInfo: {
        title: string;
        bank: string;
        branch: string;
        accountNumber: string;
        accountHolder: string;
        transferContent: string;
      };
      qrCode: {
        title: string;
        description: string;
      };
      note: string;
    };
  };
} 