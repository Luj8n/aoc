const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  return input.split(",").reduce((a, c) => {
    let value = 0;
    for (let char of c) {
      value += char.charCodeAt();
      value *= 17;
      value %= 256;
    }
    return a + value;
  }, 0);
}

function part2() {
  function hash(label) {
    let value = 0;
    for (let char of label) {
      value += char.charCodeAt();
      value *= 17;
      value %= 256;
    }
    return value;
  }
  let boxes = new Array(256).fill().map((_) => []);
  let sequence = input.split(",");
  for (let step of sequence) {
    let label = step.match(/^\w+/g)[0];
    let box = hash(label);
    if (step.includes("=")) {
      let num = +step.match(/\d+/g)[0];
      let i = boxes[box].findIndex(([x, _]) => x == label);
      if (i != -1) {
        boxes[box][i][1] = num;
      } else {
        boxes[box].push([label, num]);
      }
    } else {
      boxes[box] = boxes[box].filter(([x, _]) => x != label);
    }
  }

  let power = 0;
  for (let boxI = 0; boxI < boxes.length; boxI++) {
    const box = boxes[boxI];
    for (let lenseI = 0; lenseI < box.length; lenseI++) {
      const [_, focal] = box[lenseI];
      power += (boxI + 1) * (lenseI + 1) * focal;
    }
  }

  return power;
}
