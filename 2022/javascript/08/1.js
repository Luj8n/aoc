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

console.log(visibleTrees.flat().reduce((a, c) => (c ? a + 1 : a), 0));
