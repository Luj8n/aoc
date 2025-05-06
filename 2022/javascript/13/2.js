import fs from "fs";

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

const packets = fs
  .readFileSync("13/input.txt")
  .toString()
  .trim()
  .split("\n")
  .filter((l) => l.trim() != "")
  .map(eval);
packets.push([[2]]);
packets.push([[6]]);

packets.sort((a, b) => compare(b, a));

const first = packets.findIndex((p) => compare(p, [[2]]) == 0) + 1;
const second = packets.findIndex((p) => compare(p, [[6]]) == 0) + 1;

console.log(first * second);
