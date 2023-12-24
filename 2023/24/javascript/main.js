import { readFileSync } from "fs";
import { init } from "z3-solver";
const { Context } = await init();
const Z3 = new Context("main");

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${await part2()}`);
// Part 2 takes a while, but the python z3 solver is faster

process.exit(0); // It doesn't automatically exit after solving it for some reason ¯\_(ツ)_/¯

function part1() {
  let hailstones = input.split("\n").map((l) => {
    let nums = l.match(/-?\d+/g).map(Number);
    return {
      px: nums[0],
      py: nums[1],
      vx: nums[3],
      vy: nums[4],
    };
  });

  const minV = 7; // 200000000000000;
  const maxV = 27; // 400000000000000;

  let counter = 0;

  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      let a = hailstones[i];
      let b = hailstones[j];

      let bottom = b.vx * a.vy - a.vx * b.vy;
      if (bottom == 0) continue;
      let s = (a.vx * (b.py - a.py) - a.vy * (b.px - a.px)) / bottom;
      let t = (b.px - a.px + s * b.vx) / a.vx;

      if (s < 0 || t < 0) continue;

      let x = b.px + s * b.vx;
      let y = b.py + s * b.vy;

      if (x > maxV || y > maxV || x < minV || y < minV) continue;

      counter += 1;
    }
  }

  return counter;
}

async function part2() {
  let hailstones = input.split("\n").map((l) => {
    let nums = l.match(/-?\d+/g).map(Number);
    return {
      px: nums[0],
      py: nums[1],
      pz: nums[2],
      vx: nums[3],
      vy: nums[4],
      vz: nums[5],
    };
  });

  let x = Z3.Int.const("x");
  let y = Z3.Int.const("y");
  let z = Z3.Int.const("z");
  let a = Z3.Int.const("a");
  let b = Z3.Int.const("b");
  let c = Z3.Int.const("c");

  let solver = new Z3.Solver();

  // Let (vx_i, vy_i, vz_i) = (a_i, b_i, c_i),
  // and (px_i, py_i, pz_i) = (x_i, y_i, z_i), where is i is the index of a hailstone.
  // (a, b, c) will be the rock's (vx, vy, vz),
  // and (x, y, z) - (px, py, pz).

  // For the rock to go through the hailstones it must satisfy this system of equations for each of them:
  // x + t_i * a = x_i + t_i * a_i
  // y + t_i * b = y_i + t_i * b_i
  // z + t_i * c = z_i + t_i * c_i

  // t_i - is some specific time, where x, y, z coordinates of the rock and the i'th hailstone are the same.

  // Now, we notice that there are 6 variables (a,b,c,x,y,z) for the rock, and one more - t_i.
  // Therefore, the first 3 hailstones are enough to determine the rock's information, because
  // to solve a system of equations, there has to be at least the same amount of equations as variables:
  // n - number of hailstones
  // LHS - number of total equations
  // RHS - number of variables
  // 3n = 6 + n => 2n = 6 => n = 3

  for (let i = 0; i < 3; i++) {
    let { px, py, pz, vx, vy, vz } = hailstones[i];
    let ai = Z3.Int.val(vx);
    let bi = Z3.Int.val(vy);
    let ci = Z3.Int.val(vz);
    let xi = Z3.Int.val(px);
    let yi = Z3.Int.val(py);
    let zi = Z3.Int.val(pz);

    let ti = Z3.Int.const(`t${i + 1}`);
    solver.add(x.add(ti.mul(a)).eq(xi.add(ti.mul(ai))));
    solver.add(y.add(ti.mul(b)).eq(yi.add(ti.mul(bi))));
    solver.add(z.add(ti.mul(c)).eq(zi.add(ti.mul(ci))));
  }

  await solver.check();
  let model = solver.model();

  let sum = model.get(x).value() + model.get(y).value() + model.get(z).value();
  return sum;
}
