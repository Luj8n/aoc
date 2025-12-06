import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

const ranges = input
  .trim()
  .split(",")
  .map((r) => r.split("-").map((x) => +x));

let sum1 = 0;
let sum2 = 0;

for (const [min, max] of ranges) {
  for (let i = min; i <= max; i++) {
    const s = i.toString();
    const n = s.length;
    if (n % 2 === 0 && s.slice(0, n / 2) === s.slice(n / 2)) sum1 += i;
    for (let j = 1; j <= n / 2; j++) {
      if (n % j === 0 && s.slice(0, j).repeat(n / j) === s) {
        sum2 += i;
        break;
      }
    }
  }
}

console.log(`Part 1: ${sum1}`);
console.log(`Part 2: ${sum2}`);
