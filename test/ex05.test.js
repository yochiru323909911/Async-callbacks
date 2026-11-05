const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, assertCallbackStyle } = require("./helpers");

const FILE = "ex05.js";
const TOTAL = 16000;
// the free memory on each tick of the interval (index 0 = before the first tick)
const FREE = [99, 11720, 11665.6, 11648, 11640, 11616];
const expected = FREE.slice(1).map((f) => `Free Memory: ${((f / TOTAL) * 100).toFixed(2)}%`);
const env = { FAKE_OS: JSON.stringify({ totalmem: TOTAL, freemem: FREE }) };

test("Exercise 5: uses os.freemem, os.totalmem, setInterval and clearInterval", () => {
  assertCallbackStyle(FILE, [
    ["os.freemem", /\bfreemem\s*\(/],
    ["os.totalmem", /\btotalmem\s*\(/],
    ["setInterval", /\bsetInterval\s*\(/],
    ["clearInterval", /\bclearInterval\s*\(/],
  ]);
});

test("Exercise 5: prints the free memory percentage 5 times (2 decimals) and then 'Memory logging complete.'", () => {
  const { lines } = runExercise(FILE, { env });
  assert.deepEqual(
    lines,
    [...expected, "Memory logging complete."],
    `expected 5 lines of 'Free Memory: XX.XX%' (freemem / totalmem * 100, toFixed(2)) - one on every tick - and then 'Memory logging complete.'${printed(lines)}`
  );
});

test("Exercise 5: logs every 2 seconds with setInterval and stops it with clearInterval", () => {
  const { events } = runExercise(FILE, { env });
  const intervals = events.filter((e) => e.type === "set" && e.kind === "interval");
  assert.equal(intervals.length, 1, "create one setInterval");
  assert.equal(intervals[0].delay, 2000, "the interval should run every 2000ms (2 seconds)");
  const ticks = events.filter((e) => e.type === "fire" && e.kind === "interval").length;
  assert.equal(ticks, 5, `the interval should run exactly 5 times and then be stopped (ran ${ticks} times)`);
  assert.ok(
    events.some((e) => e.type === "clear" && e.kind === "interval"),
    "stop the interval with clearInterval(intervalId)"
  );
});
