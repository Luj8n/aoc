import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

function part1() {
  const rows = input.split("\n");

  const graph = {};

  for (const row of rows) {
    const [input, ...outputs] = row.replace(":", "").split(" ");
    graph[input] = outputs;
  }

  const start = "you";
  const end = "out";

  if (graph[start] === undefined) {
    return "Invalid input (part 1 and 2 are different)";
  }

  const counts = {};

  function r(node) {
    if (node === end) return 1;
    if (counts[node] !== undefined) return counts[node];
    const sum = graph[node].reduce((a, c) => a + r(c), 0);
    counts[node] = sum;
    return sum;
  }

  return r(start);
}

function part2() {
  const rows = input.split("\n");

  const graph = {};

  for (const row of rows) {
    const [input, ...outputs] = row.replace(":", "").split(" ");
    graph[input] = outputs;
  }

  function paths(from, to) {
    if (graph[from] === undefined) {
      return 0;
    }

    const counts = {};

    function r(node) {
      if (node === to) return 1;
      if (graph[node] === undefined) return 0;
      if (counts[node] !== undefined) return counts[node];
      const sum = graph[node].reduce((a, c) => a + r(c), 0);
      counts[node] = sum;
      return sum;
    }

    return r(from);
  }

  const start = "svr";
  const end = "out";
  const a = "fft";
  const b = "dac";

  const choiceA = paths(start, a) * paths(a, b) * paths(b, end);
  const choiceB = paths(start, b) * paths(b, a) * paths(a, end);

  return Math.max(choiceA, choiceB);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
