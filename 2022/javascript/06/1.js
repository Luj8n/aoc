import fs from "fs";

const text = fs.readFileSync("06/input.txt").toString().trim();

for (let i = 0; i < text.length - 3; i++) {
  const slice = text.slice(i, i + 4);
  const set = new Set(slice);

  if (set.size == 4) {
    console.log(i + 4);
    break;
  }
}
