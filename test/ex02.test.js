const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, assertCallbackStyle } = require("./helpers");

const FILE = "ex02.js";

test("Exercise 2: uses fs.readdir + fs.lstat + path.join with callbacks (no Sync, no promises)", () => {
  assertCallbackStyle(FILE, [
    ["fs.readdir", /\breaddir\s*\(/],
    ["fs.lstat", /\blstat\s*\(/],
    ["path.join", /\bjoin\s*\(/],
    ["stats.isFile()", /\.isFile\s*\(/],
  ]);
});

test("Exercise 2: prints only the files in my-folder (not the folders)", () => {
  const { lines } = runExercise(FILE, {
    files: {
      "my-folder/server.js": "x",
      "my-folder/todo.txt": "abc",
      "my-folder/readme.md": "# hi",
      "my-folder/pictures/": null,
      "my-folder/pictures/cat.png": "png",
      "my-folder/empty-dir/": null,
    },
  });
  const fileLines = lines.filter((l) => l.startsWith("File:")).sort();
  assert.deepEqual(
    fileLines,
    ["File: readme.md", "File: server.js", "File: todo.txt"],
    `print 'File: <name>' for each file in my-folder, and nothing for the folders (pictures, empty-dir).${printed(lines)}`
  );
  assert.ok(
    !lines.some((l) => /pictures|empty-dir|cat\.png/.test(l)),
    `folders (and what is inside them) should not be printed.${printed(lines)}`
  );
});
