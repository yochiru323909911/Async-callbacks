const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");

const ROOT = path.join(__dirname, "..");
const PRELOAD = path.join(__dirname, "preload.cjs");

// Creates an empty temporary folder and fills it with files/folders:
//   { "notes.txt": "text", "my-folder/": null, "my-folder/a.txt": "abc" }
function makeSandbox(files = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "async-ex-"));
  for (const [name, content] of Object.entries(files)) {
    const full = path.join(dir, name);
    if (name.endsWith("/")) {
      fs.mkdirSync(full, { recursive: true });
    } else {
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, content);
    }
  }
  return dir;
}

// Runs a student file (like `node ex01.js`) inside its own temporary folder, so every run starts clean
// and nothing in your project folder is touched. Returns what it printed and the timers that fired.
function runExercise(file, { files = {}, env = {}, dir, timeout = 8000 } = {}) {
  const sandbox = dir ?? makeSandbox(files);
  fs.copyFileSync(path.join(ROOT, file), path.join(sandbox, file));
  const eventsFile = path.join(sandbox, ".events.json");
  fs.rmSync(eventsFile, { force: true });

  const result = spawnSync(process.execPath, ["--require", PRELOAD, file], {
    cwd: sandbox,
    encoding: "utf8",
    timeout,
    env: { ...process.env, ...env, TEST_EVENTS_FILE: eventsFile },
  });
  fs.rmSync(path.join(sandbox, file), { force: true });

  if (result.error?.code === "ETIMEDOUT") {
    assert.fail(
      `${file} never finished. A timer keeps running forever? (did you call clearInterval / stop the recursion?)`
    );
  }
  if (result.status !== 0) {
    const err = result.stderr.trim().split(/\r?\n/).slice(0, 8).join("\n");
    assert.fail(`${file} crashed:\n${err}`);
  }

  let events = [];
  if (fs.existsSync(eventsFile)) events = JSON.parse(fs.readFileSync(eventsFile, "utf8"));
  fs.rmSync(eventsFile, { force: true });

  const lines = result.stdout.split(/\r?\n/).map((l) => l.trim()).filter((l) => l !== "");
  return { dir: sandbox, lines, events, logs: events.filter((e) => e.type === "log") };
}

function printed(lines) {
  return `\n--- your program printed ---\n${lines.join("\n") || "(nothing)"}`;
}

// Asserts that every expected line was printed (extra lines are fine).
function assertPrinted(lines, expected, hint = "") {
  for (const line of expected) {
    assert.ok(lines.includes(line), `expected the line "${line}" to be printed${hint}.${printed(lines)}`);
  }
}

// Returns the indexes (in events) of the console.log calls whose text matches.
function logIndex(events, matcher) {
  return events.findIndex((e) => e.type === "log" && (typeof matcher === "string" ? e.text.trim() === matcher : matcher.test(e.text.trim())));
}

// The timers that fired between two events (by index).
function firedBetween(events, from, to) {
  return events.slice(from + 1, to).filter((e) => e.type === "fire");
}

// Source code without comments.
function sourceOf(file) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

// Checks the rules of this assignment: the required functions are used, with callbacks only
// (no ...Sync functions, no promises, no async/await).
function assertCallbackStyle(file, required) {
  const code = sourceOf(file);
  for (const [name, pattern] of required) {
    assert.match(code, pattern, `${file} should use ${name}`);
  }
  const sync = code.match(/\b\w+Sync\s*\(/);
  assert.equal(sync, null, `${file}: no sync functions allowed - found ${sync?.[0]}... use the callback version`);
  assert.doesNotMatch(code, /\bpromises\b|fs\/promises/, `${file}: don't use fs.promises - use callbacks`);
  assert.doesNotMatch(code, /\bawait\b|\basync\s+(function|\(|\w+\s*=>)/, `${file}: no async/await - use callbacks`);
  assert.doesNotMatch(code, /new\s+Promise|\.then\s*\(/, `${file}: no promises - use callbacks`);
}

module.exports = { makeSandbox, runExercise, assertPrinted, printed, logIndex, firedBetween, sourceOf, assertCallbackStyle };
