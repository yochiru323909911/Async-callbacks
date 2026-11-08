const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, logIndex, firedBetween, sourceOf, assertCallbackStyle } = require("./helpers");

const FILE = "ex10.js";

test("Exercise 10: prints Message 1, Message 2, Message 3", () => {
  const { lines } = runExercise(FILE);
  assert.deepEqual(
    lines,
    ["Message 1", "Message 2", "Message 3"],
    `exactly three lines: Message 1, Message 2, Message 3${printed(lines)}`
  );
});

test("Exercise 10: waits 1 second (setTimeout 1000ms) before each next message", () => {
  const { events, lines } = runExercise(FILE);
  for (let n = 1; n < 3; n++) {
    const from = logIndex(events, `Message ${n}`);
    const to = logIndex(events, `Message ${n + 1}`);
    assert.ok(from !== -1 && to !== -1, `both Message ${n} and Message ${n + 1} should be printed.${printed(lines)}`);
    const delays = firedBetween(events, from, to).map((e) => `${e.kind} ${e.delay}ms`);
    assert.deepEqual(
      delays,
      ["timeout 1000ms"],
      `between Message ${n} and Message ${n + 1} one setTimeout of 1000ms should run (found: ${delays.join(", ") || "none"})`
    );
  }
});

test("Exercise 10: nested setTimeout callbacks - no loops, no setInterval, no promises", () => {
  assertCallbackStyle(FILE, [["setTimeout", /\bsetTimeout\s*\(/]]);
  const code = sourceOf(FILE);
  assert.ok(
    (code.match(/\bsetTimeout\s*\(/g) || []).length >= 2,
    "nest the setTimeout calls: the next setTimeout is written inside the callback of the previous one"
  );
  assert.doesNotMatch(code, /\bsetInterval\s*\(/, "use nested setTimeout, not setInterval");
  assert.doesNotMatch(code, /\b(for|while)\s*\(|\.forEach\s*\(/, "no loops - nested callbacks only");
});
