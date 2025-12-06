import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

const ranges = input
  .trim()
  .split("\n\n")[0]
  .split("\n")
  .map((x) => x.split("-").map((y) => BigInt(y)));

const nums = input
  .trim()
  .split("\n\n")[1]
  .split("\n")
  .map((x) => BigInt(x));

let count1 = 0;

for (const num of nums) {
  for (const [min, max] of ranges) {
    if (num >= min && num <= max) {
      count1 += 1;
      break;
    }
  }
}

ranges.sort((a, b) => (a[0] > b[0] ? 1 : -1));

let newRanges = [];

let prevMax = -1n;
for (const [min, max] of ranges) {
  if (min <= prevMax + 1n) {
    if (max > prevMax) newRanges.at(-1)[1] = max;
  } else {
    newRanges.push([min, max]);
  }
  if (max > prevMax) prevMax = max;
}

let count2 = 0n;

for (const [min, max] of newRanges) {
  count2 += max - min + 1n;
}

console.log(`Part 1: ${count1}`);
console.log(`Part 2: ${count2}`);
