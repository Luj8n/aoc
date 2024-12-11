import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let nums = input.split(" ").map((x) => +x);

  const blinks = 25;

  for (let i = 0; i < blinks; i++) {
    let newNums = [];

    for (const n of nums) {
      if (n === 0) newNums.push(1);
      else {
        let s = n.toString();
        if (s.length % 2 == 0) {
          newNums.push(+s.slice(0, s.length / 2));
          newNums.push(+s.slice(s.length / 2));
        } else {
          newNums.push(n * 2024);
        }
      }
    }

    nums = newNums;
  }

  return nums.length;
}

function part2() {
  const nums = input.split(" ").map((x) => +x);
  let h = {};
  for (const n of nums) {
    h[n] = (h[n] ?? 0) + 1;
  }

  const blinks = 75;

  for (let i = 0; i < blinks; i++) {
    let nh = {};

    for (let n in h) {
      n = +n;
      const c = h[n];
      if (c === 0) continue;
      if (n === 0) {
        if (nh[1] === undefined) nh[1] = 0;
        nh[1] += c;
      } else {
        let s = n.toString();
        if (s.length % 2 == 0) {
          const n1 = +s.slice(0, s.length / 2);
          const n2 = +s.slice(s.length / 2);

          if (nh[n1] === undefined) nh[n1] = 0;
          if (nh[n2] === undefined) nh[n2] = 0;

          nh[n1] += c;
          nh[n2] += c;
        } else {
          const nn = 2024 * n;
          if (nh[nn] === undefined) nh[nn] = 0;
          nh[nn] += c;
        }
      }
    }

    h = nh;
  }

  let sum = 0;

  for (const n in h) sum += h[n];

  return sum;
}
