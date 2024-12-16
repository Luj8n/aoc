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

  const mem = new Array(height)
    .fill()
    .map((_) => new Array(width).fill().map((_) => new Array(4).fill(Infinity)));

  // dir: 0, 1, 2, 3 <=> north, east, south, west
  const q = [{ x: sx, y: sy, dir: 1, dist: 0 }];

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while (q.length > 0) {
    const { x, y, dir, dist } = q.shift();
    if (map[y][x] === "#") continue;
    if (dist >= mem[y][x][dir]) continue;
    mem[y][x][dir] = dist;
    if (x === ex && y === ey) continue;

    q.push({ x: x + dx[dir], y: y + dy[dir], dir, dist: dist + 1 });
    q.push({ x, y, dir: (dir + 1) % 4, dist: dist + 1000 });
    q.push({ x, y, dir: (dir + 3) % 4, dist: dist + 1000 });
  }

  return Math.min(...mem[ey][ex]);
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

  const mem = new Array(height)
    .fill()
    .map((_) => new Array(width).fill().map((_) => new Array(4).fill(Infinity)));

  const prevs = new Array(height)
    .fill()
    .map((_) => new Array(width).fill().map((_) => new Array(4).fill().map((_) => [])));

  // dir: 0, 1, 2, 3 <=> north, east, south, west
  const q = [{ x: sx, y: sy, dir: 1, dist: 0, prev: { x: sx, y: sy, dir: 1 } }];

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while (q.length > 0) {
    const { x, y, dir, dist, prev } = q.shift();
    if (map[y][x] === "#") continue;
    if (dist > mem[y][x][dir]) continue;
    if (dist == mem[y][x][dir]) {
      prevs[y][x][dir].push({ x: prev.x, y: prev.y, dir: prev.dir });
      continue;
    }
    mem[y][x][dir] = dist;
    prevs[y][x][dir] = [{ x: prev.x, y: prev.y, dir: prev.dir }];
    if (x === ex && y === ey) continue;

    q.push({ x: x + dx[dir], y: y + dy[dir], dir, dist: dist + 1, prev: { x, y, dir } });
    q.push({ x, y, dir: (dir + 1) % 4, dist: dist + 1000, prev: { x, y, dir } });
    q.push({ x, y, dir: (dir + 3) % 4, dist: dist + 1000, prev: { x, y, dir } });
  }

  const q2 = [];

  const bestd = Math.min(...mem[ey][ex]);
  for (let i = 0; i < 4; i++) {
    if (mem[ey][ex][i] === bestd) q2.push({ x: ex, y: ey, dir: i });
  }

  const set = new Set();
  while (q2.length > 0) {
    const { x, y, dir } = q2.pop();
    set.add(x + y * width);
    if (x === sx && y === sy) continue;
    for (const p of prevs[y][x][dir]) q2.push({ x: p.x, y: p.y, dir: p.dir });
  }

  return set.size;
}
