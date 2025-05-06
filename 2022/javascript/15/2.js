import fs from "fs";

const max = 4000000;

function distance(p1, p2) {
  // |x1 - x2| + |y1 - y2|
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

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

    return [sensor, beacon, distance(sensor, beacon)];
  });

main: for (let y = 0; y <= max; y++) {
  const intervals = pairs
    .map(([sensor, _, d]) => {
      // d = |x1 - x2| + |y1 - y2| =>
      // |x1 - x2| = d - |y1 - y2| =>
      // x1 - x2 = +-(d - |y1 - y2|) =>
      // x1 = +-(d - |y1 - y2|) + x2

      const left = -(d - Math.abs(y - sensor[1])) + sensor[0];
      const right = d - Math.abs(y - sensor[1]) + sensor[0];

      if (left > right) return null;
      return [left, right];
    })
    .filter((x) => x);

  if (intervals.length == 0) continue;

  intervals.sort((a, b) => a[0] - b[0]);

  let maxRight = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [left, right] = intervals[i];

    const x = left - 1;

    if (x > maxRight && x >= 0 && x <= max) {
      console.log(x * 4000000 + y);
    }

    if (right > maxRight) maxRight = right;
  }
}
