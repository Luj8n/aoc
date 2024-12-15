import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const map = input
    .split("\n\n")[0]
    .split("\n")
    .map((r) => [...r]);

  const height = map.length;
  const width = map[0].length;

  let rx, ry;

  outer: for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (map[y][x] === "@") {
        rx = x;
        ry = y;
        break outer;
      }
    }
  }

  for (const move of input.split("\n\n")[1]) {
    let dx = 0;
    let dy = 0;
    if (move === "^") dy = -1;
    else if (move === ">") dx = 1;
    else if (move === "v") dy = 1;
    else if (move === "<") dx = -1;
    else continue;

    for (let i = 1; ; i++) {
      let x = rx + i * dx;
      let y = ry + i * dy;

      if (map[y][x] === "#") break;
      if (map[y][x] === ".") {
        if (map[y - dy][x - dx] === "O") {
          map[y][x] = "O";
        }

        map[ry][rx] = ".";
        ry += dy;
        rx += dx;
        map[ry][rx] = "@";

        break;
      }
    }
  }

  let sum = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (map[y][x] === "O") {
        sum += y * 100 + x;
      }
    }
  }

  return sum;
}

function part2() {
  const map = input
    .split("\n\n")[0]
    .split("\n")
    .map((r) =>
      [...r].flatMap((c) => {
        if (c === "#") return ["#", "#"];
        if (c === "O") return ["[", "]"];
        if (c === ".") return [".", "."];
        if (c === "@") return ["@", "."];
      })
    );

  const height = map.length;
  const width = map[0].length;

  let rx, ry;

  outer: for (let y = 1; y < height - 1; y++) {
    for (let x = 2; x < width - 2; x++) {
      if (map[y][x] === "@") {
        rx = x;
        ry = y;
        break outer;
      }
    }
  }

  function canPushUp(x, y) {
    if (map[y][x] === "#") return false;
    if (map[y][x] === ".") return true;

    if (map[y][x] === "[") {
      return canPushUp(x, y - 1) && canPushUp(x + 1, y - 1);
    }
    if (map[y][x] === "]") {
      return canPushUp(x - 1, y - 1) && canPushUp(x, y - 1);
    }
  }

  function pushUp(x, y) {
    if (map[y][x] === "#") return;
    if (map[y][x] === ".") return;

    if (map[y][x] === "[") {
      pushUp(x, y - 1);
      pushUp(x + 1, y - 1);

      map[y - 1][x] = "[";
      map[y - 1][x + 1] = "]";
      map[y][x] = ".";
      map[y][x + 1] = ".";
    }
    if (map[y][x] === "]") {
      pushUp(x - 1, y - 1);
      pushUp(x, y - 1);

      map[y - 1][x - 1] = "[";
      map[y - 1][x] = "]";
      map[y][x - 1] = ".";
      map[y][x] = ".";
    }
  }

  function pushRight(x, y) {
    if (map[y][x] === "#") return false;
    if (map[y][x] === ".") return true;

    const couldPush = pushRight(x + 2, y);
    if (couldPush) {
      map[y][x] = ".";
      map[y][x + 1] = "[";
      map[y][x + 2] = "]";
    }

    return couldPush;
  }

  function canPushDown(x, y) {
    if (map[y][x] === "#") return false;
    if (map[y][x] === ".") return true;

    if (map[y][x] === "[") {
      return canPushDown(x, y + 1) && canPushDown(x + 1, y + 1);
    }
    if (map[y][x] === "]") {
      return canPushDown(x - 1, y + 1) && canPushDown(x, y + 1);
    }
  }

  function pushDown(x, y) {
    if (map[y][x] === "#") return;
    if (map[y][x] === ".") return;

    if (map[y][x] === "[") {
      pushDown(x, y + 1);
      pushDown(x + 1, y + 1);

      map[y + 1][x] = "[";
      map[y + 1][x + 1] = "]";
      map[y][x] = ".";
      map[y][x + 1] = ".";
    }
    if (map[y][x] === "]") {
      pushDown(x - 1, y + 1);
      pushDown(x, y + 1);

      map[y + 1][x - 1] = "[";
      map[y + 1][x] = "]";
      map[y][x - 1] = ".";
      map[y][x] = ".";
    }
  }

  function pushLeft(x, y) {
    if (map[y][x] === "#") return false;
    if (map[y][x] === ".") return true;

    const couldPush = pushLeft(x - 2, y);
    if (couldPush) {
      map[y][x - 2] = "[";
      map[y][x - 1] = "]";
      map[y][x] = ".";
    }

    return couldPush;
  }

  for (const move of input.split("\n\n")[1]) {
    if (move === "^") {
      if (canPushUp(rx, ry - 1)) {
        pushUp(rx, ry - 1);
        map[ry][rx] = ".";
        map[ry - 1][rx] = "@";
        ry -= 1;
      }
    }
    if (move === ">") {
      if (pushRight(rx + 1, ry)) {
        map[ry][rx] = ".";
        map[ry][rx + 1] = "@";
        rx += 1;
      }
    }
    if (move === "v") {
      if (canPushDown(rx, ry + 1)) {
        pushDown(rx, ry + 1);
        map[ry][rx] = ".";
        map[ry + 1][rx] = "@";
        ry += 1;
      }
    }
    if (move === "<") {
      if (pushLeft(rx - 1, ry)) {
        map[ry][rx - 1] = "@";
        map[ry][rx] = ".";
        rx -= 1;
      }
    }
  }

  let sum = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 2; x < width - 2; x++) {
      if (map[y][x] === "[") {
        sum += y * 100 + x;
      }
    }
  }

  return sum;
}
