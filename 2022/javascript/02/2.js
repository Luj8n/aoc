import fs from "fs";

const text = fs.readFileSync("02/input.txt").toString();

const things = text
  .trim()
  .split("\n")
  .map((x) => x.split(" "));

const toLose = {
  A: "Z",
  B: "X",
  C: "Y",
};

const toWin = {
  A: "Y",
  B: "Z",
  C: "X",
};

const same = {
  A: "X",
  B: "Y",
  C: "Z",
};

const values = {
  X: 1,
  Y: 2,
  Z: 3,
};

let totalScore = 0;

things.forEach(([opponent, result]) => {
  let x;
  if (result == "X") {
    // loss
    x = toLose[opponent];
  } else if (result == "Y") {
    // draw
    totalScore += 3;
    x = same[opponent];
  } else {
    // win
    totalScore += 6;
    x = toWin[opponent];
  }

  totalScore += values[x];
});

console.log(totalScore);
