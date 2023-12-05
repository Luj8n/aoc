const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let things = input.split("\n\n");
  let seeds = things[0].split(": ")[1].split(" ").map(Number);

  things.slice(1).forEach((l) => {
    let maps = l
      .split("\n")
      .slice(1)
      .map((x) => x.split(" ").map(Number));

    let mapped = new Array(seeds.length).fill(false);
    for (let map of maps) {
      for (let i = 0; i < seeds.length; i++) {
        if (mapped[i]) continue;
        if (seeds[i] >= map[1] && seeds[i] < map[1] + map[2]) {
          seeds[i] += map[0] - map[1];
          mapped[i] = true;
        }
      }
    }
  });

  return Math.min(...seeds);
}

function part2() {
  let things = input.split("\n\n");
  let ranges = things[0]
    .split(": ")[1]
    .match(/\d+ \d+/g)
    .map((x) => {
      let [l, d] = x.split(" ").map(Number);
      return [l, l + d - 1];
    });

  things.slice(1).forEach((l) => {
    let maps = l
      .split("\n")
      .slice(1)
      .map((x) => x.split(" ").map(Number));

    let newRanges = [];

    for (let m of maps) {
      let ml = m[1];
      let mr = m[1] + m[2] - 1;

      for (let i = 0; i < ranges.length; i++) {
        let r = ranges[i];

        if (r == undefined) continue;
        if (r[1] < ml) continue;
        if (mr < r[0]) continue;

        if (r[0] < ml) {
          ranges.push([r[0], ml - 1]);
          r[0] = ml;
        }

        if (r[1] > mr) {
          ranges.push([mr + 1, r[1]]);
          r[1] = mr;
        }

        r[0] += m[0] - m[1];
        r[1] += m[0] - m[1];

        ranges[i] = undefined;
        newRanges.push(r);
      }
    }

    for (let range of ranges) {
      if (range != undefined) newRanges.push(range);
    }
    ranges = newRanges;
  });
  return Math.min(...ranges.map((r) => r[0]));
}
