import { business } from "../config/business";
import { getDetailProofs, getProofCollections, getProvenServiceAreas } from "../data/proofs";
import {
  absoluteUrl,
  collectionPath,
  locationPath,
  locationsPath,
  proofArchivePath,
  proofPath,
  servicePath,
  servicesPath,
} from "../lib/urls";

export function GET() {
  const provenAreas = getProvenServiceAreas();
  const detailProofs = getDetailProofs();
  const collections = getProofCollections();
  const paths = [
    "/",
    proofArchivePath(),
    ...detailProofs.map((proof) => proofPath(proof.slug)),
    ...collections.map((collection) => collectionPath(collection.slug)),
    servicesPath(),
    ...business.services.map((service) => servicePath(service.slug)),
    ...(provenAreas.length ? [locationsPath()] : []),
    ...provenAreas.map((area) => locationPath(area.slug)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
