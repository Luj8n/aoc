const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let m = input.split("\n").map((r) => [...r]);
  let h = m.length;
  let w = m[0].length;
  let l = 0;
  for (let x = 0; x < w; x++) {
    let f = 0;
    for (let y = 0; y < h; y++) {
      if (m[y][x] == "#") {
        f = y + 1;
      } else if (m[y][x] == "O") {
        if (f == y) {
          f += 1;
          l += h - y;
          continue;
        }
        m[y][x] = ".";
        m[f][x] = "O";
        l += h - f;
        f += 1;
      }
    }
  }
  return l;
}

function part2() {
  let m = input.split("\n").map((r) => [...r]);
  let h = m.length;
  let w = m[0].length;

  function north() {
    for (let x = 0; x < w; x++) {
      let f = 0;
      for (let y = 0; y < h; y++) {
        if (m[y][x] == "#") {
          f = y + 1;
        } else if (m[y][x] == "O") {
          if (f == y) {
            f += 1;
            continue;
          }
          m[y][x] = ".";
          m[f][x] = "O";
          f += 1;
        }
      }
    }
  }

  function west() {
    for (let y = 0; y < h; y++) {
      let f = 0;
      for (let x = 0; x < w; x++) {
        if (m[y][x] == "#") {
          f = x + 1;
        } else if (m[y][x] == "O") {
          if (f == x) {
            f += 1;
            continue;
          }
          m[y][x] = ".";
          m[y][f] = "O";
          f += 1;
        }
      }
    }
  }

  function south() {
    for (let x = 0; x < w; x++) {
      let f = h - 1;
      for (let y = h - 1; y >= 0; y--) {
        if (m[y][x] == "#") {
          f = y - 1;
        } else if (m[y][x] == "O") {
          if (f == y) {
            f -= 1;
            continue;
          }
          m[y][x] = ".";
          m[f][x] = "O";
          f -= 1;
        }
      }
    }
  }

  function east() {
    for (let y = 0; y < h; y++) {
      let f = w - 1;
      for (let x = w - 1; x >= 0; x--) {
        if (m[y][x] == "#") {
          f = x - 1;
        } else if (m[y][x] == "O") {
          if (f == x) {
            f -= 1;
            continue;
          }
          m[y][x] = ".";
          m[y][f] = "O";
          f -= 1;
        }
      }
    }
  }

  function hash() {
    let s = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (m[y][x] == "O") s += 990559 * x * y;
        else if (m[y][x] == "#") s += 989279 * x * y;
        else if (m[y][x] == ".") s += 985799 * x * y;
      }
    }
    return s;
  }

  let o = {};
  let t = 1000000000;
  let s = false;
  for (let i = 0; i < t; i++) {
    north();
    west();
    south();
    east();

    if (s) continue;

    let n = hash();
    if (o[n] != undefined) {
      let c = i - o[n];
      i += ~~((t - i) / c) * c;
      s = true;
    }
    o[n] = i;
  }

  let l = 0;
  for (let y = 0; y < h; y++) {
    let s = h - y;
    for (let x = 0; x < w; x++) {
      if (m[y][x] == "O") l += s;
    }
  }
  return l;
}
