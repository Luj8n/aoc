import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

function part1() {
  const TO_CONNECT = 10;
  // const TO_CONNECT = 1000;

  const junctions = input.split("\n").map((r) => r.split(",").map((x) => +x));
  const N = junctions.length;
  const edges = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const [x1, y1, z1] = junctions[i];
      const [x2, y2, z2] = junctions[j];
      const d = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

      edges.push({ from: i, to: j, distance: d });
    }
  }

  edges.sort((a, b) => a.distance - b.distance);

  const connected = Array.from({ length: N }, () => []);

  let count = 0;

  for (const { from, to } of edges) {
    if (count++ >= TO_CONNECT) break;
    connected[from].push(to);
    connected[to].push(from);
  }

  const visited = new Array(N).fill(false);

  function fill(node) {
    if (visited[node]) return 0;
    visited[node] = true;
    let sum = 1;
    for (const neighbor of connected[node]) {
      sum += fill(neighbor);
    }
    return sum;
  }

  let groupSizes = [];

  for (let i = 0; i < N; i++) {
    const size = fill(i);
    if (size !== 0) groupSizes.push(size);
  }

  groupSizes.sort((a, b) => b - a);

  return groupSizes[0] * groupSizes[1] * groupSizes[2];
}

function part2() {
  const junctions = input.split("\n").map((r) => r.split(",").map((x) => +x));
  const N = junctions.length;
  const edges = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const [x1, y1, z1] = junctions[i];
      const [x2, y2, z2] = junctions[j];
      const d = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

      edges.push({ from: i, to: j, distance: d });
    }
  }

  edges.sort((a, b) => a.distance - b.distance);

  const connected = new Array(N).fill().map((_) => new Array(N).fill(false));
  const nums = new Array(N).fill(-1);
  const aliases = {};

  function getAlias(num) {
    if (aliases[num] === undefined) return undefined;
    const v = getAlias(aliases[num]);
    if (v !== undefined) return v;
    return aliases[num];
  }

  let num = 1;

  let groups = N;

  let i = 0;
  for (const { from, to } of edges) {
    if (groups === 1) {
      const { from, to } = edges[i - 1];
      return junctions[from][0] * junctions[to][0];
    }

    i += 1;

    if (nums[from] !== -1 && nums[to] !== -1) {
      const numA = getAlias(nums[from]) ?? nums[from];
      const numB = getAlias(nums[to]) ?? nums[to];

      if (numA === numB) continue;

      aliases[numB] = numA;

      connected[from][to] = true;
      connected[to][from] = true;

      groups -= 1;
    } else if (nums[from] !== -1) {
      nums[to] = nums[from];

      connected[from][to] = true;
      connected[to][from] = true;

      groups -= 1;
    } else if (nums[to] !== -1) {
      nums[from] = nums[to];

      connected[from][to] = true;
      connected[to][from] = true;

      groups -= 1;
    } else {
      nums[from] = num;
      nums[to] = num;

      connected[from][to] = num;
      connected[to][from] = num;

      num += 1;

      groups -= 1;
    }
  }
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
