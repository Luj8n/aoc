import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const machines = input.split("\n\n");

  const at = 3;
  const bt = 1;

  let allt = 0;

  for (const machine of machines) {
    const [ax, ay] = machine
      .match(/Button A: X\+(\d+), Y\+(\d+)/)
      .slice(1, 3)
      .map((x) => +x);

    const [bx, by] = machine
      .match(/Button B: X\+(\d+), Y\+(\d+)/)
      .slice(1, 3)
      .map((x) => +x);

    const [px, py] = machine
      .match(/Prize: X=(\d+), Y=(\d+)/)
      .slice(1, 3)
      .map((x) => +x);

    let mint = -1;

    for (let ai = 0; ai <= 100; ai++) {
      for (let bi = 0; bi <= 100; bi++) {
        let x = ai * ax + bi * bx;
        let y = ai * ay + bi * by;

        if (x === px && y === py) {
          let t = ai * at + bi * bt;
          if (t < mint || mint === -1) mint = t;
        }
      }
    }

    if (mint !== -1) allt += mint;
  }

  return allt;
}

function part2() {
  const machines = input.split("\n\n");

  const at = 3n;
  const bt = 1n;

  let allt = 0n;

  for (const machine of machines) {
    const [ax, ay] = machine
      .match(/Button A: X\+(\d+), Y\+(\d+)/)
      .slice(1, 3)
      .map((x) => +x)
      .map((x) => BigInt(x));

    const [bx, by] = machine
      .match(/Button B: X\+(\d+), Y\+(\d+)/)
      .slice(1, 3)
      .map((x) => +x)
      .map((x) => BigInt(x));

    const [px, py] = machine
      .match(/Prize: X=(\d+), Y=(\d+)/)
      .slice(1, 3)
      .map((x) => +x + 10000000000000)
      .map((x) => BigInt(x));

    const a = (by * px - bx * py) / (ax * by - ay * bx);
    const b = (ax * py - ay * px) / (ax * by - ay * bx);

    if (a * ax + b * bx === px && a * ay + b * by === py) {
      allt += a * at + b * bt;
    }
  }

  return allt;
}
