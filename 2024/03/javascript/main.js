import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

  let sum = 0;
  for (const match of matches) {
    sum += +match[1] * +match[2];
  }

  return sum;
}

// Bit of a mess, but it works
function part2() {
  const muls = Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g));
  const more = Array.from(input.matchAll(/do\(\)|don't\(\)/g));

  let sum = 0;
  let mulI = 0;
  let prev = "do()";

  for (const ins of more) {
    while (muls[mulI].index < ins.index) {
      if (prev === "do()") {
        sum += +muls[mulI][1] * +muls[mulI][2];
      }
      mulI += 1;
    }
    prev = ins[0];
  }

  if (prev === "do()") {
    for (let i = mulI; i < muls.length; i++) {
      sum += +muls[i][1] * +muls[i][2];
    }
  }

  return sum;
}
