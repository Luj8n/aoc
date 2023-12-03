const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let lines = input.split("\n");
  const h = lines.length;
  const w = lines[0].length;

  const empty = ".".repeat(w);

  lines = [empty, ...lines, empty].map((l) => "." + l + ".");

  let sum = 0;

  for (let y = 1; y < h + 1; y++) {
    let nearSymbol = false;
    let collectedNumber = "";

    for (let x = 1; x < w + 1; x++) {
      let near =
        lines[y - 1][x] +
        lines[y - 1][x + 1] +
        lines[y][x + 1] +
        lines[y + 1][x + 1] +
        lines[y + 1][x] +
        lines[y + 1][x - 1] +
        lines[y][x - 1] +
        lines[y - 1][x - 1];
      // lines[y - 1].slice(x - 1, x + 2) +
      // lines[y].slice(x - 1, x + 2) +
      // lines[y + 1].slice(x - 1, x + 2);

      let c = lines[y][x];

      if (/\d/.test(c)) {
        if ([...near].some((m) => /[^\d.]/.test(m))) {
          nearSymbol = true;
        }
        collectedNumber += c;
      } else {
        if (nearSymbol && collectedNumber != "") {
          sum += +collectedNumber;
        }
        nearSymbol = false;
        collectedNumber = "";
      }
    }
    if (nearSymbol && collectedNumber != "") {
      sum += +collectedNumber;
    }
  }

  return sum;
}

function part2() {
  let lines = input.split("\n");
  const h = lines.length;
  const w = lines[0].length;

  const empty = ".".repeat(w);

  lines = [empty, ...lines, empty].map((l) => "." + l + ".");

  let gears = {};

  for (let y = 1; y < h + 1; y++) {
    let collectedNumber = "";
    let stars = new Set();

    for (let x = 1; x < w + 1; x++) {
      let c = lines[y][x];

      if (/\d/.test(c)) {
        collectedNumber += c;

        if (lines[y - 1][x] == "*") stars.add(`${y - 1} ${x}`);
        if (lines[y - 1][x + 1] == "*") stars.add(`${y - 1} ${x + 1}`);
        if (lines[y][x + 1] == "*") stars.add(`${y} ${x + 1}`);
        if (lines[y + 1][x + 1] == "*") stars.add(`${y + 1} ${x + 1}`);
        if (lines[y + 1][x] == "*") stars.add(`${y + 1} ${x}`);
        if (lines[y + 1][x - 1] == "*") stars.add(`${y + 1} ${x - 1}`);
        if (lines[y][x - 1] == "*") stars.add(`${y} ${x - 1}`);
        if (lines[y - 1][x - 1] == "*") stars.add(`${y - 1} ${x - 1}`);
      } else {
        if (collectedNumber != "") {
          stars.forEach((s) => {
            if (gears[s] == undefined) gears[s] = [];
            gears[s].push(+collectedNumber);
          });
        }
        stars = new Set();
        collectedNumber = "";
      }
    }
    if (collectedNumber != "") {
      stars.forEach((s) => {
        if (gears[s] == undefined) gears[s] = [];
        gears[s].push(+collectedNumber);
      });
    }
  }

  let sum = 0;

  Object.entries(gears).forEach(([_, n]) => {
    if (n.length < 2) return 0;
    sum += n[0] * n[1];
  });

  return sum;
}
