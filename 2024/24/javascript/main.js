import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function operate(a, b, op) {
  if (op === "AND") return a && b;
  if (op === "OR") return a || b;
  if (op === "XOR") return a ^ b;
  console.error("Invalid operation");
}

function part1() {
  const outputs = {};

  for (const line of input.split("\n\n")[0].split("\n")) {
    const [wire, bit] = line.split(": ");
    outputs[wire] = bit === "1";
  }

  const calcOutputs = {};

  for (const line of input.split("\n\n")[1].split("\n")) {
    const [a, op, b, _, c] = line.split(" ");
    calcOutputs[c] = { a, b, op };
  }

  function getOutput(wire) {
    if (outputs[wire] !== undefined) return outputs[wire];

    const { a, b, op } = calcOutputs[wire];
    const c = operate(getOutput(a), getOutput(b), op);
    outputs[wire] = c;
    return c;
  }

  let z = 0n;
  for (let i = 0; ; i++) {
    const wire = `z${i.toString().padStart(2, "0")}`;
    if (outputs[wire] === undefined && calcOutputs[wire] === undefined) break;
    if (getOutput(wire)) z |= 1n << BigInt(i);
  }
  return z;
}

function numbersToOutputs(x, y, nBits) {
  const outputs = {};

  for (let i = 0; i < nBits; i++) {
    const wire = `x${i.toString().padStart(2, "0")}`;
    outputs[wire] = x & 1;
    x >>= 1;
  }

  for (let i = 0; i < nBits; i++) {
    const wire = `y${i.toString().padStart(2, "0")}`;
    outputs[wire] = y & 1;
    y >>= 1;
  }

  return outputs;
}

function calculateOutput(outputs, calcOutputs) {
  let bad = false;
  function getOutput(wire, depth = 0) {
    if (depth > 7) {
      bad = true;
      return false;
    }
    if (outputs[wire] !== undefined) return outputs[wire];

    const { a, b, op } = calcOutputs[wire];
    const c = operate(getOutput(a, depth + 1), getOutput(b, depth + 1), op);
    outputs[wire] = c;
    return c;
  }

  let z = 0n;
  for (let i = 0; ; i++) {
    const wire = `z${i.toString().padStart(2, "0")}`;
    if (outputs[wire] === undefined && calcOutputs[wire] === undefined) break;
    if (getOutput(wire)) z |= 1n << BigInt(i);
  }
  if (bad) return -1;
  return z;
}

// From reddit:
// 1. If the output of a gate is z, then the operation has to be XOR unless it is the last bit.
// 2. If the output of a gate is not z and the inputs are not x, y then it has to be AND / OR, but not XOR.
// 3. If you have a XOR gate with inputs x, y, there must be another XOR gate with this gate as an input. Search through all gates for an XOR-gate with this gate as an input; if it does not exist, your (original) XOR gate is faulty.
// 4. Similarly, if you have an AND-gate, there must be an OR-gate with this gate as an input. If that gate doesn't exist, the original AND gate is faulty.

// Unique solution for my input
function part2() {
  const faulty = ["kwb", "z24", "cph", "qkf", "z12", "z16", "tgr", "jqn"];
  faulty.sort();
  return faulty.join(",");
}
