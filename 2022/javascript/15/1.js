import fs from "fs";

const y = 2000000;

function distance(p1, p2) {
  // |x1 - x2| + |y1 - y2|
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

let leftest = null;
let righest = null;

const pairs = fs
  .readFileSync("15/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((p) => {
    const r = /x=(-?\d+).+?y=(-?\d+)/g;
    const sensor = r
      .exec(p)
      .slice(1, 3)
      .map((x) => +x);
    const beacon = r
      .exec(p)
      .slice(1, 3)
      .map((x) => +x);

    const dist = distance(sensor, beacon);

    let left = sensor[0] - dist;
    let right = sensor[1] + dist;

    if (leftest == null || left < leftest) leftest = left;
    if (righest == null || right > righest) righest = right;

    return [sensor, beacon, dist];
  });

let count = 0;

for (let x = leftest; x <= righest; x++) {
  if (pairs.some(([_1, beacon, _2]) => beacon[0] == x && beacon[1] == y)) continue;

  if (pairs.some(([sensor, _, dist]) => distance(sensor, [x, y]) <= dist)) count += 1;
}

console.log(count);
