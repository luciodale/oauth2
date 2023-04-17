#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { until } = require("@open-draft/until");

const SERVICE_WORKER_SOURCE_PATH = path.resolve(
  __dirname,
  "../",
  "src/service-worker.js"
);

const CWD = process.cwd();

const args = process.argv.slice(2);

console.log("source pathhhhh", SERVICE_WORKER_SOURCE_PATH);
process.exit(1);

const publicDir = "public";
// When running as a part of "postinstall" script, "cwd" equals the library's directory.
// The "postinstall" script resolves the right absolute public directory path.
const absolutePublicDir = path.isAbsolute(publicDir)
  ? publicDir
  : path.resolve(CWD, publicDir);

const dirExists = fs.existsSync(absolutePublicDir);

if (!dirExists) {
  // print error and exit
  console.log("Public directory does not exist!");
  process.exit(1);
}

console.log(
  'Initializing the Mock Service Worker at "%s"...',
  absolutePublicDir
);

const serviceWorkerFilename = path.basename(SERVICE_WORKER_BUILD_PATH);
const swDestFilepath = path.resolve(absolutePublicDir, serviceWorkerFilename);

fs.copyFileSync(SERVICE_WORKER_BUILD_PATH, swDestFilepath);

console.log("Service Worker successfully created!");
