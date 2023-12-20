const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let lines = input.split("\n");

  // [type, [children], ...]
  // type: 0 - flip-flop, 1 - conjuction, 2 - broadcast
  // pulse: false - low, true - high
  let modules = {};

  let reverse = {};

  for (let line of lines) {
    let [type, rest] = line.split(" -> ");
    let children = rest.split(", ");
    if (type.startsWith("%")) {
      type = type.slice(1);
      modules[type] = [0, children, false];
    } else if (type.startsWith("&")) {
      type = type.slice(1);
      modules[type] = [1, children, {}];
    } else {
      modules[type] = [2, children];
    }

    for (let child of children) {
      if (reverse[child] == undefined) reverse[child] = [];
      reverse[child].push(type);
    }
  }

  for (let m of Object.keys(modules)) {
    if (modules[m][0] != 1) continue;
    for (let parent of reverse[m]) {
      modules[m][2][parent] = false;
    }
  }

  let click = ["button", "broadcaster", false];
  let highCount = 0;
  let lowCount = 0;
  let signals = [];

  // console.log(modules);
  for (let i = 0; i < 1000; i++) {
    signals.push(click);
    while (signals.length > 0) {
      let [from, name, pulse] = signals.shift();
      // console.log(from, pulse ? "high" : "low", name);

      if (pulse) highCount += 1;
      else lowCount += 1;

      if (modules[name] == undefined) continue;

      let m = modules[name];
      if (m[0] == 0) {
        if (pulse) continue;
        m[2] = !m[2];
        signals.push(...m[1].map((n) => [name, n, m[2]]));
      } else if (m[0] == 1) {
        m[2][from] = pulse;
        let toSend = true;
        if (Object.values(m[2]).every((x) => x)) toSend = false;
        signals.push(...m[1].map((n) => [name, n, toSend]));
      } else {
        signals.push(...m[1].map((n) => [name, n, pulse]));
      }
    }
    // console.log(modules);
  }

  return highCount * lowCount;
}

// probably works only on my input
function part2() {
  let lines = input.split("\n");

  // [type, [children], ...]
  // type: 0 - flip-flop, 1 - conjuction, 2 - broadcast
  // pulse: false - low, true - high
  let modules = {};

  let reverse = {};

  for (let line of lines) {
    let [type, rest] = line.split(" -> ");
    let children = rest.split(", ");
    if (type.startsWith("%")) {
      type = type.slice(1);
      modules[type] = [0, children, false];
    } else if (type.startsWith("&")) {
      type = type.slice(1);
      modules[type] = [1, children, {}];
    } else {
      modules[type] = [2, children];
    }

    for (let child of children) {
      if (reverse[child] == undefined) reverse[child] = [];
      reverse[child].push(type);
    }
  }

  for (let m of Object.keys(modules)) {
    if (modules[m][0] != 1) continue;
    for (let parent of reverse[m]) {
      modules[m][2][parent] = false;
    }
  }

  let click = ["button", "broadcaster", false];
  let signals = [];

  let cycles = {};
  let previous = {};

  for (let n of reverse["dd"]) cycles[n] = 0;

  for (let i = 0; ; i++) {
    if (Object.values(cycles).every((x) => x > 0)) {      
      function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
      }
    
      function lcm(a, b) {
        return (a * b) / gcd(a, b);
      }
    
      return Object.values(cycles).reduce(lcm, 1);
    }
    signals.push(click);
    while (signals.length > 0) {
      let [from, name, pulse] = signals.shift();

      if (name == "dd" && pulse) {
        if (previous[from] == undefined) {
          previous[from] = i;
          continue;
        }
        cycles[from] = i - previous[from];
      }
      if (modules[name] == undefined) continue;

      let m = modules[name];
      if (m[0] == 0) {
        if (pulse) continue;
        m[2] = !m[2];
        signals.push(...m[1].map((n) => [name, n, m[2]]));
      } else if (m[0] == 1) {
        m[2][from] = pulse;
        let toSend = true;
        if (Object.values(m[2]).every((x) => x)) toSend = false;
        signals.push(...m[1].map((n) => [name, n, toSend]));
      } else {
        signals.push(...m[1].map((n) => [name, n, pulse]));
      }
    }
  }
}
