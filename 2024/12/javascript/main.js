import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let map = input.split("\n");

  const height = map.length + 2;
  const width = map[0].length + 2;

  map = map.map((r) => "." + r + ".");
  map = [".".repeat(width), ...map, ".".repeat(width)];

  const visited = new Array(height).fill().map((_) => new Array(width).fill(false));

  function r(x, y, c) {
    if (map[y][x] !== c) return [0, 0];
    if (visited[y][x]) return [0, 0];
    visited[y][x] = true;

    let p = 4;
    if (map[y - 1][x] === c) p -= 1;
    if (map[y][x - 1] === c) p -= 1;
    if (map[y + 1][x] === c) p -= 1;
    if (map[y][x + 1] === c) p -= 1;

    let up = r(x, y - 1, c);
    let right = r(x + 1, y, c);
    let down = r(x, y + 1, c);
    let left = r(x - 1, y, c);

    return [1 + up[0] + right[0] + down[0] + left[0], p + up[1] + right[1] + down[1] + left[1]];
  }

  let price = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (visited[y][x]) continue;
      const [area, perimeter] = r(x, y, map[y][x]);
      price += area * perimeter;
    }
  }

  return price;
}

// Erm, yeah... It works :)
function part2() {
  let map = input.split("\n");

  const height = map.length + 2;
  const width = map[0].length + 2;

  map = map.map((r) => "." + r + ".");
  map = [".".repeat(width), ...map, ".".repeat(width)];

  const visited = new Array(height).fill().map((_) => new Array(width).fill(false));

  function r(x, y, c) {
    if (map[y][x] !== c) return [0, 0];
    if (visited[y][x]) return [0, 0];
    visited[y][x] = true;

    let s = 0;

    if (map[y][x - 1] !== c) {
      let topSide = false;
      let botSide = false;
      for (let tx = x; tx < width - 1; tx++) {
        if (map[y][tx] !== c) break;

        if (map[y - 1][tx] === c) {
          if (topSide) s += 1;
          topSide = false;
        } else {
          topSide = true;
        }

        if (map[y + 1][tx] === c) {
          if (botSide) s += 1;
          botSide = false;
        } else {
          botSide = true;
        }
      }

      if (topSide) s += 1;
      if (botSide) s += 1;
    }

    if (map[y - 1][x] !== c) {
      let leftSide = false;
      let rightSide = false;
      for (let yx = y; yx < height - 1; yx++) {
        if (map[yx][x] !== c) break;

        if (map[yx][x - 1] === c) {
          if (leftSide) s += 1;
          leftSide = false;
        } else {
          leftSide = true;
        }

        if (map[yx][x + 1] === c) {
          if (rightSide) s += 1;
          rightSide = false;
        } else {
          rightSide = true;
        }
      }

      if (leftSide) s += 1;
      if (rightSide) s += 1;
    }

    let up = r(x, y - 1, c);
    let right = r(x + 1, y, c);
    let down = r(x, y + 1, c);
    let left = r(x - 1, y, c);

    return [1 + up[0] + right[0] + down[0] + left[0], s + up[1] + right[1] + down[1] + left[1]];
  }

  let price = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (visited[y][x]) continue;
      const [area, sides] = r(x, y, map[y][x]);
      price += area * sides;
    }
  }

  return price;
}
