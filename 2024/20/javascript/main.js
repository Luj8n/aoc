import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const map = input.split("\n");
  const height = map.length;
  const width = map[0].length;

  let sx, sy, ex, ey;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === "S") {
        sx = x;
        sy = y;
      }
      if (map[y][x] === "E") {
        ex = x;
        ey = y;
      }
    }
  }

  const dists = new Array(height).fill().map((_) => new Array(width).fill(Infinity));

  const q = [{ x: sx, y: sy, dist: 0 }];

  while (q.length > 0) {
    const { x, y, dist } = q.shift();
    if (map[y][x] === "#") continue;
    if (dist >= dists[y][x]) continue;
    dists[y][x] = dist;
    if (x === ex && y === ey) continue;

    q.push({ x: x + 1, y, dist: dist + 1 });
    q.push({ x, y: y + 1, dist: dist + 1 });
    q.push({ x: x - 1, y, dist: dist + 1 });
    q.push({ x, y: y - 1, dist: dist + 1 });
  }

  q.push({ x: sx, y: sy, dist: 0, cheat: false });

  let cheats = 0;

  while (q.length > 0) {
    const { x, y, dist, cheat } = q.shift();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (map[y][x] === "#") continue;
    if (cheat) {
      if (dist >= dists[y][x]) continue;

      if (dists[y][x] - dist >= 100) cheats += 1; // For example input remove this if statement
      continue;
    }
    if (dist > dists[y][x]) continue;

    q.push({ x: x + 2, y, dist: dist + 2, cheat: true });
    q.push({ x: x - 2, y, dist: dist + 2, cheat: true });
    q.push({ x, y: y + 2, dist: dist + 2, cheat: true });
    q.push({ x, y: y - 2, dist: dist + 2, cheat: true });

    q.push({ x: x + 1, y, dist: dist + 1, cheat: false });
    q.push({ x, y: y + 1, dist: dist + 1, cheat: false });
    q.push({ x: x - 1, y, dist: dist + 1, cheat: false });
    q.push({ x, y: y - 1, dist: dist + 1, cheat: false });
  }

  return cheats;
}

function part2() {
  const map = input.split("\n");
  const height = map.length;
  const width = map[0].length;

  let sx, sy, ex, ey;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === "S") {
        sx = x;
        sy = y;
      }
      if (map[y][x] === "E") {
        ex = x;
        ey = y;
      }
    }
  }

  const dists = new Array(height).fill().map((_) => new Array(width).fill(Infinity));

  const q = [{ x: sx, y: sy, dist: 0 }];

  while (q.length > 0) {
    const { x, y, dist } = q.shift();
    if (map[y][x] === "#") continue;
    if (dist >= dists[y][x]) continue;
    dists[y][x] = dist;
    if (x === ex && y === ey) continue;

    q.push({ x: x + 1, y, dist: dist + 1 });
    q.push({ x, y: y + 1, dist: dist + 1 });
    q.push({ x: x - 1, y, dist: dist + 1 });
    q.push({ x, y: y - 1, dist: dist + 1 });
  }

  q.push({ x: sx, y: sy, dist: 0, cheat: false });

  let cheats = 0;

  while (q.length > 0) {
    const { x, y, dist, cheat } = q.shift();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (map[y][x] === "#") continue;
    if (cheat) {
      if (dist >= dists[y][x]) continue;

      if (dists[y][x] - dist >= 100) cheats += 1; // For example input remove this if statement
      continue;
    }
    if (dist > dists[y][x]) continue;

    for (let dy = -20; dy <= 20; dy++) {
      for (let dx = -20; dx <= 20; dx++) {
        const d = Math.abs(dy) + Math.abs(dx);
        if (d > 20) continue;
        q.push({ x: x + dx, y: y + dy, dist: dist + d, cheat: true });
      }
    }

    q.push({ x: x + 1, y, dist: dist + 1, cheat: false });
    q.push({ x, y: y + 1, dist: dist + 1, cheat: false });
    q.push({ x: x - 1, y, dist: dist + 1, cheat: false });
    q.push({ x, y: y - 1, dist: dist + 1, cheat: false });
  }

  return cheats;
}
