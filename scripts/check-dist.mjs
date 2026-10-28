/* eslint-disable no-console -- CLI script reports to the terminal */
// Verifies the built package: every path in package.json entry fields exists,
// CommonJS output parses as CommonJS, and relative specifiers in .d.ts files
// carry the extensions moduleResolution node16/nodenext requires.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { relative, resolve } from "node:path";

const root = process.cwd();
const distPath = resolve(root, "dist");
const packageJson = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
);
const errors = [];

const collectPaths = (value) =>
  typeof value === "string"
    ? [value]
    : Object.values(value ?? {}).flatMap(collectPaths);

const entryPaths = [
  packageJson.main,
  packageJson.module,
  packageJson.types,
  ...collectPaths(packageJson.exports),
];

for (const path of new Set(entryPaths)) {
  if (!existsSync(resolve(root, path))) {
    errors.push(`[entry] ${path} is referenced in package.json but missing`);
  }
}

for (const file of readdirSync(distPath)) {
  if (!file.endsWith(".cjs")) continue;
  try {
    execFileSync(process.execPath, ["--check", resolve(distPath, file)], {
      stdio: "pipe",
    });
  } catch (error) {
    const lines = error.stderr?.toString().split("\n") ?? [];
    const message =
      lines.find((line) => line.startsWith("SyntaxError")) ??
      lines.find(Boolean);
    errors.push(`[cjs] dist/${file} is not valid CommonJS: ${message}`);
  }
}

const specifierPattern =
  /(?:\bfrom\s*|\bimport\s*\(\s*)(["'])(\.{1,2}\/[^"']+?)\1/g;

for (const entry of readdirSync(distPath, {
  recursive: true,
  withFileTypes: true,
})) {
  if (!entry.isFile() || !entry.name.endsWith(".d.ts")) continue;
  const filePath = resolve(entry.parentPath, entry.name);
  const content = readFileSync(filePath, "utf8");
  for (const [, , specifier] of content.matchAll(specifierPattern)) {
    if (!/\.(c|m)?js$/.test(specifier)) {
      errors.push(
        `[dts] ${relative(root, filePath)} imports "${specifier}" without an extension`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("dist:check passed");
