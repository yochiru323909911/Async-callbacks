const { test } = require("node:test");
const assert = require("node:assert/strict");
const { runExercise, printed, assertCallbackStyle } = require("./helpers");

const FILE = "ex04.js";
const QUOTES = "\nFirst quote here.\n\nMiddle quote.\n\n\nLast quote!\n\n";
const NON_EMPTY = ["First quote here.", "Middle quote.", "Last quote!"];

function randomLine(random) {
  const { lines } = runExercise(FILE, {
    files: { "quotes.txt": QUOTES },
    env: { FAKE_RANDOM: String(random) },
  });
  const out = lines.filter((l) => l.startsWith("Random Line:"));
  assert.equal(out.length, 1, `print exactly one line that starts with 'Random Line:'.${printed(lines)}`);
  return out[0].replace("Random Line:", "").trim();
}

test("Exercise 4: uses fs.readFile with a callback (no Sync, no promises)", () => {
  assertCallbackStyle(FILE, [
    ["fs.readFile", /\breadFile\s*\(/],
    ["Math.random", /Math\.random\s*\(/],
  ]);
});

test("Exercise 4: prints 'Random Line: <line>' with a line from quotes.txt", () => {
  const line = randomLine(0.5);
  assert.ok(NON_EMPTY.includes(line), `the printed line should be one of the lines in quotes.txt, got: '${line}'`);
});

test("Exercise 4: ignores empty lines and can pick every line (first and last too)", () => {
  assert.equal(
    randomLine(0),
    NON_EMPTY[0],
    "when Math.random() returns 0 you should get the first non-empty line - remove the empty lines before choosing"
  );
  assert.equal(
    randomLine(0.999),
    NON_EMPTY[2],
    "when Math.random() returns 0.999 you should get the last non-empty line - choose with Math.floor(Math.random() * lines.length)"
  );
});
