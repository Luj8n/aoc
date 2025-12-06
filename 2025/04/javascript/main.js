import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

let map = input
  .trim()
  .split("\n")
  .map((x) => [...x]);
const H = map.length;
const W = map[0].length;

map = [[...".".repeat(W + 2)], ...map.map((r) => [".", ...r, "."]), [...".".repeat(W + 2)]];

// Part 1
let count1 = 0;

for (let y = 1; y < H + 1; y++) {
  for (let x = 1; x < W + 1; x++) {
    if (map[y][x] !== "@") continue;
    let num = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) continue;
        if (map[y + dy][x + dx] === "@") num += 1;
      }
    }
    if (num < 4) count1 += 1;
  }
}

// Part 2
let count2 = 0;

while (true) {
  const beforeCount = count2;
  for (let y = 1; y < H + 1; y++) {
    for (let x = 1; x < W + 1; x++) {
      if (map[y][x] !== "@") continue;
      let num = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) continue;
          if (map[y + dy][x + dx] === "@") num += 1;
        }
      }
      if (num < 4) {
        count2 += 1;
        map[y][x] = ".";
      }
    }
  }
  if (beforeCount === count2) break;
}

console.log(`Part 1: ${count1}`);
console.log(`Part 2: ${count2}`);
