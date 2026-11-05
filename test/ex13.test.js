const { test } = require("node:test");
const { runExercise, assertPrinted, assertCallbackStyle } = require("./helpers");

const FILE = "ex13.js";

test("Exercise 13: prints 'System uptime: <seconds> seconds' from os.uptime()", () => {
  assertCallbackStyle(FILE, [["os.uptime", /\buptime\s*\(/]]);
  const { lines } = runExercise(FILE, { env: { FAKE_OS: JSON.stringify({ uptime: 52317 }) } });
  assertPrinted(lines, ["System uptime: 52317 seconds"], " (the number comes from os.uptime())");
});
