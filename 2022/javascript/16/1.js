import fs from "fs";

const flowRates = {};
const neighbours = {};

const valves = fs
  .readFileSync("16/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => {
    const w = v.split(" ");
    const name = w[1];
    const flowRate = +w[4].slice(5, -1);
    const neighs = w.slice(9).map((n) => (n.endsWith(",") ? n.slice(0, -1) : n));

    flowRates[name] = flowRate;
    neighbours[name] = neighs;

    return name;
  });

const distances = {};

for (let i = 0; i < valves.length; i++) {
  const v = valves[i];

  distances[v] = {};

  const Q = [];
  Q.push([v, 0]);

  while (Q.length > 0) {
    const [valve, distance] = Q.shift();

    if (distances[v][valve] != null) continue;
    distances[v][valve] = distance;

    for (let j = 0; j < neighbours[valve].length; j++) {
      Q.push([neighbours[valve][j], distance + 1]);
    }
  }
}

const Q = [];
Q.push(["AA", 30, {}, 0]);

let max = 0;

while (Q.length > 0) {
  const [current, timeLeft, opened, pressure] = Q.pop();

  if (timeLeft <= 0) continue;

  if (pressure > max) {
    max = pressure;
  }

  for (let i = 0; i < valves.length; i++) {
    const other = valves[i];

    if (opened[other] || flowRates[other] == 0) continue;

    const newTime = timeLeft - distances[current][other] - 1;

    Q.push([other, newTime, { ...opened, [other]: true }, pressure + newTime * flowRates[other]]);
  }
}

console.log(max);
