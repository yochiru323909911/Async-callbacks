const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { runExercise, makeSandbox, assertPrinted, assertCallbackStyle } = require("./helpers");

const FILE = "ex08.js";

test("Exercise 8: uses fs.access and fs.unlink with callbacks", () => {
  assertCallbackStyle(FILE, [
    ["fs.access", /\baccess\s*\(/],
    ["fs.constants.F_OK", /\bF_OK\b/],
    ["fs.unlink", /\bunlink\s*\(/],
  ]);
});

test("Exercise 8: deletes temp.txt when it exists and prints 'File deleted.'", () => {
  const dir = makeSandbox({ "temp.txt": "temporary", "other.txt": "stay" });
  const { lines } = runExercise(FILE, { dir });
  assertPrinted(lines, ["File deleted."]);
  assert.ok(!fs.existsSync(path.join(dir, "temp.txt")), "temp.txt should be deleted (fs.unlink)");
  assert.ok(fs.existsSync(path.join(dir, "other.txt")), "delete only temp.txt");
});

test("Exercise 8: prints 'File not found.' when temp.txt does not exist (without crashing)", () => {
  const { lines } = runExercise(FILE);
  assertPrinted(lines, ["File not found."]);
  assert.ok(!lines.includes("File deleted."), "don't print 'File deleted.' when there was nothing to delete");
});
