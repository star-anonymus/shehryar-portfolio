/**
 * Starts the Next dev server with the working directory pinned to this repo,
 * regardless of where the process was spawned from.
 *
 * Needed because some launchers spawn with an unrelated cwd, and `next dev`
 * resolves its build directory relative to cwd.
 *
 * Usage: node scripts/dev-server.mjs [--port 3200]
 */
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

process.chdir(root);

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const args = process.argv.slice(2);

process.argv = [process.argv[0], nextBin, "dev", ...args];

await import(`file://${nextBin.replace(/\\/g, "/")}`);
