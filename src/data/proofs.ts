import { business } from "../config/business";

export interface ProofMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  role?: "before" | "after" | "process" | "finished";
}

export type ProofRoutePolicy = "feed-only" | "detail-page";
export type ProofPresentation = "gallery" | "portrait" | "landscape" | "before-after";

const forbiddenSourcePhrases = [
  "instagram",
  "facebook",
  "nextdoor",
  "original caption",
  "imported from",
];

const protectedClaimPatterns = [
  {
    approval: "yearsInBusiness" as const,
    label: "years-in-business",
    pattern: /\b(?:\d+\+?\s+years?|since\s+(?:19|20)\d{2})\b/i,
  },
  {
    approval: "guarantees" as const,
    label: "guarantee or warranty",
    pattern: /\b(?:guarantee(?:d)?|warranty|satisfaction)\b/i,
  },
  {
    approval: "certifications" as const,
    label: "certification",
    pattern: /\b(?:certified|certification)\b/i,
  },
  {
    approval: "licensing" as const,
    label: "licensing",
    pattern: /\b(?:licensed|license(?:d|s)?|licensure)\b/i,
  },
  {
    approval: "insurance" as const,
    label: "insurance",
    pattern: /\b(?:insured|insurance)\b/i,
  },
  {
    approval: "pricing" as const,
    label: "pricing or discount",
    pattern: /(?:\$\s?\d|\bstarting at\b|\bfrom \$|\bper hour\b|\bdiscount\b|\b\d+%\s+off\b)/i,
  },
];

export interface Proof {
  title: string;
  slug: string;
  summary: string;
  body: string;
  date: string;
  service: string;
  location: string;
  media: ProofMedia[];
  featured: boolean;
  tags: string[];
  captionExcerpt?: string;
  sourceUrl?: string;
  trustSignal?: string;
  routePolicy: ProofRoutePolicy;
  presentation: ProofPresentation;
}

