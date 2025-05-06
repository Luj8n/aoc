import fs from "fs";

const cubes = new Set();

function key(x, y, z) {
  return `${x} ${y} ${z}`;
}

let touching = 0;

fs.readFileSync("18/input.txt")
  .toString()
  .trim()
  .split("\n")
  .forEach((l) => {
    const [x, y, z] = l.split(",").map((n) => +n);

    if (cubes.has(key(x + 1, y, z))) touching += 1;
    if (cubes.has(key(x - 1, y, z))) touching += 1;
    if (cubes.has(key(x, y + 1, z))) touching += 1;
    if (cubes.has(key(x, y - 1, z))) touching += 1;
    if (cubes.has(key(x, y, z + 1))) touching += 1;
    if (cubes.has(key(x, y, z - 1))) touching += 1;

    cubes.add(key(x, y, z));
  });

console.log(cubes.size * 6 - touching * 2);
