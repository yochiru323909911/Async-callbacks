const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { runExercise, makeSandbox, assertPrinted, printed, assertCallbackStyle } = require("./helpers");

const FILE = "ex01.js";

test("Exercise 1: uses fs.readFile + fs.stat with callbacks (no Sync, no promises)", () => {
  assertCallbackStyle(FILE, [
    ["fs.readFile", /\breadFile\s*\(/],
    ["fs.stat", /\bstat\s*\(/],
  ]);
});

test("Exercise 1: prints the content of sample.txt after 'File Content:'", () => {
  const content = "Testing line one\nAnd a second line 42";
  const { lines } = runExercise(FILE, { files: { "sample.txt": content } });
  assertPrinted(
    lines,
    ["File Content:", "Testing line one", "And a second line 42"],
    " (read sample.txt with 'utf8' so you print text and not a Buffer)"
  );
  assert.ok(
    lines.indexOf("File Content:") < lines.indexOf("Testing line one"),
    `print 'File Content:' before the content.${printed(lines)}`
  );
});

test("Exercise 1: after reading, prints the size and the creation date of sample.txt", () => {
  const content = "Hello world, welcome to Node.js! (test)";
  const dir = makeSandbox({ "sample.txt": content });
  const stats = fs.statSync(path.join(dir, "sample.txt"));
  const { lines } = runExercise(FILE, { dir });

  const size = Buffer.byteLength(content);
  assertPrinted(lines, [`Size: ${size} bytes`], " (stats.size)");

  const created = lines.find((l) => l.startsWith("Created At:"));
  const accepted = [stats.birthtime.toISOString(), String(stats.birthtime)];
  assert.ok(created, `print the line 'Created At: <date>' (stats.birthtime).${printed(lines)}`);
  assert.ok(
    accepted.includes(created.replace("Created At:", "").trim()),
    `'Created At:' should show stats.birthtime, e.g. Created At: ${accepted[0]}${printed(lines)}`
  );

  const contentAt = lines.indexOf(content);
  assert.ok(
    contentAt !== -1 && contentAt < lines.indexOf(`Size: ${size} bytes`),
    `print the content first, and only then the size and date.${printed(lines)}`
  );
});
