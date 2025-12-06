import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

let num = 50;

const offsets = input
  .trim()
  .replace(/L/g, "-")
  .replace(/R/g, "+")
  .split("\n")
  .map((x) => +x);

let counts1 = 0;
let counts2 = 0;

for (const x of offsets) {
  if (num + x <= 0) counts2 += 1 + ~~(-(num + x) / 100);
  if (num + x >= 100) counts2 += ~~((num + x) / 100);
  if (num + x <= 0 && num === 0) counts2 -= 1;
  // console.log(counts2 +" " + num + " " + x)
  num = (num + x + 1000000) % 100;
  if (num === 0) counts1 += 1;
}

console.log(`Part 1: ${counts1}`);
console.log(`Part 2: ${counts2}`);
