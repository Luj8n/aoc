import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function getComboOpe(ope, a, b, c) {
  if (ope < 4) return BigInt(ope);
  else if (ope === 4) return a;
  else if (ope === 5) return b;
  else if (ope === 6) return c;
}

function run(a, b, c, p) {
  let ip = 0;

  let output = [];

  while (ip + 1 < p.length) {
    const opc = p[ip];
    const ope = p[ip + 1];

    if (opc === 0) {
      a = a / 2n ** getComboOpe(ope, a, b, c);
    } else if (opc === 1) {
      b = b ^ BigInt(ope);
    } else if (opc === 2) {
      b = getComboOpe(ope, a, b, c) % 8n;
    } else if (opc === 3) {
      if (a !== 0n) {
        ip = ope;
        continue;
      }
    } else if (opc === 4) {
      b = b ^ c;
    } else if (opc === 5) {
      output.push(getComboOpe(ope, a, b, c) % 8n);
    } else if (opc === 6) {
      b = a / 2n ** getComboOpe(ope, a, b, c);
    } else if (opc === 7) {
      c = a / 2n ** getComboOpe(ope, a, b, c);
    }

    ip += 2;
  }

  return output;
}

function part1() {
  let [a, b, c, ...p] = input.match(/\d+/g).map((x) => +x);
  a = BigInt(a);
  b = BigInt(b);
  c = BigInt(c);

  return run(a, b, c, p).join(",");
}

function part2() {
  let [_, b, c, ...p] = input.match(/\d+/g).map((x) => +x);
  b = BigInt(b);
  c = BigInt(c);

  const q = [{ a: 0n, size: 0 }];

  while (q.length > 0) {
    const el = q.shift();

    if (el.size === p.length) {
      return el.a;
    }

    const min = el.a * 8n;
    const max = el.a * 8n + 7n;

    const expected = p.slice(-(el.size + 1)).join(",");

    for (let a = min; a <= max; a++) {
      const out = run(a, b, c, p).join(",");
      if (out === expected) q.push({ a, size: el.size + 1 });
    }
  }
}
