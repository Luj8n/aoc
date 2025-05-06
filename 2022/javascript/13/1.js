import fs from "fs";

const pairs = fs
  .readFileSync("13/input.txt")
  .toString()
  .trim()
  .split("\n\n")
  .map((p) => p.split("\n").map(eval));

function compare(a, b) {
  if (typeof a == "number" && typeof b == "object") {
    return compare([a], b);
  }
  if (typeof a == "object" && typeof b == "number") {
    return compare(a, [b]);
  }

  if (typeof a == "number" && typeof b == "number") {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  }

  if (typeof a == "object" && typeof b == "object") {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const c = compare(a[i], b[i]);
      if (c != 0) return c;
    }
    if (a.length < b.length) return 1;
    if (a.length > b.length) return -1;
    return 0;
  }

  console.log("Error");
}

let sum = 0;

for (let i = 0; i < pairs.length; i++) {
  const pair = pairs[i];
  if (compare(...pair) == 1) sum += i + 1;
}

console.log(sum);
