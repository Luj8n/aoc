import fs from "fs";

const text = fs.readFileSync("03/input.txt").toString().trim();

const bags = text.split("\n");

function value(c = "") {
  const code = c.charCodeAt();
  if (code >= 97) {
    // lowercase
    return code - 96;
  } else {
    // uppercase
    return code - 38;
  }
}

let sum = 0;

for (let i = 0; i < bags.length / 3; i++) {
  const group = bags.slice(i * 3, i * 3 + 3);
  let hashmapuh = {};
  group.forEach((b) => {
    let bag = new Set(b);
    bag.forEach((char) => {
      hashmapuh[char] = hashmapuh[char] ? hashmapuh[char] + 1 : 1;
      if (hashmapuh[char] == 3) {
        sum += value(char);
        return;
      }
    });
  });
}

console.log(sum);
