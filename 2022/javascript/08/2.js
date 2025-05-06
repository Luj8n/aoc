import fs from "fs";

const trees = fs
  .readFileSync("08/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((l) => l.split("").map((t) => +t));

let visibleTrees = trees.map((l) => l.map((_) => false));

for (let i = 0; i < trees.length; i++) {
  let maximums = [-1, -1, -1, -1];

  for (let o = 0; o < trees.length; o++) {
    // top to bottom
    {
      let height = trees[o][i];
      if (height > maximums[0]) {
        maximums[0] = height;
        visibleTrees[o][i] = true;
      }
    }
    //  right to left
    {
      let height = trees[i][trees.length - o - 1];
      if (height > maximums[1]) {
        maximums[1] = height;
        visibleTrees[i][trees.length - o - 1] = true;
      }
    }
    // bottom to top
    {
      let height = trees[trees.length - o - 1][i];
      if (height > maximums[2]) {
        maximums[2] = height;
        visibleTrees[trees.length - o - 1][i] = true;
      }
    }
    // left to right
    {
      let height = trees[i][o];
      if (height > maximums[3]) {
        maximums[3] = height;
        visibleTrees[i][o] = true;
      }
    }
  }
}

let maxScore = 0;

for (let y = 0; y < trees.length; y++) {
  for (let x = 0; x < trees.length; x++) {
    if (visibleTrees[y][x]) {
      let height = trees[y][x];
      let score = 1;

      {
        // looking up
        let count = 0;
        for (let yy = y - 1; yy >= 0; yy--) {
          count += 1;
          if (trees[yy][x] >= height) break;
        }
        score *= count;
      }
      {
        // looking right
        let count = 0;
        for (let xx = x + 1; xx < trees.length; xx++) {
          count += 1;
          if (trees[y][xx] >= height) break;
        }
        score *= count;
      }
      {
        // looking down
        let count = 0;
        for (let yy = y + 1; yy < trees.length; yy++) {
          count += 1;
          if (trees[yy][x] >= height) break;
        }
        score *= count;
      }
      {
        // looking left
        let count = 0;
        for (let xx = x - 1; xx >= 0; xx--) {
          count += 1;
          if (trees[y][xx] >= height) break;
        }
        score *= count;
      }

      if (score > maxScore) maxScore = score;
    }
  }
}

console.log(maxScore);
