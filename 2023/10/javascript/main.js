const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let map = input.split("\n").map((l) => [...l]);
  let h = map.length;
  let w = map[0].length;

  let start;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] == "S") {
        start = [x, y];
      }
    }
  }

  let dists = new Array(h).fill().map((_) => new Array(w).fill(-1));

  let q = [];
  q.push([start[0], start[1], 0]);

  while (q.length > 0) {
    let [x, y, d] = q.shift();
    if (dists[y][x] == -1 || d < dists[y][x]) {
      dists[y][x] = d;
    } else {
      continue;
    }

    let neighs = [];
    let v = map[y][x];
    if (y > 0 && (v == "S" || v == "|" || v == "L" || v == "J")) {
      let c = map[y - 1][x];
      if (c == "|" || c == "7" || c == "F") neighs.push([x, y - 1]);
    }
    if (x < w - 1 && (v == "S" || v == "-" || v == "L" || v == "F")) {
      let c = map[y][x + 1];
      if (c == "-" || c == "J" || c == "7") neighs.push([x + 1, y]);
    }
    if (y < h - 1 && (v == "S" || v == "|" || v == "7" || v == "F")) {
      let c = map[y + 1][x];
      if (c == "|" || c == "L" || c == "J") neighs.push([x, y + 1]);
    }
    if (x > 0 && (v == "S" || v == "-" || v == "J" || v == "7")) {
      let c = map[y][x - 1];
      if (c == "-" || c == "L" || c == "F") neighs.push([x - 1, y]);
    }

    for (let n of neighs) {
      q.push([n[0], n[1], d + 1]);
    }
  }

  let max = -1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (dists[y][x] > max) {
        max = dists[y][x];
      }
    }
  }
  return max;
}

function part2() {
  let map = input.split("\n").map((l) => [...l]);
  let h = map.length;
  let w = map[0].length;

  let start;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] == "S") {
        start = [x, y];
      }
    }
  }

  let dists = new Array(h).fill().map((_) => new Array(w).fill(-1));

  let q = [];
  q.push([start[0], start[1], 0]);

  while (q.length > 0) {
    let [x, y, d] = q.shift();
    if (dists[y][x] == -1 || d < dists[y][x]) {
      dists[y][x] = d;
    } else {
      continue;
    }

    let possibleS = ["|", "-", "L", "J", "7", "F"];
    let neighs = [];
    let v = map[y][x];
    if (y > 0 && (v == "S" || v == "|" || v == "L" || v == "J")) {
      let c = map[y - 1][x];
      if (c == "|" || c == "7" || c == "F") {
        neighs.push([x, y - 1]);
        if (v == "S") possibleS = possibleS.filter((x) => x == "|" || x == "L" || x == "J");
      }
    }
    if (x < w - 1 && (v == "S" || v == "-" || v == "L" || v == "F")) {
      let c = map[y][x + 1];
      if (c == "-" || c == "J" || c == "7") {
        neighs.push([x + 1, y]);
        if (v == "S") possibleS = possibleS.filter((x) => x == "-" || x == "L" || x == "F");
      }
    }
    if (y < h - 1 && (v == "S" || v == "|" || v == "7" || v == "F")) {
      let c = map[y + 1][x];
      if (c == "|" || c == "L" || c == "J") {
        neighs.push([x, y + 1]);
        if (v == "S") possibleS = possibleS.filter((x) => x == "|" || x == "7" || x == "F");
      }
    }
    if (x > 0 && (v == "S" || v == "-" || v == "J" || v == "7")) {
      let c = map[y][x - 1];
      if (c == "-" || c == "L" || c == "F") {
        neighs.push([x - 1, y]);
        if (v == "S") possibleS = possibleS.filter((x) => x == "-" || x == "J" || x == "7");
      }
    }
    if (v == "S") map[y][x] = possibleS[0];
    for (let n of neighs) {
      q.push([n[0], n[1], d + 1]);
    }
  }

  let cleanMap = new Array(h).fill().map((_) => new Array(w).fill("."));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (dists[y][x] > -1) {
        cleanMap[y][x] = map[y][x];
      }
    }
  }

  let sum = 0;
  for (let y = 0; y < h; y++) {
    let c = 0;
    for (let x = 0; x < w; x++) {
      let v = cleanMap[y][x];
      if (v == "|" || v == "L" || v == "J") c += 1;
      if (v == "." && c % 2 == 1) {
        cleanMap[y][x] = "@";
        sum += 1;
      }
    }
  }
  // console.log(cleanMap.map((x) => x.join("")).join("\n"));
  return sum;
}
