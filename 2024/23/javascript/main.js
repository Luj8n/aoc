import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const graph = {};

  for (const line of input.split("\n")) {
    const [a, b] = line.split("-");
    if (graph[a] === undefined) graph[a] = [];
    if (graph[b] === undefined) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  let count = 0;
  for (const a in graph) {
    const vs = graph[a];
    for (let i = 0; i < vs.length; i++) {
      const b = vs[i];
      for (let j = i + 1; j < vs.length; j++) {
        const c = vs[j];
        if (graph[b].includes(c) && (a[0] === "t" || b[0] === "t" || c[0] === "t")) {
          count += 1;
        }
      }
    }
  }

  return count / 3;
}

function part2() {
  const graph = {};

  for (const line of input.split("\n")) {
    const [a, b] = line.split("-");
    if (graph[a] === undefined) graph[a] = new Set();
    if (graph[b] === undefined) graph[b] = new Set();
    graph[a].add(b);
    graph[b].add(a);
  }

  function canAdd(connected, vertex) {
    for (const v of connected) {
      if (!graph[v].has(vertex)) return false;
    }
    return true;
  }

  function maximal(vertex) {
    const connected = [vertex];
    for (const v in graph) {
      if (v === vertex) continue;
      if (canAdd(connected, v)) {
        connected.push(v);
      }
    }
    return connected;
  }

  let maxSize = 0;
  let maxResult = [];

  for (const v in graph) {
    const result = maximal(v);
    if (result.length > maxSize) {
      maxSize = result.length;
      maxResult = result;
    }
  }

  maxResult.sort();
  return maxResult.join(",");
}
