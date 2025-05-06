import fs from "fs";

const lines = fs.readFileSync("07/input.txt").toString().trim().split("\n");

let currentDir = [];

let folderSizes = {};

lines.forEach((line) => {
  const words = line.split(" ");
  if (words[0] == "$" && words[1] == "cd") {
    // changed dir

    const newDir = words[2];
    if (newDir == "..") {
      currentDir.pop();
    } else {
      currentDir.push(newDir);
    }
  } else if (words[0] == "$" && words[1] == "ls") {
    // do nothing
  } else {
    // listed file
    if (words[0] == "dir") {
      // do nothing
    } else {
      for (let i = 1; i <= currentDir.length; i++) {
        const path = currentDir.slice(0, i).join(" ");
        if (!folderSizes[path]) folderSizes[path] = 0;
        folderSizes[path] += +words[0];
      }
    }
  }
});

let values = Object.values(folderSizes);

const used = Math.max(...values);

values.sort((a, b) => a - b);

const best = values.find((x) => 70000000 - used + x >= 30000000);

console.log(best);
