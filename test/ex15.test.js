const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { runExercise, makeSandbox, assertPrinted, assertCallbackStyle } = require("./helpers");

const FILE = "ex15.js";

test("Exercise 15: uses fs.access and fs.writeFile with callbacks", () => {
  assertCallbackStyle(FILE, [
    ["fs.access", /\baccess\s*\(/],
    ["fs.constants.F_OK", /\bF_OK\b/],
    ["fs.writeFile", /\bwriteFile\s*\(/],
  ]);
});

test("Exercise 15: creates data.txt with 'Hello Node.js' when it does not exist", () => {
  const dir = makeSandbox();
  const { lines } = runExercise(FILE, { dir });
  assertPrinted(lines, ["File created successfully."]);
  const file = path.join(dir, "data.txt");
  assert.ok(fs.existsSync(file), "data.txt should be created next to ex15.js");
  assert.equal(fs.readFileSync(file, "utf8").trim(), "Hello Node.js", "data.txt should contain: Hello Node.js");
});

test("Exercise 15: does not overwrite an existing data.txt - prints 'File already exists.'", () => {
  const dir = makeSandbox({ "data.txt": "my important data" });
  const { lines } = runExercise(FILE, { dir });
  assertPrinted(lines, ["File already exists."]);
  assert.ok(
    !lines.includes("File created successfully."),
    "when the file exists, don't print 'File created successfully.'"
  );
  assert.equal(
    fs.readFileSync(path.join(dir, "data.txt"), "utf8"),
    "my important data",
    "an existing data.txt must not be changed"
  );
});
