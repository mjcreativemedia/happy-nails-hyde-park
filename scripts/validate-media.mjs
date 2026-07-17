import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "src/data/media-manifest.json");
const publicDir = path.join(root, "public");
const maxBytes = 400 * 1024;
const errors = [];
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

for (const [source, media] of Object.entries(manifest)) {
  if (!media.avif?.length || !media.webp?.length) {
    errors.push(`${source}: AVIF and WebP variants are required`);
  }
  if (!media.fallback?.endsWith(".webp")) {
    errors.push(`${source}: fallback must be WebP`);
  }
  for (const variant of [...(media.avif || []), ...(media.webp || [])]) {
    const filePath = path.join(publicDir, variant.src.replace(/^\//, ""));
    if (!fs.existsSync(filePath)) {
      errors.push(`${source}: missing ${variant.src}`);
    } else if (fs.statSync(filePath).size > maxBytes) {
      errors.push(`${variant.src}: exceeds 400 KiB`);
    }
  }
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

for (const file of walk(publicDir)) {
  if (/\.(jpe?g|png|mp4)$/i.test(file)) {
    errors.push(`${path.relative(root, file)}: raw production media is forbidden`);
  }
  if (/-poster\.(?!webp$)/i.test(file)) {
    errors.push(`${path.relative(root, file)}: poster must be WebP`);
  }
}

if (errors.length) {
  console.error(`Media validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${Object.keys(manifest).length} optimized media records.`);
