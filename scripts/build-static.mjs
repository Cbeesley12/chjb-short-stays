import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const allowedExtensions = new Set([".html", ".txt", ".xml", ".css", ".js", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".ico"]);
const ignoredDirectories = new Set([".git", ".agents", ".codex", "dist", "node_modules", "output"]);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

async function copyStaticFiles(from, to) {
  await mkdir(to, { recursive: true });

  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      await copyStaticFiles(join(from, entry.name), join(to, entry.name));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!allowedExtensions.has(extname(entry.name).toLowerCase())) continue;
    await copyFile(join(from, entry.name), join(to, entry.name));
  }
}

await copyStaticFiles(root, dist);

console.log("Static site copied to dist/");
