import { readFileSync, readSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${await part2()}`);

function part1() {
  // const height = 103;
  // const width = 101;
  const height = 7;
  const width = 11;
  const steps = 100;

  const robots = [];

  for (const line of input.split("\n")) {
    const [px, py, vx, vy] = line.match(/(-?\d+)/g).map((x) => +x);

    robots.push({
      px,
      py,
      vx,
      vy,
    });
  }

  for (const robot of robots) {
    robot.px = (robot.px + steps * robot.vx + steps * width) % width;
    robot.py = (robot.py + steps * robot.vy + steps * height) % height;
  }

  let topLeft = 0;
  let topRight = 0;
  let bottomRight = 0;
  let bottomLeft = 0;

  const mx = (width - 1) / 2;
  const my = (height - 1) / 2;

  for (const { px, py } of robots) {
    if (px < mx && py < my) topLeft += 1;
    if (px > mx && py < my) topRight += 1;
    if (px > mx && py > my) bottomRight += 1;
    if (px < mx && py > my) bottomLeft += 1;
  }

  const safety = topLeft * topRight * bottomRight * bottomLeft;

  return safety;
}

// stepStart and stepSize depend on the input. then you gotta manually find the picture :)
async function part2() {
  const stepStart = 43;
  const stepSize = 103;

  const height = 103;
  const width = 101;

  const robots = [];

  for (const line of input.split("\n")) {
    const [px, py, vx, vy] = line.match(/(-?\d+)/g).map((x) => +x);

    robots.push({
      px,
      py,
      vx,
      vy,
    });
  }

  function getChar() {
    let buffer = Buffer.alloc(1);
    readSync(0, buffer, 0, 1);
    return buffer.toString("utf8");
  }

  for (let steps = stepStart; ; steps += stepSize) {
    getChar();

    const map = new Array(height).fill().map((_) => new Array(width).fill(" "));

    for (const robot of robots) {
      let x = (robot.px + steps * robot.vx + steps * width) % width;
      let y = (robot.py + steps * robot.vy + steps * height) % height;

      map[y][x] = "@";
    }

    console.log(`Seconds elapsed: ${steps}`);
    console.log(map.map((r) => r.join(" ")).join("\n"));
    console.log();
  }
}
