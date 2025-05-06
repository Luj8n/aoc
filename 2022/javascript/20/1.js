import fs from "fs";

const ns = fs
  .readFileSync("20/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((n) => +n);

// const map = {}

const a = ns.map((n, i) => {
  // map[i] = n;
  return i;
});

for (let i = 0; i < ns.length; i++) {
  for (let j = 0; j < ns.length; j++) {
    if (a[j] == i) {
      a.splice(j, 1);
      const k = (j + ns[i] + ns.length) % ns.length;
      a.splice(ns[i] < 0 ? k - 1 : k, 0, i);

      break;
    }
  }
}

const b = a.map((i) => ns[i]);

const zeroI = b.findIndex((n) => n == 0);
console.log(
  b[(zeroI + 1000) % b.length] + b[(zeroI + 2000) % b.length] + b[(zeroI + 3000) % b.length]
);
