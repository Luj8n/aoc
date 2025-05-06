import fs from "fs";

const cubeSet = new Set();

function key(x, y, z) {
  return `${x} ${y} ${z}`;
}

const cubes = fs
  .readFileSync("18/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => {
    const [x, y, z] = l.split(",").map((n) => +n);

    cubeSet.add(key(x, y, z));

    return [x, y, z];
  });

let sides = 0;

function has(x, y, z) {
  return cubeSet.has(key(x, y, z));
}

function isOutside(ox, oy, oz) {
  const visited = new Set();

  function r(x, y, z, d) {
    // NOTE: the size of this depends on the input
    if (d > 5000) return true;
    const k = key(x, y, z);

    if (visited.has(k)) return false;
    visited.add(k);

    if (has(x, y, z)) return false;

    return (
      r(x + 1, y, z, d + 1) ||
      r(x - 1, y, z, d + 1) ||
      r(x, y + 1, z, d + 1) ||
      r(x, y - 1, z, d + 1) ||
      r(x, y, z + 1, d + 1) ||
      r(x, y, z - 1, d + 1)
    );
  }

  return r(ox, oy, oz, 0);
}

function f(x, y, z) {
  if (has(x, y, z)) return false;

  return isOutside(x, y, z);
}

cubes.forEach(([x, y, z]) => {
  if (f(x + 1, y, z)) sides += 1;
  if (f(x - 1, y, z)) sides += 1;
  if (f(x, y + 1, z)) sides += 1;
  if (f(x, y - 1, z)) sides += 1;
  if (f(x, y, z + 1)) sides += 1;
  if (f(x, y, z - 1)) sides += 1;
});

console.log(sides);
