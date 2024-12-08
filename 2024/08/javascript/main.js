import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const coords = {};

  const map = input.split("\n");
  const height = map.length;
  const width = map[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const c = map[y][x];
      if (c === ".") continue;
      if (coords[c] === undefined) coords[c] = [];
      coords[c].push([x, y]);
    }
  }

  const antinodes = map.map((x) => new Array(width).fill(false));

  for (const key in coords) {
    const cs = coords[key];

    for (let i = 0; i < cs.length; i++) {
      for (let j = 0; j < cs.length; j++) {
        if (i === j) continue;
        const dx = cs[j][0] - cs[i][0];
        const dy = cs[j][1] - cs[i][1];

        const nx = cs[j][0] + dx;
        const ny = cs[j][1] + dy;

        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;

        antinodes[ny][nx] = true;
      }
    }
  }

  let count = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (antinodes[y][x]) count += 1;
    }
  }

  return count;
}

function part2() {
  const coords = {};

  const map = input.split("\n");
  const height = map.length;
  const width = map[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const c = map[y][x];
      if (c === ".") continue;
      if (coords[c] === undefined) coords[c] = [];
      coords[c].push([x, y]);
    }
  }

  const antinodes = map.map((x) => new Array(width).fill(false));

  for (const key in coords) {
    const cs = coords[key];

    for (let i = 0; i < cs.length; i++) {
      for (let j = 0; j < cs.length; j++) {
        if (i === j) continue;
        const dx = cs[j][0] - cs[i][0];
        const dy = cs[j][1] - cs[i][1];

        for (let k = 0; true; k++) {
          const nx = cs[j][0] + k * dx;
          const ny = cs[j][1] + k * dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) break;

          antinodes[ny][nx] = true;
        }
      }
    }
  }

  let count = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (antinodes[y][x]) count += 1;
    }
  }

  return count;
}
