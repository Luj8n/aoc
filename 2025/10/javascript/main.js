import { readFileSync } from "fs";
import { init } from "z3-solver";

const { Context, An } = await init();
const Z3 = new Context("main");

const input = readFileSync("../input.txt").toString().trim();

function part1() {
  const rows = input.split("\n");

  function lightsToBits(lights) {
    return eval(
      `0b${[...lights.slice(1, -1)]
        .toReversed()
        .map((x) => (x === "#" ? "1" : "0"))
        .join("")}`
    );
  }

  function buttonToBits(button) {
    let num = 0;

    for (const i of button
      .slice(1, -1)
      .split(",")
      .map((x) => +x)) {
      num ^= 1 << i;
    }

    return num;
  }

  let sum = 0;

  for (const row of rows) {
    const [lights, ...rest] = row.split(" ");
    const buttons = rest.slice(0, -1);

    const N = lights.length - 2;
    const M = buttons.length;

    const lb = lightsToBits(lights);

    const bbs = buttons.map((b) => buttonToBits(b));

    let min = M + 1;

    for (let i = 0; i < 1 << M; i++) {
      let state = 0;
      let c = 0;
      for (let j = 0; j < M; j++) {
        if ((i & (1 << j)) > 0) {
          c += 1;
          state ^= bbs[j];
        }
      }
      if (state === lb && c < min) {
        min = c;
      }
    }

    sum += min;
  }

  return sum;
}

async function part2() {
  const rows = input.split("\n");

  function parse(levels) {
    return levels
      .slice(1, -1)
      .split(",")
      .map((x) => +x);
  }

  function parseButton(button, N) {
    const nums = button
      .slice(1, -1)
      .split(",")
      .map((x) => +x);

    let out = [];

    for (let i = 0; i < N; i++) {
      out.push(nums.includes(i) ? 1 : 0);
    }

    return out;
  }

  let totalSum = 0n;

  for (const row of rows) {
    let solver = new Z3.Optimize();

    const [_, ...rest] = row.split(" ");
    const buttons = rest.slice(0, -1);
    const levels = rest.at(-1);

    const ls = parse(levels);

    const N = ls.length;
    const M = buttons.length;

    const bs = buttons.map((b) => parseButton(b, N));

    const x = [];

    for (let i = 0; i < M; i++) {
      x.push(Z3.Int.const(`x_${i}`));
    }

    const y = [];

    for (let i = 0; i < N; i++) {
      y.push(Z3.Int.val(ls[i]));
    }

    const equations = new Array(N).fill().map(() => []);

    for (let i = 0; i < M; i++) {
      const b = bs[i];
      for (let j = 0; j < N; j++) {
        const bj = b[j];
        if (bj !== 0) {
          // bj can only be 1
          equations[j].push(x[i]);
        }
      }
    }

    let i = 0;
    for (const equation of equations) {
      let prev = undefined;
      for (const xi of equation) {
        if (prev === undefined) prev = xi;
        else prev = prev.add(xi);
      }
      solver.add(prev.eq(y[i++]));
    }

    let prev = undefined;
    for (const xi of x) {
      solver.add(xi.gt(-1));
      if (prev === undefined) prev = xi;
      else prev = prev.add(xi);
    }

    solver.minimize(prev);

    await solver.check();
    const model = solver.model();

    let sum = x.reduce((a, c) => a + model.get(c).value(), 0n);
    totalSum += sum;
  }

  return totalSum;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${await part2()}`);
