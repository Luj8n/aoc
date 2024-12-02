import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const reports = input.split("\n");

  let safeCount = 0;

  for (const report of reports) {
    const levels = report
      .trim()
      .split(" ")
      .map((x) => +x);

    let allDecreasing = true;
    let allIncreasing = true;

    for (let i = 1; i < levels.length; i++) {
      if (levels[i - 1] >= levels[i]) allIncreasing = false;
      if (levels[i - 1] <= levels[i]) allDecreasing = false;
      if (Math.abs(levels[i - 1] - levels[i]) > 3) {
        allDecreasing = false;
        allIncreasing = false;
        break;
      }
    }

    if (allDecreasing || allIncreasing) safeCount += 1;
  }

  return safeCount;
}

// Not a good solution, but for the provided inputs it's ok.
// Could do it in O(n * m) instead of O(n^2 * m),
// where n is the length of each report and m the amount of reports
function part2() {
  const reports = input.split("\n");

  let safeCount = 0;

  for (const report of reports) {
    const levels = report
      .trim()
      .split(" ")
      .map((x) => +x);

    let anySafe = false;

    for (let r = 0; r < levels.length; r++) {
      const newLevels = levels.map((x) => x);
      newLevels.splice(r, 1);

      let allDecreasing = true;
      let allIncreasing = true;

      for (let i = 1; i < newLevels.length; i++) {
        if (newLevels[i - 1] >= newLevels[i]) allIncreasing = false;
        if (newLevels[i - 1] <= newLevels[i]) allDecreasing = false;
        if (Math.abs(newLevels[i - 1] - newLevels[i]) > 3) {
          allDecreasing = false;
          allIncreasing = false;
          break;
        }
      }

      if (allDecreasing || allIncreasing) {
        anySafe = true;
        break;
      }
    }
    if (anySafe) safeCount += 1;
  }

  return safeCount;
}
