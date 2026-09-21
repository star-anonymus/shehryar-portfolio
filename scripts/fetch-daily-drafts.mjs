/**
 * Calls the deployed /api/studio/generate endpoint and writes the result into
 * the repo, so the Studio page always has a fresh batch without anyone opening
 * it. Meant to run from the daily GitHub Action.
 *
 * Required env:
 *   SITE_URL      — e.g. https://shehryarahmed.dev
 *   STUDIO_TOKEN  — must match the deployment's STUDIO_TOKEN
 *
 * Optional env:
 *   DAYS          — activity window, default 7
 *   COUNT         — number of drafts, default 3
 *   STEER         — extra instruction for the writer
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
const token = process.env.STUDIO_TOKEN;

if (!siteUrl || !token) {
  console.error("SITE_URL and STUDIO_TOKEN must both be set.");
  process.exit(1);
}

const payload = {
  days: Number(process.env.DAYS ?? 7),
  count: Number(process.env.COUNT ?? 3),
  ...(process.env.STEER ? { steer: process.env.STEER } : {}),
};

console.log(`Requesting drafts from ${siteUrl}/api/studio/generate …`);

const response = await fetch(`${siteUrl}/api/studio/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-studio-token": token },
  body: JSON.stringify(payload),
  // The endpoint does web search plus two model turns.
  signal: AbortSignal.timeout(300_000),
});

const text = await response.text();

if (!response.ok) {
  console.error(`Request failed (${response.status}): ${text.slice(0, 500)}`);
  process.exit(1);
}

let result;
try {
  result = JSON.parse(text);
} catch {
  console.error("Response was not JSON:", text.slice(0, 500));
  process.exit(1);
}

if (!Array.isArray(result.posts) || result.posts.length === 0) {
  console.error("No posts came back; leaving the existing file alone.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const archiveDir = path.join(root, "content", "drafts");

await fs.mkdir(archiveDir, { recursive: true });
await fs.writeFile(
  path.join(archiveDir, `${today}.json`),
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);
await fs.writeFile(
  path.join(root, "content", "latest-drafts.json"),
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);

console.log(`Wrote ${result.posts.length} drafts for ${today}.`);
for (const post of result.posts) {
  console.log(`  · [${post.angle}] ${post.hook}`);
}
