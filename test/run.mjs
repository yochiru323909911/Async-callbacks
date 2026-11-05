// `npm test` runs this file.
// - On an exercise branch (ex01-..., ex02-...): runs the tests of the exercise(s) on this branch.
// - On main: all 15 exercises must be merged into main, and all their tests must pass.
import { existsSync } from "node:fs";
import { spawnSync, execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export const BRANCHES = [
  "ex01-file-reader",
  "ex02-directory-files",
  "ex03-countdown",
  "ex04-random-line",
  "ex05-memory-logger",
  "ex06-append-log",
  "ex07-create-folder",
  "ex08-delete-file",
  "ex09-cpu-models",
  "ex10-message-chain",
  "ex11-folder-size",
  "ex12-file-extension",
  "ex13-uptime",
  "ex14-random-countdown",
  "ex15-create-file",
];

const testFile = (branch) => `test/${branch.slice(0, 4)}.test.js`;

function currentBranch() {
  if (process.env.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF; // pull request
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME; // push on GitHub
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

const branch = currentBranch();
const onExerciseBranch = BRANCHES.includes(branch);
const present = BRANCHES.filter((b) => existsSync(path.join(ROOT, testFile(b))));
const missing = BRANCHES.filter((b) => !present.includes(b));

if (present.length === 0) {
  console.log(`\nYou are on the branch '${branch || "?"}' and there is no exercise here yet.`);
  console.log(`Start with: git checkout ${BRANCHES[0]}\n`);
  process.exit(1);
}

const env = { ...process.env, RUN_BRANCH: branch, ALL_BRANCHES: BRANCHES.join(",") };
if (onExerciseBranch) {
  const next = BRANCHES[BRANCHES.indexOf(branch) + 1];
  env.RUN_MODE = "branch";
  env.NEXT_BRANCH = next ?? "";
} else {
  env.RUN_MODE = "main";
  env.MISSING_BRANCHES = missing.join(",");
}

const result = spawnSync(
  process.execPath,
  ["--test", "--test-concurrency=4", "--test-reporter=./test/reporter.mjs", ...present.map(testFile)],
  { cwd: ROOT, stdio: "inherit", env }
);

const failed = result.status !== 0 || (env.RUN_MODE === "main" && missing.length > 0);
process.exit(failed ? 1 : 0);
