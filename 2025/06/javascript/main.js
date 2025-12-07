import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString();

function part1() {
  const rows = input.split("\n").map((r) => r.trim().split(/ +/));

  const columns = rows[0].map((_, i) => rows.map((x) => x[i]));

  const sum = columns
    .map((x) => x.toReversed())
    .map(([x, ...y]) => eval(y.join(x)))
    .reduce((a, c) => a + c, 0);

  return sum;
}

function part2() {
  const map = input.split("\n");
  const width = Math.max(...map.map((x) => x.length));
  const height = map.length - 1;
  const operators = map[height].trim().split(/ +/);

  let sum = 0;

  let nums = [];

  let i = 0;

  for (let x = 0; x < width; x++) {
    let curNum = "";
    let allEmpty = true;
    for (let y = 0; y < height; y++) {
      let c = map[y][x];
      if (c === " ") continue;
      curNum += c;
      allEmpty = false;
    }

    if (allEmpty) {
      if (nums.length === 0) continue;
      sum += eval(nums.join(operators[i++]));
      nums = [];
    } else {
      nums.push(curNum);
    }
  }

  sum += eval(nums.join(operators[i++]));

  return sum;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
