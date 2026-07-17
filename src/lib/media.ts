import manifest from "../data/media-manifest.json";

export interface MediaVariant {
  src: string;
  width: number;
}

export interface OptimizedMedia {
  source: string;
  width: number;
  height: number;
  fallback: string;
  avif: MediaVariant[];
  webp: MediaVariant[];
}

const mediaManifest = manifest as Record<string, OptimizedMedia>;

export function getOptimizedMedia(source: string) {
  return mediaManifest[source];
}

export function mediaFallback(source: string) {
  return getOptimizedMedia(source)?.fallback || source;
}

export function mediaImageSet(source: string) {
  const media = getOptimizedMedia(source);
  if (!media) return `url("${source}")`;
  const avif = media.avif.at(-1)?.src;
  return avif
    ? `image-set(url("${avif}") type("image/avif"), url("${media.fallback}") type("image/webp"))`
    : `url("${media.fallback}")`;
}
