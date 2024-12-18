import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();
const width = 7;
const height = width;

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const bytesFallen = 12;

  const map = new Array(height).fill().map((_) => new Array(width).fill(false));
  for (const line of input.split("\n").slice(0, bytesFallen)) {
    const [x, y] = line.split(",").map((n) => +n);
    map[y][x] = true;
  }

  const dists = new Array(height).fill().map((_) => new Array(width).fill(Infinity));

  const q = [{ x: 0, y: 0, dist: 0 }];

  while (q.length > 0) {
    const { x, y, dist } = q.shift();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (map[y][x] || dists[y][x] <= dist) continue;
    dists[y][x] = dist;

    q.push({ x: x + 1, y, dist: dist + 1 });
    q.push({ x, y: y + 1, dist: dist + 1 });
    q.push({ x: x - 1, y, dist: dist + 1 });
    q.push({ x, y: y - 1, dist: dist + 1 });
  }

  return dists[height - 1][width - 1];
}

function part2() {
  const map = new Array(height).fill().map((_) => new Array(width).fill(false));

  for (const line of input.split("\n")) {
    const [x, y] = line.split(",").map((n) => +n);
    map[y][x] = true;

    const dists = new Array(height).fill().map((_) => new Array(width).fill(Infinity));

    const q = [{ x: 0, y: 0, dist: 0 }];

    while (q.length > 0) {
      const { x, y, dist } = q.shift();
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      if (map[y][x] || dists[y][x] <= dist) continue;
      dists[y][x] = dist;
      if (y === height - 1 && x === width - 1) break;

      q.push({ x: x + 1, y, dist: dist + 1 });
      q.push({ x, y: y + 1, dist: dist + 1 });
      q.push({ x: x - 1, y, dist: dist + 1 });
      q.push({ x, y: y - 1, dist: dist + 1 });
    }

    if (dists[height - 1][width - 1] === Infinity) {
      return line;
    }
  }
}
