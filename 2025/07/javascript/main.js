import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

function part1() {
  const map = input.split("\n").map((r) => r.split(""));

  const H = map.length;
  const W = map[0].length;

  const startY = map.findIndex((r) => r.includes("S"));
  const startX = map[startY].findIndex((x) => x === "S");

  const visited = map.map((r) => r.map((_) => false));

  function r(x, y) {
    if (y === H - 1) return 0;
    if (visited[y][x]) return 0;
    visited[y][x] = true;
    const c = map[y][x];
    if (c === ".") return r(x, y + 1);
    else {
      return 1 + r(x - 1, y) + r(x + 1, y);
    }
  }

  return r(startX, startY);
}

function part2() {
  const map = input.split("\n").map((r) => r.split(""));

  const H = map.length;
  const W = map[0].length;

  const startY = map.findIndex((r) => r.includes("S"));
  const startX = map[startY].findIndex((x) => x === "S");

  const paths = map.map((r) => r.map((_) => undefined));

  function r(x, y) {
    if (y === H - 1) return 1;
    if (paths[y][x] !== undefined) return paths[y][x];
    const c = map[y][x];
    if (c === ".") {
      const v = r(x, y + 1);
      paths[y][x] = v;
      return v;
    } else {
      const v = r(x - 1, y) + r(x + 1, y);
      paths[y][x] = v;
      return v;
    }
  }

  return r(startX, startY);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
