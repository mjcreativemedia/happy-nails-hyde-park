import { business } from "../config/business";

export function cleanRoute(route: string) {
  return route.replace(/^\/+|\/+$/g, "");
}

export function routePath(route: string, slug?: string) {
  const base = cleanRoute(route);
  return `/${[base, slug].filter(Boolean).join("/")}/`;
}

export function proofArchivePath() {
  return routePath(business.routes.proof);
}

export function proofPath(slug: string) {
  return routePath(business.routes.proof, slug);
}

export function collectionPath(slug: string) {
  return routePath(`${cleanRoute(business.routes.proof)}/collections`, slug);
}

export function servicesPath() {
  return routePath(business.routes.services);
}

export function servicePath(slug: string) {
  return routePath(business.routes.services, slug);
}

export function locationsPath() {
  return routePath(business.routes.locations);
}

export function locationPath(slug: string) {
  return routePath(business.routes.locations, slug);
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${business.website.replace(/\/+$/, "")}/`).toString();
}

export function assetUrl(src: string) {
  return /^https?:\/\//.test(src) ? src : absoluteUrl(src);
}
