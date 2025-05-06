import fs from "fs";

function contains(bigger, smaller) {
  return smaller[0] >= bigger[0] && smaller[1] <= bigger[1];
}

const text = fs.readFileSync("04/input.txt").toString().trim();

let count = 0;

text.split("\n").map((line) => {
  let [elf1, elf2] = line.split(",").map((range) => range.split("-").map((i) => +i));
  if (contains(elf1, elf2) || contains(elf2, elf1)) count += 1;
});

console.log(count);
