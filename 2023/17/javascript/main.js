const fs = require("fs");
const { MinPriorityQueue } = require("./queue");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let map = input.split("\n").map((l) => [...l].map(Number));
  let h = map.length;
  let w = map[0].length;

  let mem = new Array(h)
    .fill()
    .map((_) =>
      new Array(w).fill().map((_) => new Array(4).fill().map((_) => new Array(4).fill(Infinity)))
    );

  // up, right, down, left
  let q = new MinPriorityQueue((v) => v[4]);
  q.enqueue([1, 0, 1, 1, 0]);
  q.enqueue([0, 1, 2, 1, 0]);

  let min = Infinity;

  while (!q.isEmpty()) {
    let [x, y, d, t, s] = q.dequeue();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    let c = map[y][x];

    if (y == h - 1 && x == w - 1) {
      min = Math.min(s + c, min);
      continue;
    }

    if (mem[y][x][d][t] <= s + c) continue;
    mem[y][x][d][t] = s + c;

    if (t > 0) {
      let [dx, dy] = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ][d];

      q.enqueue([x + dx, y + dy, d, t - 1, s + c]);
    }

    if (d == 0 || d == 2) {
      q.enqueue([x - 1, y, 3, 2, s + c]);
      q.enqueue([x + 1, y, 1, 2, s + c]);
    } else {
      q.enqueue([x, y - 1, 0, 2, s + c]);
      q.enqueue([x, y + 1, 2, 2, s + c]);
    }
  }

  return min;
}

function part2() {
  let map = input.split("\n").map((l) => [...l].map(Number));
  let h = map.length;
  let w = map[0].length;

  let mem = new Array(h)
    .fill()
    .map((_) =>
      new Array(w).fill().map((_) => new Array(4).fill().map((_) => new Array(4).fill(Infinity)))
    );

  // up, right, down, left
  let q = new MinPriorityQueue((v) => v[4]);
  q.enqueue([1, 0, 1, 1, 0]);
  q.enqueue([0, 1, 2, 1, 0]);

  let min = Infinity;

  while (!q.isEmpty()) {
    let [x, y, d, t, s] = q.dequeue();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    let c = map[y][x];

    if (y == h - 1 && x == w - 1 && t >= 4) {
      min = Math.min(s + c, min);
      continue;
    }

    if (mem[y][x][d][t] <= s + c) continue;
    mem[y][x][d][t] = s + c;

    if (t < 10) {
      let [dx, dy] = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ][d];

      q.enqueue([x + dx, y + dy, d, t + 1, s + c]);
    }

    if (t < 4) continue;

    if (d == 0 || d == 2) {
      q.enqueue([x - 1, y, 3, 1, s + c]);
      q.enqueue([x + 1, y, 1, 1, s + c]);
    } else {
      q.enqueue([x, y - 1, 0, 1, s + c]);
      q.enqueue([x, y + 1, 2, 1, s + c]);
    }
  }

  return min;
}
