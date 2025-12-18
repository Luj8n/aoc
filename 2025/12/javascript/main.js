import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

// Seems like a troll problem. Also, it doesn't solve the example input correctly.

function part1() {
  const parts = input.split("\n\n");
  const pieces = parts.slice(0, -1);

  const pieceSizes = pieces.map((p) => p.split("").filter((c) => c === "#").length);

  const regions = parts.at(-1).split("\n");

  let possible = 0;

  for (const region of regions) {
    const [a, ...b] = region.split(" ");
    const regionSize = a
      .slice(0, -1)
      .split("x")
      .reduce((x, y) => x * y, 1);

    let puzzleSize = 0;
    for (let i = 0; i < b.length; i++) {
      puzzleSize += +b[i] * pieceSizes[i];
    }

    if (puzzleSize <= regionSize) possible += 1;
  }

  return possible;
}

console.log(`Part 1: ${part1()}`);
