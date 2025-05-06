import fs from "fs";

const rows = fs.readFileSync("10/input.txt").toString().trim().split("\n");

let X = 1;
let cycle = 0;

let output = "";

function tick() {
  cycle += 1;

  let position = (cycle - 1) % 40;

  if (X - 1 == position || X == position || X + 1 == position) {
    output += "#";
  } else {
    output += ".";
  }

  if (position == 39) {
    output += "\n";
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

console.log(output);
