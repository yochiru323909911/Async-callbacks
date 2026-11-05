const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { runExercise, makeSandbox, assertCallbackStyle } = require("./helpers");

const FILE = "ex06.js";
const LINE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z - Log entry$/;

function logLines(dir) {
  return fs
    .readFileSync(path.join(dir, "log.txt"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "");
}

test("Exercise 6: uses fs.appendFile with a callback and new Date().toISOString()", () => {
  assertCallbackStyle(FILE, [
    ["fs.appendFile", /\bappendFile\s*\(/],
    ["toISOString()", /\.toISOString\s*\(/],
  ]);
});

test("Exercise 6: creates log.txt with a line '<ISO date> - Log entry'", () => {
  const before = Date.now();
  const dir = makeSandbox();
  runExercise(FILE, { dir });
  assert.ok(
    fs.existsSync(path.join(dir, "log.txt")),
    "after running, log.txt should exist next to ex06.js (appendFile creates it if it is missing)"
  );
  const lines = logLines(dir);
  assert.equal(lines.length, 1, `log.txt should have one line, found:\n${lines.join("\n")}`);
  assert.match(lines[0], LINE, "the line should look like: 2025-06-28T22:10:15.000Z - Log entry");
  const time = Date.parse(lines[0].split(" - ")[0]);
  assert.ok(Math.abs(time - before) < 60000, "the timestamp should be the current time (new Date().toISOString())");
});

test("Exercise 6: every run adds a new line and keeps the old lines", () => {
  const dir = makeSandbox({ "log.txt": "old line\n" });
  runExercise(FILE, { dir });
  runExercise(FILE, { dir });
  const lines = logLines(dir);
  assert.equal(lines[0], "old line", "appendFile should add to the end of the file, not overwrite it");
  assert.equal(
    lines.length,
    3,
    `after 2 runs log.txt should have the old line + 2 new lines, each on its own line (add "\\n"). Found:\n${lines.join("\n")}`
  );
  assert.match(lines[1], LINE);
  assert.match(lines[2], LINE);
});
