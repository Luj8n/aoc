import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Answer: ${answer()}`);

function answer() {
  const locks = [];
  const keys = [];

  for (const lines of input.split("\n\n")) {
    const part = lines.split("\n");
    const isLock = part[0][0] === "#";
    const schematic = [];
    for (let x = 0; x < 5; x++) {
      let count = 0;
      for (let y = 0; y < 7; y++) {
        if (part[y][x] === "#") count += 1;
      }
      schematic.push(count - 1);
    }

    if (isLock) locks.push(schematic);
    else keys.push(schematic);
  }

  let count = 0;
  for (const key of keys) {
    for (const lock of locks) {
      let fit = true;
      for (let i = 0; i < 5; i++) {
        if (key[i] + lock[i] > 5) {
          fit = false;
          break;
        }
      }
      if (fit) count += 1;
    }
  }
  return count;
}
