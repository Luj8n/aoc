import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

const banks = input.split("\n").map((x) => x.split("").map((y) => +y));

function solve(input, left) {
  if (left === 0) return Math.max(...input);
  const n = input.length;
  const max = Math.max(...input.slice(0, n - left));
  const maxI = input.findIndex((x) => x === max);
  const other = solve(input.slice(maxI + 1), left - 1);
  return max * 10 ** left + other;
}

let sum1 = 0;
let sum2 = 0;

for (const bank of banks) {
  sum1 += solve(bank, 2 - 1);
  sum2 += solve(bank, 12 - 1);
}

console.log(`Part 1: ${sum1}`);
console.log(`Part 2: ${sum2}`);
