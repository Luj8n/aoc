const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  let sum = 0;

  input.split("\n").forEach((line) => {
    let id = +line.split(": ")[0].split(" ")[1];

    let allGood = line
      .split(": ")[1]
      .split("; ")
      .every((set) => {
        let redCount = 0;
        let greenCount = 0;
        let blueCount = 0;
        set.split(", ").forEach((x) => {
          let balls = x.split(" ");

          if (balls[1] == "red") redCount += +balls[0];
          if (balls[1] == "green") greenCount += +balls[0];
          if (balls[1] == "blue") blueCount += +balls[0];
        });

        return redCount <= maxRed && greenCount <= maxGreen && blueCount <= maxBlue;
      });

    if (allGood) sum += id;
  });

  return sum;
}

function part2() {
  let sum = 0;

  input.split("\n").forEach((line) => {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    line
      .split(": ")[1]
      .split("; ")
      .forEach((set) => {
        let redCount = 0;
        let greenCount = 0;
        let blueCount = 0;
        set.split(", ").forEach((x) => {
          let balls = x.split(" ");

          if (balls[1] == "red") redCount += +balls[0];
          if (balls[1] == "green") greenCount += +balls[0];
          if (balls[1] == "blue") blueCount += +balls[0];
        });

        minRed = Math.max(minRed, redCount);
        minGreen = Math.max(minGreen, greenCount);
        minBlue = Math.max(minBlue, blueCount);
      });

    let power = minRed * minGreen * minBlue;
    sum += power;
  });

  return sum;
}
