import fs from "fs";

const map = new Map();

function k(x, y) {
  return `${x} ${y}`;
}

function m(x, y) {
  const s = k(x, y);

  if (!map.has(s)) {
    if (y == deepest + 2) map.set(s, "#");
    else map.set(s, ".");
  }

  return map.get(s);
}

let deepest = 0;

fs.readFileSync("14/input.txt")
  .toString()
  .trim()
  .split("\n")
  .forEach((p) => {
    const coords = p.split(" -> ").map((c) => c.split(",").map((x) => +x));

    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];

      if (prev[0] == curr[0]) {
        let [y1, y2] = [prev[1], curr[1]];
        if (y1 > y2) [y1, y2] = [y2, y1];

        for (let y = y1; y <= y2; y++) {
          map.set(k(prev[0], y), "#");
        }
      } else {
        let [x1, x2] = [prev[0], curr[0]];
        if (x1 > x2) [x1, x2] = [x2, x1];

        for (let x = x1; x <= x2; x++) {
          map.set(k(x, prev[1]), "#");
        }
      }
    }

    for (let i = 0; i < coords.length; i++) {
      if (coords[i][1] > deepest) deepest = coords[i][1];
    }
  });

let count = 0;

main: while (true) {
  let x = 500;
  let y = 0;

  while (true) {
    if (m(x, y + 1) == ".") y += 1;
    else if (m(x - 1, y + 1) == ".") {
      x -= 1;
      y += 1;
    } else if (m(x + 1, y + 1) == ".") {
      x += 1;
      y += 1;
    } else {
      count += 1;
      map.set(k(x, y), "o");

      if (x == 500 && y == 0) break main;
      break;
    }
  }
}

console.log(count);
