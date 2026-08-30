import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const allowedExtensions = new Set([".html", ".txt", ".xml", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".ico"]);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  if (!allowedExtensions.has(extname(entry.name).toLowerCase())) continue;
  await copyFile(join(root, entry.name), join(dist, entry.name));
}

console.log("Static site copied to dist/");
