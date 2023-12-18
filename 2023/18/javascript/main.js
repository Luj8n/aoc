const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let plan = input.split("\n");
  let terrain = new Set();
  let x = 1000;
  let y = 1000;
  let N = 100000;

  let xMax = x;
  let xMin = x;
  let yMin = y;
  let yMax = y;

  terrain.add(y * N + x);
  for (let dig of plan) {
    let [direction, distance, _] = dig.split(" ");
    let dx, dy;
    if (direction == "U") {
      dx = 0;
      dy = -1;
    } else if (direction == "R") {
      dx = 1;
      dy = 0;
    } else if (direction == "D") {
      dx = 0;
      dy = 1;
    } else if (direction == "L") {
      dx = -1;
      dy = 0;
    }
    distance = +distance;
    for (let i = 0; i < distance; i++) {
      x += dx;
      y += dy;
      terrain.add(y * N + x);
    }

    if (x > xMax) xMax = x;
    if (x < xMin) xMin = x;
    if (y > yMax) yMax = y;
    if (y < yMin) yMin = y;
  }

  let inside = 0;

  for (let y = yMin; y < yMax; y++) {
    let counter = 0;
    for (let x = xMin; x < xMax; x++) {
      let isHole = terrain.has(y * N + x);
      if (isHole && terrain.has((y + 1) * N + x)) counter += 1;
      if (!isHole && counter % 2 == 1) inside += 1;
    }
  }

  return inside + terrain.size;
}

function part2() {
  let plan = input.split("\n");

  let x = 0;
  let y = 0;

  let corners = [[x, y]];

  let b = 0;

  for (let dig of plan) {
    let hex = dig.split(" ")[2].slice(2, -1);
    let distance = parseInt(hex.slice(0, -1), 16);
    let direction = +hex.slice(-1);
    let [dx, dy] = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ][direction];

    b += distance;

    x += dx * distance;
    y += dy * distance;

    corners.push([x, y]);
  }

  let a = 0;

  for (let i = 0; i < corners.length - 1; i++) {
    let x1 = corners[i][0];
    let y1 = corners[i][1];
    let x2 = corners[i + 1][0];
    let y2 = corners[i + 1][1];

    a += (y1 + y2) * (x1 - x2);
  }

  let i = Math.abs(a / 2) - b / 2 + 1;

  return b + i;
}
