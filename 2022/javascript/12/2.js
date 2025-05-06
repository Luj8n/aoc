import fs from "fs";

const map = fs
  .readFileSync("12/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split(""));

function getHeight(char) {
  if (char == "S") return getHeight("a");
  if (char == "E") return getHeight("z");

  return char.charCodeAt();
}

function canGo(from, to) {
  if (to[0] >= map[0].length || to[1] >= map.length || to[0] < 0 || to[1] < 0) return false;

  const f = getHeight(map[from[1]][from[0]]);
  const t = getHeight(map[to[1]][to[0]]);

  return t - 1 <= f;
}

function findStarts() {
  const starts = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] == "S" || map[y][x] == "a") {
        starts.push([x, y]);
      }
    }
  }
  return starts;
}

function bfs() {
  const Q = [];
  const visited = new Map();

  findStarts().forEach((start) => {
    Q.push([...start, 1]);
  });

  while (Q.length > 0) {
    const [x, y, n] = Q.shift();

    const i = y * map[0].length + x;

    if (visited.has(i)) continue;
    visited.set(i, true);

    if (map[y][x] == "E") return n;

    const from = [x, y];
    {
      const to = [x + 1, y];
      if (canGo(from, to)) Q.push([...to, n + 1]);
    }
    {
      const to = [x, y + 1];
      if (canGo(from, to)) Q.push([...to, n + 1]);
    }
    {
      const to = [x - 1, y];
      if (canGo(from, to)) Q.push([...to, n + 1]);
    }
    {
      const to = [x, y - 1];
      if (canGo(from, to)) Q.push([...to, n + 1]);
    }
  }
}

console.log(bfs() - 1);
