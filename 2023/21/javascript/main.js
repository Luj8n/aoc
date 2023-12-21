const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let map = input.split("\n");
  const STEPS = 64;
  let h = map.length;
  let w = map[0].length;

  let startX, startY;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] == "S") {
        startX = x;
        startY = y;
      }
    }
  }

  map[startY] = map[startY].replace("S", ".");

  let distances = new Array(h).fill().map(() => new Array(w).fill(Infinity));

  let q = [[startX, startY, 0]];

  while (q.length > 0) {
    let [x, y, steps] = q.shift();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    if (map[y][x] != ".") continue;
    if (steps > STEPS) continue;
    if (distances[y][x] <= steps) continue;
    distances[y][x] = steps;

    q.push([x, y - 1, steps + 1]);
    q.push([x + 1, y, steps + 1]);
    q.push([x, y + 1, steps + 1]);
    q.push([x - 1, y, steps + 1]);
  }

  let gardens = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (distances[y][x] != Infinity && distances[y][x] % 2 == STEPS % 2) {
        gardens += 1;
      }
    }
  }
  return gardens;
}

// just... no...
// Well, apparently the actual input is a square grid, and the size is N = 131.
// And you have to notice that if you travel to the edges of it (131 / 2 => 65 steps)
// and then you add N * t, you can express it as a quadratic equation in terms of t: f(t).
// Thankfully the steps needed are 26501365 = 26501300 + 65 = 202300 * 131 + 65.
// So to find f(t) just find f(0), f(1), f(2) and then fit it (using something like wolframalpha or maybe just math)
// Now we just need to calculate f(202300).
// Oh and this works because the actual input has empty paths exactly from the starting point to the edges
function part2() {
  // const STEPS = 65 + 131 * 0; // f(0) = 3648
  // const STEPS = 65 + 131 * 1; // f(1) = 32781
  const STEPS = 65 + 131 * 2; // f(2) = 90972
  // => f(t) = 3648 + 14604 x + 14529 x^2
  // => f(202300) = 594606492802848

  let map = input.split("\n");
  let h = map.length;
  let w = map[0].length;
  let startX, startY;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] == "S") {
        startX = x;
        startY = y;
      }
    }
  }

  map[startY] = map[startY].replace("S", ".");

  let t = 11;
  map = map.map((x) => x.repeat(t));
  for (let i = 1; i < t; i++) {
    map.push(...map.slice(0, h));
  }

  startX += (w * (t - 1)) / 2;
  startY += (h * (t - 1)) / 2;

  h *= t;
  w *= t;

  let distances = new Array(h).fill().map(() => new Array(w).fill(Infinity));

  let q = [[startX, startY, 0]];

  while (q.length > 0) {
    let [x, y, steps] = q.shift();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    if (map[y][x] != ".") continue;
    if (steps > STEPS) continue;
    if (distances[y][x] <= steps) continue;
    distances[y][x] = steps;

    q.push([x, y - 1, steps + 1]);
    q.push([x + 1, y, steps + 1]);
    q.push([x, y + 1, steps + 1]);
    q.push([x - 1, y, steps + 1]);
  }

  let gardens = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (distances[y][x] != Infinity && distances[y][x] % 2 == STEPS % 2) {
        gardens += 1;
      }
    }
  }
  return gardens;
}
