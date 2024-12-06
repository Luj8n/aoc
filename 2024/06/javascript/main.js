import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let map = input.split("\n").map((r) => [...r]);
  const height = map.length;
  const width = map[0].length;
  let guardX, guardY;

  outer: for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === "^") {
        guardX = x;
        guardY = y;
        break outer;
      }
    }
  }

  map[guardY][guardX] = "X";

  // dir: 0, 1, 2, 3 ~ north, east, south, west
  let dir = 0;

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while (true) {
    const nx = guardX + dx[dir];
    const ny = guardY + dy[dir];

    if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
      break;
    }

    if (map[ny][nx] === "#") {
      dir = (dir + 1) % 4;
      continue;
    }
    guardX = nx;
    guardY = ny;

    map[guardY][guardX] = "X";
  }

  let count = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === "X") {
        count += 1;
      }
    }
  }

  return count;
}

function part2() {
  let map = input.split("\n").map((r) => [...r]);
  const height = map.length;
  const width = map[0].length;
  let startX, startY;

  outer: for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === "^") {
        startX = x;
        startY = y;
        break outer;
      }
    }
  }

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  let loopCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] !== ".") continue;
      map[y][x] = "#";

      const mem = map.map((r) => r.map((_) => [false, false, false, false]));

      // dir: 0, 1, 2, 3 ~ north, east, south, west
      let dir = 0;
      let curX = startX;
      let curY = startY;

      while (true) {
        if (mem[curY][curX][dir]) {
          loopCount += 1;
          break;
        }

        mem[curY][curX][dir] = true;

        const nx = curX + dx[dir];
        const ny = curY + dy[dir];

        if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
          break;
        }

        if (map[ny][nx] === "#") {
          dir = (dir + 1) % 4;
          continue;
        }
        curX = nx;
        curY = ny;
      }

      map[y][x] = ".";
    }
  }

  return loopCount;
}
