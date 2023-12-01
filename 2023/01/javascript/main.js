const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  return input
    .split("\n")
    .map((x) => [...x].map(Number).filter((c) => !isNaN(c)))
    .map((x) => {
      let f = x[0];
      let l = x[x.length - 1];
      return f * 10 + l;
    })
    .reduce((a, c) => a + c, 0);
}

function part2() {
  const nums = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  return input
    .split("\n")
    .map((line) => {
      let first = nums.map((n, i) => [line.indexOf(n), i]).filter((x) => x[0] != -1);
      first.sort((a, b) => a[0] - b[0]);
      let last = nums.map((n, i) => [line.lastIndexOf(n), i]).filter((x) => x[0] != -1);
      last.sort((a, b) => b[0] - a[0]);
      let f = (first[0][1] % 9) + 1;
      let l = (last[0][1] % 9) + 1;
      return f * 10 + l;
    })
    .reduce((a, c) => a + c, 0);
}
