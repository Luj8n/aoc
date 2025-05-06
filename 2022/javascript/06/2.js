import fs from "fs";

const text = fs.readFileSync("06/input.txt").toString().trim();

const length = 14;

for (let i = 0; i < text.length - length + 1; i++) {
  const slice = text.slice(i, i + length);
  const set = new Set(slice);

  if (set.size == length) {
    console.log(i + length);
    break;
  }
}
