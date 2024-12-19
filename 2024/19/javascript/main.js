import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const patterns = input.split("\n\n")[0].split(", ");

  const mem = {};
  function canSolve(design) {
    if (design === "") return true;
    if (mem[design] !== undefined) {
      return mem[design];
    }

    for (const p of patterns) {
      if (p.length > design.length) continue;
      if (!design.startsWith(p)) continue;

      const c = canSolve(design.slice(p.length));
      if (c) {
        mem[design] = true;
        return true;
      }
    }

    mem[design] = false;
    return false;
  }

  const designs = input.split("\n\n")[1].split("\n");

  let count = 0;
  for (const d of designs) {
    if (canSolve(d)) count += 1;
  }

  return count;
}

function part2() {
  const patterns = input.split("\n\n")[0].split(", ");

  const mem = {};
  function rec(design) {
    if (design === "") return 1;
    if (mem[design] !== undefined) {
      return mem[design];
    }

    let s = 0;
    for (const p of patterns) {
      if (p.length > design.length) continue;
      if (!design.startsWith(p)) continue;

      const c = rec(design.slice(p.length));
      s += c;
    }

    mem[design] = s;
    return s;
  }

  const designs = input.split("\n\n")[1].split("\n");

  let total = 0;
  for (const d of designs) {
    total += rec(d);
  }

  return total;
}
