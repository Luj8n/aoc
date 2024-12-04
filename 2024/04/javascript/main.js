import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  const word = "XMAS";

  const map = input.split("\n").map((x) => x.trim());
  const height = map.length;
  const width = map[0].length;

  let wordCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          let matchesWord = true;
          for (let dt = 0; dt < word.length; dt++) {
            let ny = y + dy * dt;
            let nx = x + dx * dt;

            if (ny < 0 || ny >= height || nx < 0 || nx >= width || map[ny][nx] !== word[dt]) {
              matchesWord = false;
              break;
            }
          }

          if (matchesWord) {
            wordCount += 1;
          }
        }
      }
    }
  }

  return wordCount;
}

function part2() {
  const map = input.split("\n").map((x) => x.trim());
  const height = map.length;
  const width = map[0].length;

  let xCount = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (map[y][x] !== "A") continue;

      const mainDiag =
        (map[y - 1][x - 1] === "M" && map[y + 1][x + 1] === "S") ||
        (map[y - 1][x - 1] === "S" && map[y + 1][x + 1] === "M");

      const otherDiag =
        (map[y - 1][x + 1] === "M" && map[y + 1][x - 1] === "S") ||
        (map[y - 1][x + 1] === "S" && map[y + 1][x - 1] === "M");

      if (mainDiag && otherDiag) {
        xCount += 1;
      }
    }
  }

  return xCount;
}
