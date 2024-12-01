import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const leftList = [];
  const rightList = [];

  for (const line of input.split("\n")) {
    const [left, right] = line.trim().split(/\s+/);
    leftList.push(+left);
    rightList.push(+right);
  }

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let distance = 0;

  for (let i = 0; i < leftList.length; i++) {
    distance += Math.abs(leftList[i] - rightList[i]);
  }
  return distance;
}

function part2() {
  const leftList = [];
  const rightCounter = {};

  for (const line of input.split("\n")) {
    const [left, right] = line.trim().split(/\s+/);
    leftList.push(+left);
    rightCounter[right] = (rightCounter[right] ?? 0) + 1;
  }

  let similarity = 0;

  for (const left of leftList) {
    similarity += left * (rightCounter[left] ?? 0);
  }

  return similarity;
}
