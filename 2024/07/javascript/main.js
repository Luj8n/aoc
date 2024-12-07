import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const lines = input.split("\n");

  let sum = 0;

  for (const line of lines) {
    const left = +line.split(": ")[0];
    const right = line
      .split(": ")[1]
      .split(" ")
      .map((x) => +x);

    let possible = false;

    function r(index, prev) {
      if (possible) return;
      if (index >= right.length) {
        if (prev == left) {
          possible = true;
        }
        return;
      }

      r(index + 1, prev * right[index]);
      r(index + 1, prev + right[index]);
    }

    r(1, right[0]);

    if (possible) sum += left;
  }

  return sum;
}

function part2() {
  const lines = input.split("\n");

  let sum = 0;

  for (const line of lines) {
    const left = +line.split(": ")[0];
    const right = line
      .split(": ")[1]
      .split(" ")
      .map((x) => +x);

    let possible = false;

    function r(index, prev) {
      if (possible) return;
      if (index >= right.length) {
        if (prev == left) {
          possible = true;
        }
        return;
      }

      r(index + 1, prev * right[index]);
      r(index + 1, prev + right[index]);
      r(index + 1, +`${prev}${right[index]}`);
    }

    r(1, right[0]);

    if (possible) sum += left;
  }

  return sum;
}
