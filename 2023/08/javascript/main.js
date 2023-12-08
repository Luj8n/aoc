const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

// console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let lines = input.split("\n");
  let dirs = lines[0];

  let nodes = {};
  lines.slice(2).forEach((x) => {
    let [f, l, r] = x.match(/\w+/g);
    nodes[f] = [l, r];
  });

  let current = "AAA";
  let steps = 0;
  while (current != "ZZZ") {
    let d = dirs[steps % dirs.length];

    if (d == "L") current = nodes[current][0];
    else current = nodes[current][1];

    steps += 1;
  }

  return steps;
}

function part2() {
  let lines = input.split("\n");
  let dirs = lines[0];

  let nodes = {};
  let from = [];
  lines.slice(2).forEach((x) => {
    let [f, l, r] = x.match(/\w+/g);
    if (f.endsWith("A")) from.push(f);
    nodes[f] = [l, r];
  });

  let times = from.map((f) => {
    let steps = 0;
    let c = f;
    while (!c.endsWith("Z")) {
      let d = dirs[steps % dirs.length];
      if (d == "L") c = nodes[c][0];
      else c = nodes[c][1];
      steps += 1;
    }
    return steps;
  });

  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  return times.reduce(lcm, 1);
}
