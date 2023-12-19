const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let [rules, parts] = input.split("\n\n").map((x) => x.split("\n"));
  let f = {};
  for (let rule of rules) {
    let name = rule.split("{")[0];
    let other = rule.split("{")[1].slice(0, -1).split(",");
    let code = "let {x, m, a, s} = o;\n";

    for (let i = 0; i < other.length - 1; i++) {
      let part1 = other[i].split(":")[0];
      if (i == 0) code += `if (${part1}) {\n`;
      else code += `else if (${part1}) {\n`;
      code += `return "${other[i].split(":")[1]}";\n`;
      code += "}\n";
    }
    code += `return "${other.at(-1)}"`;
    f[name] = new Function("o", code);
  }

  let sum = 0;

  for (let part of parts) {
    let o = eval("(" + part.replace(/=/g, ":") + ")");
    let name = "in";
    while (name != "A" && name != "R") {
      name = f[name](o);
    }
    if (name == "A") {
      sum += o.x + o.m + o.a + o.s;
    }
  }
  return sum;
}

function part2() {
  let rules = input.split("\n\n")[0].split("\n");
  let f = {};

  for (let rule of rules) {
    let name = rule.split("{")[0];
    let other = rule.split("{")[1].slice(0, -1).split(",");
    let code = "let o = {...i};\nlet tr = [];\n";

    for (let i = 0; i < other.length - 1; i++) {
      let [condition, fun] = other[i].split(":");
      let v = condition[0];
      let t = condition[1];
      let n = +condition.slice(2);
      if (t == "<") {
        code += `tr.push({...o, ${v}max: ${n - 1}, fun: "${fun}"});\n`;
        code += `o.${v}min = ${n};\n`;
      } else {
        code += `tr.push({...o, ${v}min: ${n + 1}, fun: "${fun}"});\n`;
        code += `o.${v}max = ${n};\n`;
      }
    }
    code += `tr.push({...o, fun: "${other.at(-1)}"});\n`;
    code += "return tr;";
    f[name] = new Function("i", code);
  }

  let initialO = {
    fun: "in",
    xmin: 1,
    xmax: 4000,
    mmin: 1,
    mmax: 4000,
    amin: 1,
    amax: 4000,
    smin: 1,
    smax: 4000,
  };

  let q = [initialO];

  let sum = 0;

  while (q.length > 0) {
    let o = q.pop();
    if (o.xmin > o.xmax || o.mmin > o.mmax || o.amin > o.amax || o.smin > o.smax) continue;

    if (o.fun == "A") {
      sum +=
        (o.xmax - o.xmin + 1) *
        (o.mmax - o.mmin + 1) *
        (o.amax - o.amin + 1) *
        (o.smax - o.smin + 1);
      continue;
    }

    if (o.fun == "R") continue;

    q.push(...f[o.fun](o));
  }

  return sum;
}
