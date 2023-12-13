const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let patterns = input.split("\n\n").map((p) => p.split("\n"));
  let sum = 0;
  function f(p, h, w) {
    const g = (x) => p.map((l) => l[x]).join("");

    ver: for (let x = 1; x < w; x++) {
      if (g(x - 1) == g(x)) {
        let l = x - 1;
        let r = x;
        while (l >= 0 && r < w) {
          if (g(l) != g(r)) continue ver;
          l -= 1;
          r += 1;
        }
        return x;
      }
    }

    hor: for (let y = 1; y < h; y++) {
      if (p[y - 1] == p[y]) {
        let l = y - 1;
        let r = y;
        while (l >= 0 && r < h) {
          if (p[l] != p[r]) continue hor;
          l -= 1;
          r += 1;
        }
        return 100 * y;
      }
    }
  }

  for (let p of patterns) {
    let h = p.length;
    let w = p[0].length;

    let s = f(p, h, w, -1);
    sum += s;
  }
  return sum;
}

function part2() {
  let patterns = input.split("\n\n").map((p) => p.split("\n"));
  let sum = 0;
  function f(p, h, w, n) {
    const g = (x) => p.map((l) => l[x]).join("");

    ver: for (let x = 1; x < w; x++) {
      if (g(x - 1) == g(x)) {
        let l = x - 1;
        let r = x;
        while (l >= 0 && r < w) {
          if (g(l) != g(r)) continue ver;
          l -= 1;
          r += 1;
        }
        if (x != n) return x;
      }
    }

    hor: for (let y = 1; y < h; y++) {
      if (p[y - 1] == p[y]) {
        let l = y - 1;
        let r = y;
        while (l >= 0 && r < h) {
          if (p[l] != p[r]) continue hor;
          l -= 1;
          r += 1;
        }
        if (100 * y != n) return 100 * y;
      }
    }
    return -1;
  }

  main: for (let oldP of patterns) {
    let h = oldP.length;
    let w = oldP[0].length;

    let n = f(oldP, h, w, -1);

    for (let yi = 0; yi < h; yi++) {
      for (let xi = 0; xi < w; xi++) {
        let p = oldP.map((l) => [...l]);
        p[yi][xi] = p[yi][xi] == "#" ? "." : "#";
        p = p.map((l) => l.join(""));
        let s = f(p, h, w, n);
        if (s != -1) {
          sum += s;
          continue main;
        }
      }
    }
  }
  return sum;
}
