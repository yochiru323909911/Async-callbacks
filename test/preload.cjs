// Loaded by the tests before the student's file (node --require). Never needed when you run the file yourself.
//
// What it does:
// - Timers run 20x faster, so the tests don't wait whole seconds. The delay you asked for is still recorded.
// - Records, in order, everything printed with console.log and every timer that fired (with its delay),
//   so the tests can check "one number per second", "every 2 seconds" and so on.
// - Can replace Math.random and a few os functions with known values (only when a test asks for it),
//   so the tests can check that the output is really computed and not written by hand.
const fs = require("node:fs");
const os = require("node:os");

const SPEED = 20;
const events = [];
let intervalTicks = 0;

const originalLog = console.log;
console.log = (...args) => {
  const text = args.map((a) => (typeof a === "string" ? a : require("node:util").inspect(a))).join(" ");
  events.push({ type: "log", text });
  originalLog(...args);
};

const realSetTimeout = global.setTimeout;
const realSetInterval = global.setInterval;
const realClearInterval = global.clearInterval;
const realClearTimeout = global.clearTimeout;

function scaled(delay) {
  const ms = Number(delay) || 0;
  return Math.max(0, Math.round(ms / SPEED));
}

global.setTimeout = function (callback, delay, ...args) {
  const ms = Number(delay) || 0;
  events.push({ type: "set", kind: "timeout", delay: ms });
  return realSetTimeout(
    (...a) => {
      events.push({ type: "fire", kind: "timeout", delay: ms });
      callback(...a);
    },
    scaled(ms),
    ...args
  );
};

global.setInterval = function (callback, delay, ...args) {
  const ms = Number(delay) || 0;
  events.push({ type: "set", kind: "interval", delay: ms });
  return realSetInterval(
    (...a) => {
      intervalTicks++;
      events.push({ type: "fire", kind: "interval", delay: ms });
      callback(...a);
    },
    scaled(ms),
    ...args
  );
};

global.clearInterval = function (id) {
  events.push({ type: "clear", kind: "interval" });
  return realClearInterval(id);
};

global.clearTimeout = function (id) {
  events.push({ type: "clear", kind: "timeout" });
  return realClearTimeout(id);
};

if (process.env.FAKE_RANDOM) {
  const values = process.env.FAKE_RANDOM.split(",").map(Number);
  let i = 0;
  Math.random = () => values[i++ % values.length];
}

if (process.env.FAKE_OS) {
  const fake = JSON.parse(process.env.FAKE_OS);
  if (fake.cpus) os.cpus = () => fake.cpus.map((model) => ({ model, speed: 2600, times: {} }));
  if (fake.uptime !== undefined) os.uptime = () => fake.uptime;
  if (fake.totalmem !== undefined) os.totalmem = () => fake.totalmem;
  // free memory changes on every interval tick, so every log line has a different value
  if (fake.freemem) os.freemem = () => fake.freemem[Math.min(intervalTicks, fake.freemem.length - 1)];
}

process.on("exit", () => {
  if (process.env.TEST_EVENTS_FILE) fs.writeFileSync(process.env.TEST_EVENTS_FILE, JSON.stringify(events));
});
