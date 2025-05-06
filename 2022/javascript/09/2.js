import fs from "fs";

const motions = fs.readFileSync("09/input.txt").toString().trim().split("\n");

const visited = new Set();

const ropes = 10;

let xs = Array(ropes).fill(0);
let ys = Array(ropes).fill(0);

visited.add(`${0} ${0}`);

motions.forEach((m) => {
  const [d, c] = m.split(" ");
  for (let i = 0; i < c; i++) {
    if (d == "U") {
      ys[0] += 1;
    } else if (d == "R") {
      xs[0] += 1;
    } else if (d == "D") {
      ys[0] -= 1;
    } else if (d == "L") {
      xs[0] -= 1;
    }

    for (let j = 1; j < ropes; j++) {
      let px = xs[j - 1];
      let py = ys[j - 1];

      if (Math.abs(px - xs[j]) > 1 || Math.abs(py - ys[j]) > 1) {
        xs[j] += Math.sign(px - xs[j]);
        ys[j] += Math.sign(py - ys[j]);
        if (j == ropes - 1) visited.add(`${xs[j]} ${ys[j]}`);
      }
    }
  }
});

console.log(visited.size);
