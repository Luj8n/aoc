import fs from "fs";

const motions = fs.readFileSync("09/test2.txt").toString().trim().split("\n");

const visited = new Set();

let hx = 0;
let hy = 0;

let tx = 0;
let ty = 0;

visited.add(`${0} ${0}`);

motions.forEach((m) => {
  const [d, c] = m.split(" ");
  for (let i = 0; i < c; i++) {
    if (d == "U") {
      hy += 1;
    } else if (d == "R") {
      hx += 1;
    } else if (d == "D") {
      hy -= 1;
    } else if (d == "L") {
      hx -= 1;
    }

    if (Math.abs(hx - tx) > 1 || Math.abs(hy - ty) > 1) {
      tx += Math.sign(hx - tx);
      ty += Math.sign(hy - ty);

      visited.add(`${tx} ${ty}`);
    }
  }
});

console.log(visited.size);
