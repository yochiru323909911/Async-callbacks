const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, assertCallbackStyle } = require("./helpers");

const FILE = "ex09.js";
const MODELS = ["Test CPU Alpha 3.1GHz", "Test CPU Alpha 3.1GHz", "Test CPU Beta 2.0GHz"];

test("Exercise 9: prints 'CPU <index>: <model>' for every core from os.cpus()", () => {
  assertCallbackStyle(FILE, [["os.cpus", /\bcpus\s*\(/]]);
  const { lines } = runExercise(FILE, { env: { FAKE_OS: JSON.stringify({ cpus: MODELS }) } });
  const cpuLines = lines.filter((l) => l.startsWith("CPU"));
  assert.deepEqual(
    cpuLines,
    MODELS.map((m, i) => `CPU ${i}: ${m}`),
    `one line per core, numbered from 0, with cpu.model${printed(lines)}`
  );
});
