const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let space = input.split("\n").map((x) => [...x]);
  let h = space.length;
  let w = space[0].length;

  for (let y = 0; y < h; y++) {
    let empty = true;
    for (let x = 0; x < w; x++) {
      if (space[y][x] != ".") empty = false;
    }
    if (empty) {
      space.splice(y, 0, [...".".repeat(w)]);
      y += 1;
      h += 1;
    }
  }

  for (let x = 0; x < w; x++) {
    let empty = true;
    for (let y = 0; y < h; y++) {
      if (space[y][x] != ".") empty = false;
    }
    if (empty) {
      space.forEach((r) => r.splice(x, 0, "."));
      x += 1;
      w += 1;
    }
  }

  let galaxies = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (space[y][x] == "#") {
        galaxies.push([x, y]);
      }
    }
  }

  let sum = 0;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let [x1, y1] = galaxies[i];
      let [x2, y2] = galaxies[j];
      sum += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
  }

  return sum;
}

function part2() {
  let space = input.split("\n").map((x) => [...x]);
  let h = space.length;
  let w = space[0].length;

  let emptyRows = new Array(w).fill(false);
  let emptyCols = new Array(w).fill(false);

  for (let y = 0; y < h; y++) {
    let empty = true;
    for (let x = 0; x < w; x++) {
      if (space[y][x] != ".") empty = false;
    }
    if (empty) emptyRows[y] = true;
  }

  for (let x = 0; x < w; x++) {
    let empty = true;
    for (let y = 0; y < h; y++) {
      if (space[y][x] != ".") empty = false;
    }
    if (empty) emptyCols[x] = true;
  }

  let galaxies = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (space[y][x] == "#") {
        galaxies.push([x, y]);
      }
    }
  }

  let sum = 0;
  let expansion = 1000000;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let [x1, y1] = galaxies[i];
      let [x2, y2] = galaxies[j];
      let passed = 0;

      for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
        if (emptyCols[x]) passed += 1;
      }
      for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
        if (emptyRows[y]) passed += 1;
      }
      sum += passed * (expansion - 1);
      sum += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
  }

  return sum;
}