export const proofs: Proof[] = [
  {
    title: "Playful Smileys",
    slug: "playful-smileys",
    summary: "Electric yellow smiley tips on a soft neutral base.",
    body: "A bright, graphic set with hand-painted smiley details and a clean neutral base.",
    date: "2021-04-29",
    service: "nail-art",
    location: "",
    media: [
      { type: "video", src: "/videos/playful-smileys.webm", poster: "/videos/playful-smileys-poster.webp", alt: "Smiley nail art shown in motion", role: "finished" },
      { type: "image", src: "/images/gallery/playful-smileys.webp", alt: "Yellow smiley nail art", role: "finished" },
    ],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    captionExcerpt: "🙂🙃🙂",
    sourceUrl: "https://www.instagram.com/p/COPI3V0n1Mn/",
    routePolicy: "detail-page",
    presentation: "gallery",
  },
  {
    title: "Rainbow Butterflies",
    slug: "rainbow-butterflies",
    summary: "A colorful butterfly set with clouds, gems, and rainbow details.",
    body: "Butterflies, clouds, color, and reflective accents come together in a playful sculpted set.",
    date: "2021-05-10",
    service: "nail-art",
    location: "",
    media: [
      { type: "video", src: "/videos/rainbow-butterflies.webm", poster: "/videos/rainbow-butterflies-poster.webp", alt: "Rainbow butterfly nails shown in motion", role: "finished" },
      { type: "image", src: "/images/gallery/rainbow-butterflies.webp", alt: "Rainbow butterfly nail design", role: "finished" },
    ],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    captionExcerpt: "🌈☁️🦋",
    sourceUrl: "https://www.instagram.com/p/COtfDdCNB27/",
    routePolicy: "detail-page",
    presentation: "gallery",
  },
  {
    title: "Tortoise French",
    slug: "tortoise-french",
    summary: "Long tortoise-shell French tips with graphic black accents.",
    body: "A sculpted French set combining translucent tortoise color with sharp black details.",
    date: "2021-10-01",
    service: "acrylic-sets",
    location: "",
    media: [
      { type: "video", src: "/videos/tortoise-french.webm", poster: "/videos/tortoise-french-poster.webp", alt: "Tortoise French nails shown in motion", role: "finished" },
      { type: "image", src: "/images/gallery/tortoise-french.webp", alt: "Tortoise-shell French manicure", role: "finished" },
    ],
    featured: true,
    tags: ["French", "Acrylic", "Nail Art"],
    captionExcerpt: "#tortoisenails #nailart #chicagonails",
    sourceUrl: "https://www.instagram.com/p/CUeQcchs5Vv/",
    routePolicy: "detail-page",
    presentation: "gallery",
  },
  {
    title: "Blue Ribbon",
    slug: "blue-ribbon",
    summary: "Sculpted blue linework across a neutral manicure.",
    body: "Fluid cobalt details create movement across a clean, neutral set.",
    date: "2021-10-05",
    service: "nail-art",
    location: "",
    media: [{ type: "image", src: "/images/gallery/blue-ribbon.webp", alt: "Neutral nails with cobalt blue linework", role: "finished" }],
    featured: true,
    tags: ["Nail Art", "Minimal"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "White Sculpted French",
    slug: "white-sculpted-french",
    summary: "A bright white sculpted French set with flowing detail.",
    body: "Crisp white tips and dimensional linework create a modern French finish.",
    date: "2021-10-05",
    service: "acrylic-sets",
    location: "",
    media: [{ type: "image", src: "/images/gallery/white-sculpted.webp", alt: "White sculpted French nails", role: "finished" }],
    featured: true,
    tags: ["French", "Acrylic"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Coral Florals",
    slug: "coral-florals",
    summary: "Coral, teal, and white botanical nail art.",
    body: "A vivid mix of warm coral, cool blue, and hand-painted botanical details.",
    date: "2021-10-05",
    service: "nail-art",
    location: "",
    media: [{ type: "image", src: "/images/gallery/coral-florals.webp", alt: "Coral and blue floral nail art", role: "finished" }],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Graphic Pop",
    slug: "graphic-pop",
    summary: "A different saturated graphic on every nail.",
    body: "Color, character, and bold linework give every nail its own illustrated design.",
    date: "2021-10-05",
    service: "nail-art",
    location: "",
    media: [
      { type: "image", src: "/images/gallery/graphic-pop-1.webp", alt: "Colorful graphic nail art", role: "finished" },
      { type: "image", src: "/images/gallery/graphic-pop-2.webp", alt: "Graphic nail set from a second angle", role: "finished" },
    ],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    routePolicy: "detail-page",
    presentation: "gallery",
  },
  {
    title: "Candy Swirl",
    slug: "candy-swirl",
    summary: "Bright candy colors shaped into curved graphic lines.",
    body: "A playful multicolor set with crisp outlines and repeated flowing shapes.",
    date: "2021-10-05",
    service: "nail-art",
    location: "",
    media: [{ type: "image", src: "/images/gallery/candy-swirl.webp", alt: "Colorful candy swirl nail art", role: "finished" }],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Neon Hearts",
    slug: "neon-hearts",
    summary: "Neon heart details over a soft neutral base.",
    body: "Colorful hearts and graphic outlines turn a neutral manicure into a vivid statement set.",
    date: "2021-10-05",
    service: "nail-art",
    location: "",
    media: [{ type: "image", src: "/images/gallery/neon-hearts.webp", alt: "Neon heart nail art", role: "finished" }],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Gold Foil Waves",
    slug: "gold-foil-waves",
    summary: "Neutral nails with raised gold wave details.",
    body: "Reflective gold accents sweep across a warm neutral sculpted set.",
    date: "2021-10-05",
    service: "acrylic-sets",
    location: "",
    media: [{ type: "image", src: "/images/gallery/gold-foil.webp", alt: "Neutral nails with gold wave details", role: "finished" }],
    featured: true,
    tags: ["Chrome", "Acrylic"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Blue Botanicals",
    slug: "blue-botanicals",
    summary: "Blue botanical details across a long sculpted set.",
    body: "Cool blue linework and layered details create a polished botanical pattern.",
    date: "2021-10-05",
    service: "nail-art",
    location: "",
    media: [{ type: "image", src: "/images/gallery/blue-botanical.webp", alt: "Blue botanical nail design", role: "finished" }],
    featured: true,
    tags: ["Nail Art", "Acrylic"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Violet Gloss",
    slug: "violet-gloss",
    summary: "A glossy violet set with a softly dimensional finish.",
    body: "Deep violet color and a luminous finish create a simple, saturated manicure.",
    date: "2023-11-04",
    service: "manicures",
    location: "",
    media: [{ type: "image", src: "/images/gallery/violet-gloss.webp", alt: "Glossy violet manicure", role: "finished" }],
    featured: true,
    tags: ["Minimal", "Seasonal"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Electric Blue",
    slug: "electric-blue",
    summary: "Electric blue accents across a neutral sculpted set.",
    body: "Bright blue details, small gems, and a neutral base balance color with clean structure.",
    date: "2023-11-04",
    service: "nail-art",
    location: "",
    media: [
      { type: "image", src: "/images/gallery/electric-blue-1.webp", alt: "Electric blue nail art", role: "finished" },
      { type: "image", src: "/images/gallery/electric-blue-2.webp", alt: "Electric blue nail design from a second angle", role: "finished" },
    ],
    featured: true,
    tags: ["Nail Art", "Acrylic"],
    routePolicy: "detail-page",
    presentation: "gallery",
  },
  {
    title: "Floral Mix",
    slug: "floral-mix",
    summary: "A colorful floral set made for summer.",
    body: "Small flowers, pattern, and saturated color create a cheerful mixed manicure.",
    date: "2023-07-05",
    service: "nail-art",
    location: "",
    media: [{ type: "image", src: "/images/gallery/floral-mix.webp", alt: "Colorful floral nail design", role: "finished" }],
    featured: true,
    tags: ["Nail Art", "Seasonal"],
    captionExcerpt: "#hydepark #happynails #chicago #flowers #creativenails",
    sourceUrl: "https://www.instagram.com/p/CuVJjvovgA2/",
    routePolicy: "detail-page",
    presentation: "portrait",
  },
  {
    title: "Chrome Confetti",
    slug: "chrome-confetti",
    summary: "Reflective chrome details with colorful confetti accents.",
    body: "Metallic finishes and small bursts of color give this set a lively reflective surface.",
    date: "2021-09-07",
    service: "acrylic-sets",
    location: "",
    media: [{ type: "image", src: "/images/gallery/chrome-confetti.webp", alt: "Chrome nails with colorful accents", role: "finished" }],
    featured: true,
    tags: ["Chrome", "Acrylic", "Nail Art"],
    routePolicy: "detail-page",
    presentation: "portrait",
  },
];


export function interleaveMotion(items: Proof[]) {
  const stills = items.filter((proof) => proof.media[0]?.type !== "video");
  const motion = items.filter((proof) => proof.media[0]?.type === "video");
  const ordered = [...stills];

  motion.forEach((proof, index) => {
    ordered.splice(Math.min(index * 5, ordered.length), 0, proof);
  });

  return ordered;
}

export function getFeaturedProofs(limit = 3) {
  return interleaveMotion(proofs.filter((proof) => proof.featured)).slice(0, limit);
}

export function getProof(slug: string) {
  return proofs.find((proof) => proof.slug === slug);
}

export function getDetailProofs() {
  return proofs.filter((proof) => proof.routePolicy === "detail-page");
}

export function getProofsByService(serviceSlug: string) {
  return proofs.filter((proof) => proof.service === serviceSlug);
}

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getProofCollections() {
  return [...new Set(proofs.flatMap((proof) => proof.tags))]
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({ tag, slug: tagSlug(tag), proofs: getProofsByTag(tag) }));
}

export function getProofsByTag(tag: string) {
  return proofs.filter((proof) => proof.tags.includes(tag));
}

export function getProofsByLocation(location: string) {
  return proofs.filter(
    (proof) => proof.location.toLowerCase() === location.toLowerCase(),
  );
}

export function getProvenServiceAreas() {
  return business.serviceAreas
    .map((area) => ({
      ...area,
      proofs: getProofsByLocation(area.name),
    }))
    .filter((area) => area.proofs.length > 0);
}

export function getRelatedProofs(proof: Proof, limit = 3) {
  return proofs
    .filter((candidate) => candidate.slug !== proof.slug && candidate.service === proof.service)
    .slice(0, limit);
}

export function validateContent() {
  const serviceSlugs = new Set(business.services.map((service) => service.slug));
  const approvedServiceSlugs = new Set(business.approvedClaims.services);
  const approvedLocations = new Set(business.approvedClaims.locations);
  const proofSlugs = new Set<string>();
  const areaSlugs = new Set<string>();

  if (business.owner && !business.approvedClaims.ownerIdentity) {
    throw new Error("Business owner identity is present but not approved.");
  }
  if (business.email && !business.approvedClaims.email) {
    throw new Error("Business email is present but not approved.");
  }
  if (business.hero.rating !== undefined && !business.approvedClaims.rating) {
    throw new Error("Hero rating is present but ratings are not approved.");
  }
  if (
    business.hero.availabilityLabel &&
    !business.approvedClaims.availability
  ) {
    throw new Error("Availability copy is present but availability is not approved.");
  }
  if (business.schema.types.includes("Person") && !business.owner) {
    throw new Error('Person schema requires an approved "owner" value.');
  }

  for (const service of business.services) {
    if (!approvedServiceSlugs.has(service.slug)) {
      throw new Error(
        `Service "${service.title}" is configured but missing from approvedClaims.services.`,
      );
    }
  }

  for (const area of business.serviceAreas) {
    if (areaSlugs.has(area.slug)) {
      throw new Error(`Duplicate service area slug "${area.slug}".`);
    }
    areaSlugs.add(area.slug);
    if (!approvedLocations.has(area.name)) {
      throw new Error(
        `Location "${area.name}" is configured but missing from approvedClaims.locations.`,
      );
    }
  }

  for (const proof of proofs) {
    if (proofSlugs.has(proof.slug)) {
      throw new Error(`Duplicate proof slug "${proof.slug}".`);
    }
    proofSlugs.add(proof.slug);

    if (!serviceSlugs.has(proof.service)) {
      throw new Error(`Proof "${proof.slug}" references missing service "${proof.service}".`);
    }
    if (!approvedServiceSlugs.has(proof.service)) {
      throw new Error(
        `Proof "${proof.slug}" references unapproved service "${proof.service}".`,
      );
    }
    if (proof.location && !approvedLocations.has(proof.location)) {
      throw new Error(
        `Proof "${proof.slug}" references unapproved location "${proof.location}".`,
      );
    }

    if (!proof.tags.length) {
      throw new Error(`Proof "${proof.slug}" requires at least one evidence-backed tag.`);
    }

    if (proof.presentation === "before-after") {
      const hasBefore = proof.media.some((item) => item.role === "before");
      const hasAfter = proof.media.some((item) => item.role === "after");
      if (!hasBefore || !hasAfter) {
        throw new Error(
          `Proof "${proof.slug}" uses before-after presentation without explicit before and after media roles.`,
        );
      }
    }

    const publicCopy = [proof.title, proof.summary, proof.body].join(" ").toLowerCase();
    const leakedPhrase = forbiddenSourcePhrases.find((phrase) =>
      publicCopy.includes(phrase),
    );
    if (leakedPhrase) {
      throw new Error(
        `Proof "${proof.slug}" exposes source language "${leakedPhrase}". Rewrite it as business-owned copy.`,
      );
    }

    for (const media of proof.media.filter((item) => item.type === "video")) {
      if (!media.src.toLowerCase().endsWith(".webm")) {
        throw new Error(
          `Video "${media.src}" must be converted to compressed WebM before publishing.`,
        );
      }
      if (!media.poster) {
        throw new Error(`Video "${media.src}" requires a poster image.`);
      }
    }
  }

  const publicCopy = [
    business.name,
    business.tagline,
    business.businessType,
    business.location,
    business.hero.trustText,
    business.hero.availabilityLabel || "",
    ...business.hero.specialties,
    ...Object.values(business.copy),
    ...business.services.flatMap((service) => [
      service.title,
      service.description,
    ]),
    ...proofs.flatMap((proof) => [
      proof.title,
      proof.summary,
      proof.body,
      proof.trustSignal || "",
      ...proof.tags,
    ]),
  ].join(" ");

  for (const protectedClaim of protectedClaimPatterns) {
    if (
      !business.approvedClaims[protectedClaim.approval] &&
      protectedClaim.pattern.test(publicCopy)
    ) {
      throw new Error(
        `Public copy contains an unapproved ${protectedClaim.label} claim.`,
      );
    }
  }
}
