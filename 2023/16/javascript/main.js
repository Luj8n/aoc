const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let m = input.split("\n");
  let h = m.length;
  let w = m[0].length;
  // up, right, down, left
  let v = new Array(h).fill().map((_) => new Array(w).fill().map((_) => new Array(4).fill(false)));

  let q = [[0, 0, 1]];
  while (q.length > 0) {
    let [x, y, d] = q.shift();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    if (v[y][x][d]) continue;
    v[y][x][d] = true;

    let c = m[y][x];

    let [dx, dy] = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ][d];

    if (c == ".") {
      q.push([x + dx, y + dy, d]);
    } else if (c == "|") {
      if (d == 0 || d == 2) {
        q.push([x + dx, y + dy, d]);
      } else {
        q.push([x, y - 1, 0]);
        q.push([x, y + 1, 2]);
      }
    } else if (c == "-") {
      if (d == 0 || d == 2) {
        q.push([x + 1, y, 1]);
        q.push([x - 1, y, 3]);
      } else {
        q.push([x + dx, y + dy, d]);
      }
    } else if (c == "\\") {
      if (d == 0) q.push([x - 1, y, 3]);
      else if (d == 1) q.push([x, y + 1, 2]);
      else if (d == 2) q.push([x + 1, y, 1]);
      else if (d == 3) q.push([x, y - 1, 0]);
    } else if (c == "/") {
      if (d == 0) q.push([x + 1, y, 1]);
      else if (d == 1) q.push([x, y - 1, 0]);
      else if (d == 2) q.push([x - 1, y, 3]);
      else if (d == 3) q.push([x, y + 1, 2]);
    }
  }

  let energized = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (v[y][x].some((e) => e)) energized += 1;
    }
  }
  return energized;
}

function part2() {
  let m = input.split("\n");
  let h = m.length;
  let w = m[0].length;
  // up, right, down, left
  let v = new Array(h).fill().map((_) => new Array(w).fill().map((_) => new Array(4).fill(false)));
  function f(ox, oy, od) {
    let q = [[ox, oy, od]];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        for (let i = 0; i < 4; i++) v[y][x][i] = false;
      }
    }

    while (q.length > 0) {
      let [x, y, d] = q.shift();
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      if (v[y][x][d]) continue;
      v[y][x][d] = true;

      let c = m[y][x];

      let [dx, dy] = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ][d];

      if (c == ".") {
        q.push([x + dx, y + dy, d]);
      } else if (c == "|") {
        if (d == 0 || d == 2) {
          q.push([x + dx, y + dy, d]);
        } else {
          q.push([x, y - 1, 0]);
          q.push([x, y + 1, 2]);
        }
      } else if (c == "-") {
        if (d == 0 || d == 2) {
          q.push([x + 1, y, 1]);
          q.push([x - 1, y, 3]);
        } else {
          q.push([x + dx, y + dy, d]);
        }
      } else if (c == "\\") {
        if (d == 0) q.push([x - 1, y, 3]);
        else if (d == 1) q.push([x, y + 1, 2]);
        else if (d == 2) q.push([x + 1, y, 1]);
        else if (d == 3) q.push([x, y - 1, 0]);
      } else if (c == "/") {
        if (d == 0) q.push([x + 1, y, 1]);
        else if (d == 1) q.push([x, y - 1, 0]);
        else if (d == 2) q.push([x - 1, y, 3]);
        else if (d == 3) q.push([x, y + 1, 2]);
      }
    }

    let energized = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (v[y][x].some((e) => e)) energized += 1;
      }
    }
    return energized;
  }

  let max = 0;

  for (let x = 0; x < w; x++) {
    max = Math.max(max, f(x, 0, 2));
    max = Math.max(max, f(x, h - 1, 0));
  }

  for (let y = 0; y < h; y++) {
    max = Math.max(max, f(0, y, 1));
    max = Math.max(max, f(w - 1, y, 3));
  }

  return max;
}
