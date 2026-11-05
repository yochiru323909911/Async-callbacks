const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, assertCallbackStyle } = require("./helpers");

const FILE = "ex11.js";

test("Exercise 11: uses fs.readdir, fs.lstat and path.join with callbacks", () => {
  assertCallbackStyle(FILE, [
    ["fs.readdir", /\breaddir\s*\(/],
    ["fs.lstat", /\blstat\s*\(/],
    ["path.join", /\bjoin\s*\(/],
    ["stats.isFile()", /\.isFile\s*\(/],
    ["stats.size", /\.size\b/],
  ]);
});

test("Exercise 11: prints the total size of the files in data-folder (folders are ignored), once", () => {
  const { lines } = runExercise(FILE, {
    files: {
      "data-folder/a.txt": "x".repeat(10),
      "data-folder/b.txt": "y".repeat(25),
      "data-folder/c.json": "z".repeat(100),
      "data-folder/inner/": null,
      "data-folder/inner/big.txt": "w".repeat(5000),
    },
  });
  const totals = lines.filter((l) => l.startsWith("Total size:"));
  assert.deepEqual(
    totals,
    ["Total size: 135 bytes"],
    `print 'Total size: 135 bytes' once - only after ALL the lstat callbacks finished (10 + 25 + 100; the folder 'inner' and what is inside it are not counted)${printed(lines)}`
  );
});
