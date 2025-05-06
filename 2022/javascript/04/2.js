import fs from "fs";

function overlaps(a, b) {
  return b[0] <= a[1] && b[1] >= a[0];
}

const text = fs.readFileSync("04/input.txt").toString().trim();

let count = 0;

text.split("\n").map((line) => {
  let [elf1, elf2] = line.split(",").map((range) => range.split("-").map((i) => +i));
  if (overlaps(elf1, elf2)) count += 1;
});

console.log(count);
