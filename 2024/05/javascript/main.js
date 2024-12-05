import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const rules = input
    .split("\n\n")[0]
    .split("\n")
    .map((x) => x.split("|").map((y) => +y));

  const updates = input
    .split("\n\n")[1]
    .split("\n")
    .map((x) => x.split(",").map((y) => +y));

  const beforeMap = {};
  const afterMap = {};

  for (const [a, b] of rules) {
    if (beforeMap[a] === undefined) beforeMap[a] = [];
    beforeMap[a].push(b);
    if (afterMap[b] === undefined) afterMap[b] = [];
    afterMap[b].push(a);
  }

  let sum = 0;

  for (const update of updates) {
    const indexMap = {};
    for (let i = 0; i < update.length; i++) {
      indexMap[update[i]] = i;
    }

    let rightOrder = true;
    for (let i = 0; i < update.length; i++) {
      const page = update[i];

      if (beforeMap[page] !== undefined) {
        for (const b of beforeMap[page]) {
          if (indexMap[b] === undefined) continue;
          if (indexMap[b] < i) {
            rightOrder = false;
            break;
          }
        }
      }

      if (afterMap[page] !== undefined) {
        for (const a of afterMap[page]) {
          if (indexMap[a] === undefined) continue;
          if (indexMap[a] > i) {
            rightOrder = false;
            break;
          }
        }
      }
    }

    if (rightOrder) {
      sum += update[(update.length - 1) / 2];
    }
  }

  return sum;
}

// Uhh. What matters is that it works.
function part2() {
  const rules = input
    .split("\n\n")[0]
    .split("\n")
    .map((x) => x.split("|").map((y) => +y));

  const updates = input
    .split("\n\n")[1]
    .split("\n")
    .map((x) => x.split(",").map((y) => +y));

  const beforeMap = {};
  const afterMap = {};

  for (const [a, b] of rules) {
    if (beforeMap[a] === undefined) beforeMap[a] = [];
    beforeMap[a].push(b);
    if (afterMap[b] === undefined) afterMap[b] = [];
    afterMap[b].push(a);
  }

  let sum = 0;

  for (const update of updates) {
    const indexMap = {};
    for (let i = 0; i < update.length; i++) {
      indexMap[update[i]] = i;
    }

    let changedOrder = false;

    while (true) {
      let changedOrderThisTime = false;
      for (let i = 0; i < update.length; i++) {
        const page = update[i];

        if (beforeMap[page] !== undefined) {
          for (const b of beforeMap[page]) {
            if (indexMap[b] === undefined) continue;
            if (indexMap[b] < i) {
              changedOrderThisTime = true;
              update[indexMap[b]] = page;
              update[i] = b;
              indexMap[page] = indexMap[b];
              indexMap[b] = i;
              break;
            }
          }
        }

        if (changedOrderThisTime) break;

        if (afterMap[page] !== undefined) {
          for (const a of afterMap[page]) {
            if (indexMap[a] === undefined) continue;
            if (indexMap[a] > i) {
              changedOrderThisTime = true;
              update[indexMap[a]] = page;
              update[i] = a;
              indexMap[page] = indexMap[a];
              indexMap[a] = i;
              break;
            }
          }
        }

        if (changedOrderThisTime) break;
      }

      if (changedOrderThisTime) {
        changedOrder = true;
      } else {
        break;
      }
    }

    if (changedOrder) {
      sum += update[(update.length - 1) / 2];
    }
  }

  return sum;
}
