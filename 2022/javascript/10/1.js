import fs from "fs";

const rows = fs.readFileSync("10/input.txt").toString().trim().split("\n");

let X = 1;
let cycle = 0;

let sum = 0;

function tick() {
  cycle += 1;

  if ((cycle - 20) % 40 == 0) {
    sum += cycle * X;
  }
}

rows.forEach((row) => {
  const words = row.split(" ");

  if (words[0] == "noop") {
    tick();
    return;
  }

  tick();
  tick();

  const V = +words[1];
  X += V;
});

console.log(sum);
