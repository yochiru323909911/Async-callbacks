const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { runExercise, makeSandbox, assertPrinted, assertCallbackStyle } = require("./helpers");

const FILE = "ex07.js";

test("Exercise 7: uses fs.access, fs.mkdir and path.join with callbacks", () => {
  assertCallbackStyle(FILE, [
    ["fs.access", /\baccess\s*\(/],
    ["fs.constants.F_OK", /\bF_OK\b/],
    ["fs.mkdir", /\bmkdir\s*\(/],
    ["path.join", /\bjoin\s*\(/],
  ]);
});

test("Exercise 7: creates the backup folder when it does not exist", () => {
  const dir = makeSandbox();
  const { lines } = runExercise(FILE, { dir });
  assertPrinted(lines, ["Folder created successfully."]);
  const backup = path.join(dir, "backup");
  assert.ok(
    fs.existsSync(backup) && fs.statSync(backup).isDirectory(),
    "a folder named backup should be created next to ex07.js - path.join(__dirname, 'backup')"
  );
});

test("Exercise 7: prints 'Folder already exists.' when backup is already there", () => {
  const dir = makeSandbox({ "backup/": null, "backup/keep.txt": "keep me" });
  const { lines } = runExercise(FILE, { dir });
  assertPrinted(lines, ["Folder already exists."]);
  assert.ok(
    !lines.includes("Folder created successfully."),
    "when the folder exists, don't print 'Folder created successfully.'"
  );
  assert.ok(fs.existsSync(path.join(dir, "backup", "keep.txt")), "don't touch an existing backup folder");
});
