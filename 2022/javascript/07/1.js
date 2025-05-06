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

const sum = Object.values(folderSizes).reduce((a, c) => (c > 100000 ? a : a + c), 0);

console.log(sum);
