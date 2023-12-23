const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
// part 2 in rust

function part1() {
  let map = input.split("\n");
  let h = map.length;
  let w = map[0].length;

  let startX = 1;
  let startY = 0;
  let endX = w - 2;
  let endY = h - 1;

  let distances = new Array(h).fill().map(() => new Array(w).fill(-1));

  let q = [[startX, startY, 0, new Set()]];

  while (q.length > 0) {
    let [x, y, d, v] = q.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    let c = map[y][x];
    if (c == "#") continue;
    let i = y * w + x;
    if (v.has(i)) continue;

    // i actually don't know why this works but it makes it a little faster.
    // for part 2, it doesn't work.
    if (d <= distances[y][x]) continue;
    distances[y][x] = d;

    if (x == endX && y == endY) continue;

    v.add(i);
    if (c == "^") q.push([x, y - 1, d + 1, v]);
    else if (c == ">") q.push([x + 1, y, d + 1, v]);
    else if (c == "v") q.push([x, y + 1, d + 1, v]);
    else if (c == "<") q.push([x - 1, y, d + 1, v]);
    else {
      q.push([x, y - 1, d + 1, new Set(v)]);
      q.push([x + 1, y, d + 1, new Set(v)]);
      q.push([x, y + 1, d + 1, new Set(v)]);
      q.push([x - 1, y, d + 1, new Set(v)]);
    }
  }

  return distances[endY][endX];
}
