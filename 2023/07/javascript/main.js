const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let hands = input.split("\n").map((h) => {
    let x = h.split(" ");
    return [x[0], +x[1]];
  });
  hands.sort((a, b) => cmp1(a[0], b[0]));

  return hands.reduce((a, c, i) => a + (i + 1) * c[1], 0);
}

function cmp1(a, b) {
  const cardTypes = "AKQJT98765432";
  let c = {};
  let d = {};

  for (let letter of a) {
    if (c[letter] == undefined) c[letter] = 0;
    c[letter] += 1;
  }

  for (let letter of b) {
    if (d[letter] == undefined) d[letter] = 0;
    d[letter] += 1;
  }

  c = Object.entries(c);
  c.sort((e1, e2) => e2[1] - e1[1]);

  d = Object.entries(d);
  d.sort((e1, e2) => e2[1] - e1[1]);

  let r1 = 0;
  let r2 = 0;

  if (c[0][1] == 5) r1 = 1;
  else if (c[0][1] == 4) r1 = 2;
  else if (c[0][1] == 3 && c[1][1] == 2) r1 = 3;
  else if (c[0][1] == 3) r1 = 4;
  else if (c[0][1] == 2 && c[1][1] == 2) r1 = 5;
  else if (c[0][1] == 2) r1 = 6;
  else r1 = 7;

  if (d[0][1] == 5) r2 = 1;
  else if (d[0][1] == 4) r2 = 2;
  else if (d[0][1] == 3 && d[1][1] == 2) r2 = 3;
  else if (d[0][1] == 3) r2 = 4;
  else if (d[0][1] == 2 && d[1][1] == 2) r2 = 5;
  else if (d[0][1] == 2) r2 = 6;
  else r2 = 7;

  if (r1 < r2) return 1;
  if (r1 > r2) return -1;

  for (let i = 0; i < 5; i++) {
    let c1 = a[i];
    let c2 = b[i];

    let i1 = cardTypes.indexOf(c1);
    let i2 = cardTypes.indexOf(c2);

    if (i1 < i2) return 1;
    if (i1 > i2) return -1;
  }

  console.log("CMP FAILED");
}

function part2() {
  let hands = input.split("\n").map((h) => {
    let x = h.split(" ");
    return [x[0], +x[1]];
  });
  hands.sort((a, b) => cmp2(a[0], b[0]));

  return hands.reduce((a, c, i) => a + (i + 1) * c[1], 0);
}

function cmp2(a, b) {
  const cardTypes = "AKQT98765432J";
  let c = {};
  let d = {};

  c["J"] = 0;
  d["J"] = 0;
  c["A"] = 0;
  d["A"] = 0;

  for (let letter of a) {
    if (c[letter] == undefined) c[letter] = 0;
    c[letter] += 1;
  }

  for (let letter of b) {
    if (d[letter] == undefined) d[letter] = 0;
    d[letter] += 1;
  }

  let cv = Object.entries(c).filter((x) => x[0] != "J");
  cv.sort((e1, e2) => e2[1] - e1[1]);

  let dv = Object.entries(d).filter((x) => x[0] != "J");
  dv.sort((e1, e2) => e2[1] - e1[1]);

  let r1 = 0;
  let r2 = 0;

  if (cv[0][1] + c["J"] == 5) r1 = 1;
  else if (cv[0][1] + c["J"] == 4) r1 = 2;
  else if (cv[0][1] == 3 && cv[1][1] == 2) r1 = 3;
  else if (cv[0][1] == 2 && cv[1][1] == 2 && c["J"] == 1) r1 = 3;
  else if (cv[0][1] + c["J"] == 3) r1 = 4;
  else if (cv[0][1] == 2 && cv[1][1] == 2) r1 = 5;
  else if (cv[0][1] == 2 && cv[1][1] == 1 && c["J"] == 1) r1 = 5;
  else if (cv[0][1] + c["J"] == 2) r1 = 6;
  else r1 = 7;

  if (dv[0][1] + d["J"] == 5) r2 = 1;
  else if (dv[0][1] + d["J"] == 4) r2 = 2;
  else if (dv[0][1] == 3 && dv[1][1] == 2) r2 = 3;
  else if (dv[0][1] == 2 && dv[1][1] == 2 && d["J"] == 1) r2 = 3;
  else if (dv[0][1] + d["J"] == 3) r2 = 4;
  else if (dv[0][1] == 2 && dv[1][1] == 2) r2 = 5;
  else if (dv[0][1] == 2 && dv[1][1] == 1 && d["J"] == 1) r2 = 5;
  else if (dv[0][1] + d["J"] == 2) r2 = 6;
  else r2 = 7;

  if (r1 < r2) return 1;
  if (r1 > r2) return -1;

  for (let i = 0; i < 5; i++) {
    let c1 = a[i];
    let c2 = b[i];

    let i1 = cardTypes.indexOf(c1);
    let i2 = cardTypes.indexOf(c2);

    if (i1 < i2) return 1;
    if (i1 > i2) return -1;
  }

  console.log("CMP FAILED");
}
