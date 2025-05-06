import fs from "fs";

// FYI, takes minutes (around 4) to calculate (although the test case is instant)

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
Q.push(["AA", "AA", 26, 26, {}, 0]);

let max = 0;

while (Q.length > 0) {
  const [me, elephant, myTime, elephantsTime, opened, pressure] = Q.pop();

  if (myTime <= 0 || elephantsTime <= 0) continue;

  if (pressure > max) {
    console.log(pressure, myTime, elephantsTime); // to see the progress
    max = pressure;
  }

  if (myTime > elephantsTime) {
    // i move
    for (let i = 0; i < valves.length; i++) {
      const other = valves[i];

      if (
        opened[other] ||
        flowRates[other] == 0 ||
        distances[me][other] > distances[elephant][other]
      )
        continue;

      const myNewTime = myTime - distances[me][other] - 1;

      Q.push([
        other,
        elephant,
        myNewTime,
        elephantsTime,
        { ...opened, [other]: true },
        pressure + myNewTime * flowRates[other],
      ]);
    }
  } else {
    // elephant moves
    for (let i = 0; i < valves.length; i++) {
      const other = valves[i];

      if (
        opened[other] ||
        flowRates[other] == 0 ||
        distances[elephant][other] > distances[me][other]
      )
        continue;

      const newElephantsTime = elephantsTime - distances[elephant][other] - 1;

      Q.push([
        me,
        other,
        myTime,
        newElephantsTime,
        { ...opened, [other]: true },
        pressure + newElephantsTime * flowRates[other],
      ]);
    }
  }
}

console.log(max);
