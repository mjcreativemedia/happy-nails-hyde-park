import { business, type Service, type ServiceArea } from "../config/business";
import type { Proof } from "../data/proofs";
import { mediaFallback } from "./media";
import {
  absoluteUrl,
  assetUrl,
  collectionPath,
  locationPath,
  proofArchivePath,
  proofPath,
  servicePath,
} from "./urls";

const ids = {
  owner: absoluteUrl("/#owner"),
  business: absoluteUrl("/#business"),
  website: absoluteUrl("/#website"),
};

function personSchema() {
  return {
    "@type": "Person",
    "@id": ids.owner,
    name: business.owner,
    ...(business.profilePhoto
      ? { image: assetUrl(mediaFallback(business.profilePhoto)) }
      : {}),
    url: business.website,
  };
}

function organizationSchema(type: "LocalBusiness" | "ProfessionalService") {
  return {
    "@type": type,
    "@id": ids.business,
    name: business.name,
    description: business.tagline,
    url: business.website,
    ...(business.logo
      ? { logo: assetUrl(mediaFallback(business.logo)) }
      : {}),
    ...(business.profilePhoto
      ? { image: assetUrl(mediaFallback(business.profilePhoto)) }
      : {}),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    areaServed: business.serviceAreas.map((area) => area.name),
    ...(business.owner && business.schema.types.includes("Person")
      ? { founder: { "@id": ids.owner } }
      : {}),
  };
}

export function coreGraph() {
  const graph: object[] = [
    {
      "@type": "WebSite",
      "@id": ids.website,
      name: business.name,
      url: business.website,
    },
  ];

  if (business.schema.types.includes("Person") && business.owner) graph.push(personSchema());
  for (const type of business.schema.types) {
    if (type === "LocalBusiness" || type === "ProfessionalService") {
      graph.push(organizationSchema(type));
    }
  }
  return graph;
}

export function homepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...coreGraph(),
      {
        "@type": "WebPage",
        url: business.website,
        name: `${business.name} | ${business.businessType}`,
        isPartOf: { "@id": ids.website },
      },
    ],
  };
}

export function proofSchema(proof: Proof) {
  const url = absoluteUrl(proofPath(proof.slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...coreGraph(),
      {
        "@type": business.proof.schemaType,
        url,
        headline: proof.title,
        description: proof.summary,
        datePublished: proof.date,
        image: proof.media
          .filter((item) => item.type === "image")
          .map((item) => assetUrl(mediaFallback(item.src))),
        ...(business.owner && business.schema.types.includes("Person")
          ? { author: { "@id": ids.owner } }
          : {}),
        publisher: { "@id": ids.business },
      },
    ],
  };
}

export function archiveSchema(proofs: Proof[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(proofArchivePath()),
    name: `${business.proof.labels.archive} | ${business.name}`,
    hasPart: proofs.map((proof) => ({
      "@type": business.proof.schemaType,
      name: proof.title,
      ...(proof.routePolicy === "detail-page"
        ? { url: absoluteUrl(proofPath(proof.slug)) }
        : {}),
    })),
  };
}

export function collectionSchema(tag: string, slug: string, proofs: Proof[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(collectionPath(slug)),
    name: `${tag} ${business.proof.plural} | ${business.name}`,
    hasPart: proofs.map((proof) => ({
      "@type": business.proof.schemaType,
      name: proof.title,
      url: absoluteUrl(proofPath(proof.slug)),
    })),
  };
}

export function serviceSchema(service: Service, relatedProofs: Proof[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(servicePath(service.slug)),
    provider: { "@id": ids.business },
    areaServed: business.serviceAreas.map((area) => area.name),
    subjectOf: relatedProofs.map((proof) => ({
      "@type": "Article",
      name: proof.title,
      ...(proof.routePolicy === "detail-page"
        ? { url: absoluteUrl(proofPath(proof.slug)) }
        : {}),
    })),
  };
}

export function locationSchema(area: ServiceArea, relatedProofs: Proof[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${business.businessType} in ${area.name}`,
    url: absoluteUrl(locationPath(area.slug)),
    about: {
      "@type": "Place",
      name: area.region ? `${area.name}, ${area.region}` : area.name,
    },
    hasPart: relatedProofs.map((proof) => ({
      "@type": business.proof.schemaType,
      name: proof.title,
      ...(proof.routePolicy === "detail-page"
        ? { url: absoluteUrl(proofPath(proof.slug)) }
        : {}),
    })),
  };
}
