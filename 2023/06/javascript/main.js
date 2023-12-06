const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let times = input.split("\n")[0].match(/\d+/g).map(Number);
  let distances = input.split("\n")[1].match(/\d+/g).map(Number);

  let product = 1;

  for (let i = 0; i < times.length; i++) {
    let t = times[i];
    let d = distances[i];

    let v = t / 2;
    let u = Math.sqrt(t * t - 4 * d) / 2;

    let x1 = Math.ceil(v - u + 0.0001);
    let x2 = Math.floor(v + u - 0.0001);
    let w = x2 - x1 + 1;
    product *= w;
  }
  return product;
}

function part2() {
  let t = +input.split("\n")[0].match(/\d+/g).join("");
  let d = +input.split("\n")[1].match(/\d+/g).join("");

  let v = t / 2;
  let u = Math.sqrt(t * t - 4 * d) / 2;

  let x1 = Math.ceil(v - u + 0.0001);
  let x2 = Math.floor(v + u - 0.0001);
  let w = x2 - x1 + 1;

  return w;
}
