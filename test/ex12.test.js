const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, assertPrinted, assertCallbackStyle } = require("./helpers");

const FILE = "ex12.js";

test("Exercise 12: uses fs.access and path.extname", () => {
  assertCallbackStyle(FILE, [
    ["fs.access", /\baccess\s*\(/],
    ["fs.constants.F_OK", /\bF_OK\b/],
    ["path.extname", /\bextname\s*\(/],
  ]);
});

test("Exercise 12: prints 'notes.txt is a .txt file.' when notes.txt exists", () => {
  const { lines } = runExercise(FILE, { files: { "notes.txt": "my notes" } });
  assertPrinted(lines, ["notes.txt is a .txt file."]);
});

test("Exercise 12: prints 'File not found.' when notes.txt does not exist", () => {
  const { lines } = runExercise(FILE, { files: { "other.txt": "x" } });
  assertPrinted(lines, ["File not found."]);
  assert.ok(
    !lines.includes("notes.txt is a .txt file."),
    "don't print that it is a .txt file when it does not exist"
  );
});
