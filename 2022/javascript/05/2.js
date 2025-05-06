import fs from "fs";

const text = fs.readFileSync("05/input.txt").toString().split("\n");

let stacks = [];

for (let i = 0; i < text.length; i++) {
  const l = text[i];

  if (l.length < 1) continue;

  if (l[1] == "1") {
    // stack count
    for (let j = 1; j < l.length; j += 4) {
      if (!stacks[+l[j] - 1]) stacks[+l[j] - 1] = [];
    }
  } else if (l[0] == "m") {
    // move
    const [_1, count, _2, from, _3, to] = l.split(" ").map((x) => +x);
    stacks[to - 1].push(...stacks[from - 1].splice(-count));
  } else {
    // crates
    let c = 0;
    for (let j = 1; j < l.length; j += 4) {
      const crate = l[j];
      if (crate != " ") {
        if (stacks[c]) stacks[c].unshift(crate);
        else stacks[c] = [crate];
      }
      c += 1;
    }
  }
}

console.log(stacks.map((x) => x.slice(-1)[0]).join(""));
