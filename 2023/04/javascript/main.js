const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  return input.split("\n").reduce((a, c) => {
    let l = c
      .split(": ")[1]
      .split(" | ")
      .map((x) => x.trim().split(/ +/).map(Number));

    let w = new Set(l[0]);

    let p = l[1].filter((n) => w.has(n)).length;
    if (p == 0) return a;
    return a + 2 ** (p - 1);
  }, 0);
}

function part2() {
  let cards = input.split("\n").map((c) => {
    let l = c
      .split(": ")[1]
      .split(" | ")
      .map((x) => x.trim().split(/ +/).map(Number));

    let w = new Set(l[0]);

    let p = l[1].filter((n) => w.has(n)).length;
    return p;
  });

  let values = new Array(cards.length).fill(1);

  for (let i = 0; i < cards.length; i++) {
    let c = cards[i];
    let m = values[i];
    for (let di = 1; di <= c; di++) {
      values[i + di] += m;
    }
  }

  let sum = values.reduce((a, c) => a + c, 0);
  return sum;
}
