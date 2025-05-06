import fs from "fs";

const text = fs.readFileSync("02/input.txt").toString();

const rounds = text
  .trim()
  .split("\n")
  .map((x) => x.split(" "));

const beats = {
  A: "Z",
  B: "X",
  C: "Y",
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

rounds.forEach(([opponent, me]) => {
  if (me == same[opponent]) {
    totalScore += 3;
  } else if (me != beats[opponent]) {
    totalScore += 6;
  }

  totalScore += values[me];
});

console.log(totalScore);
