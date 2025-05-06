import fs from "fs";

const text = fs.readFileSync("01/input.txt").toString();

const calories = text.split("\n\n").map((e) =>
  e
    .split("\n")
    .map((x) => +x)
    .reduce((a, c) => a + c, 0)
);

calories.sort((a, b) => b - a);

console.log(calories.slice(0, 3).reduce((a, c) => a + c, 0));
