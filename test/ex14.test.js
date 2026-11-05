const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, logIndex, firedBetween, sourceOf, assertCallbackStyle } = require("./helpers");

const FILE = "ex14.js";
const RANDOMS = [0.1, 0.62, 0.95, 0.3];
const env = { FAKE_RANDOM: RANDOMS.join(",") };

test("Exercise 14: prints 3, 2, 1, 0 and then 'Done!'", () => {
  const { lines } = runExercise(FILE, { env });
  assert.deepEqual(lines, ["3", "2", "1", "0", "Done!"], `exactly: 3, 2, 1, 0, Done!${printed(lines)}`);
});

test("Exercise 14: waits a random delay (500 + Math.random() * 1000 ms) before each next number", () => {
  const { events, lines } = runExercise(FILE, { env });
  const used = [];
  for (let n = 3; n > 0; n--) {
    const from = logIndex(events, String(n));
    const to = logIndex(events, String(n - 1));
    assert.ok(from !== -1 && to !== -1, `both ${n} and ${n - 1} should be printed.${printed(lines)}`);
    const fired = firedBetween(events, from, to);
    assert.equal(fired.length, 1, `between ${n} and ${n - 1} exactly one setTimeout should run (found ${fired.length})`);
    const { delay } = fired[0];
    assert.ok(delay >= 500 && delay <= 1500, `the delay between ${n} and ${n - 1} should be between 500 and 1500ms (was ${delay})`);
    assert.ok(
      RANDOMS.some((r) => Math.abs(delay - (500 + r * 1000)) <= 1),
      `compute the delay with: const delay = 500 + Math.random() * 1000 (got ${delay}ms)`
    );
    used.push(Math.round(delay));
  }
  assert.ok(
    new Set(used).size > 1,
    "every step should get its own random delay - call Math.random() again for each number"
  );
});

test("Exercise 14: recursive or nested setTimeout - no loops, no setInterval", () => {
  assertCallbackStyle(FILE, [
    ["setTimeout", /\bsetTimeout\s*\(/],
    ["Math.random", /Math\.random\s*\(/],
  ]);
  const code = sourceOf(FILE);
  assert.doesNotMatch(code, /\bsetInterval\s*\(/, "use setTimeout, not setInterval");
  assert.doesNotMatch(code, /\b(for|while)\s*\(|\.forEach\s*\(/, "no loops - use recursion or nested callbacks");
});
