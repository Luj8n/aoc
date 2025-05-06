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

bags.forEach((b) => {
  let l = b.length;
  let hashmapuh = {};
  for (let i = 0; i < l; i++) {
    const char = b[i];
    if (i < l / 2) {
      hashmapuh[char] = hashmapuh[char] ? hashmapuh[char] + 1 : 1;
    } else {
      if (hashmapuh[char]) {
        sum += value(char);
        break;
      }
    }
  }
});

console.log(sum);
