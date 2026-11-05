const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, logIndex, firedBetween, sourceOf, assertCallbackStyle } = require("./helpers");

const FILE = "ex03.js";

test("Exercise 3: prints 5, 4, 3, 2, 1, 0 and then \"Time's up!\"", () => {
  const { lines } = runExercise(FILE);
  assert.deepEqual(
    lines,
    ["5", "4", "3", "2", "1", "0", "Time's up!"],
    `the output should be exactly the numbers 5 to 0 (one per line) and then Time's up!${printed(lines)}`
  );
});

test("Exercise 3: one number per second (setTimeout of 1000ms between numbers)", () => {
  const { events, lines } = runExercise(FILE);
  for (let n = 5; n > 0; n--) {
    const from = logIndex(events, String(n));
    const to = logIndex(events, String(n - 1));
    assert.ok(from !== -1 && to !== -1, `both ${n} and ${n - 1} should be printed.${printed(lines)}`);
    const delays = firedBetween(events, from, to).map((e) => `${e.kind} ${e.delay}ms`);
    assert.deepEqual(
      delays,
      ["timeout 1000ms"],
      `between ${n} and ${n - 1} exactly one setTimeout of 1000ms should run (found: ${delays.join(", ") || "none"})`
    );
  }
});

test("Exercise 3: uses recursion + setTimeout (no loops, no setInterval)", () => {
  assertCallbackStyle(FILE, [["setTimeout", /\bsetTimeout\s*\(/]]);
  const code = sourceOf(FILE);
  assert.doesNotMatch(code, /\bsetInterval\s*\(/, "solve it with setTimeout, not setInterval");
  assert.doesNotMatch(
    code,
    /\b(for|while)\s*\(|\.forEach\s*\(/,
    "no loops - the function should call itself again inside setTimeout (recursion)"
  );
});
