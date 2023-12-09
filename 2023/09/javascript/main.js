const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  return input.split("\n").reduce((a, l) => {
    let nums = [l.split(" ").map(Number)];
    let sum = 0;
    while (nums.at(-1).some((x) => x != 0)) {
      let last = nums.at(-1);
      sum += last.at(-1);
      let diff = [];
      for (let i = 1; i < last.length; i++) {
        diff.push(last[i] - last[i - 1]);
      }
      nums.push(diff);
    }
    return a + sum;
  }, 0);
}

function part2() {
  return input.split("\n").reduce((a, l) => {
    let nums = [l.split(" ").map(Number)];
    let sum = 0;
    while (nums.at(-1).some((x) => x != 0)) {
      let last = nums.at(-1);
      sum += nums.length % 2 < 1 ? -last[0] : last[0];
      let diff = [];
      for (let i = 1; i < last.length; i++) {
        diff.push(last[i] - last[i - 1]);
      }
      nums.push(diff);
    }
    return a + sum;
  }, 0);
}
