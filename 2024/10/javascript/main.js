import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const map = input.split("\n").map((r) => [...r].map((n) => +n));
  const height = map.length;
  const width = map[0].length;

  function r(x, y, target, mem) {
    if (x < 0 || x >= width || y < 0 || y >= height) return 0;
    if (map[y][x] !== target || mem[y][x]) return 0;
    mem[y][x] = true;
    if (target === 9) return 1;

    return (
      r(x + 1, y, target + 1, mem) +
      r(x, y + 1, target + 1, mem) +
      r(x - 1, y, target + 1, mem) +
      r(x, y - 1, target + 1, mem)
    );
  }

  let score = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === 0) {
        const mem = new Array(height).fill().map((_) => new Array(width).fill(false));
        score += r(x, y, 0, mem);
      }
    }
  }

  return score;
}

// I guess there's no need to optimize this
function part2() {
  const map = input.split("\n").map((r) => [...r].map((n) => +n));
  const height = map.length;
  const width = map[0].length;

  function r(x, y, target) {
    if (x < 0 || x >= width || y < 0 || y >= height) return 0;
    if (map[y][x] !== target) return 0;
    if (target === 9) return 1;

    return (
      r(x + 1, y, target + 1) +
      r(x, y + 1, target + 1) +
      r(x - 1, y, target + 1) +
      r(x, y - 1, target + 1)
    );
  }

  let score = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === 0) {
        score += r(x, y, 0);
      }
    }
  }

  return score;
}
