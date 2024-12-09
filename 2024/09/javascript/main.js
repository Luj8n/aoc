import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let fs = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const c = +input[i];
    if (c === 0) continue;
    for (let j = 0; j < c; j++) {
      if (i % 2 == 0) fs.push(id);
      else fs.push(-1);
    }
    if (i % 2 === 0) id += 1;
  }

  let l = 0;
  let r = fs.length - 1;
  while (l < r) {
    if (fs[l] !== -1) {
      l += 1;
      continue;
    }
    if (fs[r] === -1) {
      r -= 1;
      continue;
    }
    fs[l] = fs[r];
    fs[r] = -1;
  }

  let sum = 0;
  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === -1) break;
    sum += i * fs[i];
  }

  return sum;
}

function part2() {
  let files = [];
  let free = [];
  let id = 0;

  let fsSize = 0;

  for (let i = 0; i < input.length; i++) {
    const c = +input[i];
    if (c === 0) continue;

    if (i % 2 == 0) {
      files.push({ id, start: fsSize, length: c });
      id += 1;
    } else {
      free.push({ start: fsSize, length: c });
    }

    fsSize += c;
  }

  for (let i = files.length - 1; i >= 0; i--) {
    const file = files[i];
    for (let j = 0; j < free.length; j++) {
      const fre = free[j];
      if (file.start <= fre.start) break;
      if (file.length > fre.length) continue;

      file.start = fre.start;
      if (file.length === fre.length) {
        free.splice(j, 1);
      } else {
        fre.start += file.length;
        fre.length -= file.length;
      }
      break;
    }
  }

  let fs = new Array(fsSize).fill(-1);

  for (const file of files) {
    for (let i = 0; i < file.length; i++) {
      fs[file.start + i] = file.id;
    }
  }

  let sum = 0;
  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === -1) continue;
    sum += i * fs[i];
  }

  return sum;
}
