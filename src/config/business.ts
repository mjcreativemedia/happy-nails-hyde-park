export type SchemaType = "Person" | "LocalBusiness" | "ProfessionalService";
export type ProofSchemaType = "Article" | "CreativeWork";

export interface ContactAction {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceArea {
  name: string;
  slug: string;
  region?: string;
}

export interface BusinessConfig {
  name: string;
  owner?: string;
  tagline: string;
  businessType: string;
  location: string;
  phone?: string;
  email?: string;
  website: string;
  locale: string;
  profilePhoto?: string;
  logo?: string;
  heroImage: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  proof: {
    singular: string;
    plural: string;
    labels: {
      featured: string;
      archive: string;
    };
    schemaType: ProofSchemaType;
    featuredLimit: number;
  };
  routes: {
    proof: string;
    services: string;
    locations: string;
  };
  schema: {
    types: SchemaType[];
  };
  contact: {
    actions: ContactAction[];
    headerActionLabel: string;
    headerActionHref: string;
  };
  hero: {
    specialties: string[];
    trustText: string;
    rating?: number;
    availabilityLabel?: string;
  };
  approvedClaims: {
    ownerIdentity: boolean;
    email: boolean;
    rating: boolean;
    availability: boolean;
    yearsInBusiness: boolean;
    guarantees: boolean;
    certifications: boolean;
    licensing: boolean;
    insurance: boolean;
    pricing: boolean;
    services: string[];
    locations: string[];
  };
  copy: {
    servicesEyebrow: string;
    servicesHeading: string;
    coverageEyebrow: string;
    coverageHeading: string;
    archiveEyebrow: string;
    archiveIntroduction: string;
    proofBodyEyebrow: string;
    contactEyebrow: string;
    contactHeading: string;
    contactText: string;
  };
  services: Service[];
  serviceAreas: ServiceArea[];
}

export const business: BusinessConfig = {
  name: "Happy Nails",
  tagline: "Nail art and manicures in Hyde Park.",
  businessType: "Hyde Park nail salon",
  location: "1508 E 55th St · Chicago, Illinois",
  phone: "(773) 966-4733",
  website: "https://happy-nails4chicago.edan.io",
  locale: "en-US",
  heroImage: "/images/proof/silver-linework-1.jpg",
  colors: {
    primary: "#4b2638",
    secondary: "#74435a",
    accent: "#f0a8c4",
    background: "#fff8fb",
  },
  proof: {
    singular: "Design",
    plural: "Designs",
    labels: {
      featured: "Featured Designs",
      archive: "Gallery",
    },
    schemaType: "CreativeWork",
    featuredLimit: 15,
  },
  routes: {
    proof: "gallery",
    services: "services",
    locations: "locations",
  },
  schema: {
    types: ["LocalBusiness"],
  },
  contact: {
    headerActionLabel: "Instagram",
    headerActionHref: "https://www.instagram.com/happynails55/",
    actions: [
      {
        label: "Call",
        href: "tel:+17739664733",
        primary: true,
      },
      {
        label: "Directions",
        href: "https://www.google.com/maps?cid=13613902078123169525",
      },
    ],
  },
  hero: {
    specialties: ["Manicures", "Acrylic Sets", "Nail Art"],
    trustText: "Real designs from the Happy Nails gallery",
  },
  approvedClaims: {
    ownerIdentity: false,
    email: false,
    rating: false,
    availability: false,
    yearsInBusiness: false,
    guarantees: false,
    certifications: false,
    licensing: false,
    insurance: false,
    pricing: false,
    services: ["manicures", "acrylic-sets", "nail-art"],
    locations: [],
  },
  copy: {
    servicesEyebrow: "Services",
    servicesHeading: "Nail services",
    coverageEyebrow: "Visit",
    coverageHeading: "Hyde Park",
    archiveEyebrow: "Happy Nails gallery",
    archiveIntroduction: "A selection of finished nail designs created at Happy Nails.",
    proofBodyEyebrow: "The design",
    contactEyebrow: "Visit",
    contactHeading: "Find Happy Nails in Hyde Park.",
    contactText: "Call the salon or get directions to 1508 E 55th Street.",
  },
  services: [
    {
      slug: "manicures",
      title: "Manicures",
      description: "Finished color, shape, and detail tailored to each set.",
      image: "/images/gallery/violet-gloss.webp",
    },
    {
      slug: "acrylic-sets",
      title: "Acrylic Sets",
      description: "Length, structure, color, and custom finishing details.",
      image: "/images/gallery/tortoise-french.webp",
    },
    {
      slug: "nail-art",
      title: "Nail Art",
      description: "Chrome, sculptural accents, color, and hand-finished designs.",
      image: "/images/gallery/rainbow-butterflies.webp",
    },
  ],
  serviceAreas: [],
};
