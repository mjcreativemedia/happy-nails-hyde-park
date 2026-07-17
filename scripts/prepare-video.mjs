import { mkdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const [, , inputArg, outputArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error(
    "Usage: npm run media:video -- source.mp4 public/videos/project-name",
  );
  process.exit(1);
}

const input = resolve(inputArg);
const outputBase = resolve(
  extname(outputArg) ? outputArg.slice(0, -extname(outputArg).length) : outputArg,
);
const videoOutput = `${outputBase}.webm`;
const posterOutput = `${outputBase}-poster.jpg`;
const scale =
  "scale='min(1280,iw)':-2:force_original_aspect_ratio=decrease";

mkdirSync(dirname(videoOutput), { recursive: true });

function run(args) {
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.error?.code === "ENOENT") {
    console.error("ffmpeg is required. Install it before preparing videos.");
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}

run([
  "-y",
  "-i",
  input,
  "-an",
  "-vf",
  scale,
  "-c:v",
  "libvpx-vp9",
  "-crf",
  "34",
  "-b:v",
  "0",
  "-row-mt",
  "1",
  "-deadline",
  "good",
  "-cpu-used",
  "2",
  videoOutput,
]);

run([
  "-y",
  "-i",
  input,
  "-vf",
  `thumbnail,${scale}`,
  "-frames:v",
  "1",
  "-q:v",
  "3",
  posterOutput,
]);

console.log(`Created ${videoOutput}`);
console.log(`Created ${posterOutput}`);
