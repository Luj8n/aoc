const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  let bricks = input.split("\n").map((b) => b.split("~").map((c) => c.split(",").map(Number)));
  bricks.sort((a, b) => Math.min(a[0][2], a[1][2]) - Math.min(b[0][2], b[1][2]));

  let blocks = new Set();

  function key(x, y, z) {
    let hash = 7 * x;
    hash <<= 8;
    hash += y * 13;
    hash <<= 8;
    hash += z;
    return hash;
  }

  function canPlace(brick) {
    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
      for (let y = brick[0][1]; y <= brick[1][1]; y++) {
        for (let z = brick[0][2]; z <= brick[1][2]; z++) {
          let k = key(x, y, z);
          if (blocks.has(k)) return false;
        }
      }
    }
    return true;
  }

  function place(brick) {
    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
      for (let y = brick[0][1]; y <= brick[1][1]; y++) {
        for (let z = brick[0][2]; z <= brick[1][2]; z++) {
          let k = key(x, y, z);
          blocks.add(k);
        }
      }
    }
  }

  function remove(brick) {
    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
      for (let y = brick[0][1]; y <= brick[1][1]; y++) {
        for (let z = brick[0][2]; z <= brick[1][2]; z++) {
          let k = key(x, y, z);
          blocks.delete(k);
        }
      }
    }
  }

  for (let brick of bricks) {
    place(brick);
  }

  function fall() {
    for (let i = 0; i < bricks.length; i++) {
      let b = bricks[i];
      remove(b);
      while (true) {
        b[0][2] -= 1;
        b[1][2] -= 1;
        if (b[0][2] <= 0) break;
        if (!canPlace(b)) break;
      }
      b[0][2] += 1;
      b[1][2] += 1;
      place(b);
    }
  }

  function willFall(ignore = -1) {
    for (let i = 0; i < bricks.length; i++) {
      if (ignore == i) continue;
      let b = bricks[i];
      if (b[0][2] <= 1) continue;
      remove(b);
      b[0][2] -= 1;
      b[1][2] -= 1;
      let couldPlace = canPlace(b);
      b[0][2] += 1;
      b[1][2] += 1;
      place(b);
      if (couldPlace) return true;
    }

    return false;
  }

  while (willFall()) {
    fall();
  }

  let canRemove = 0;

  for (let i = 0; i < bricks.length; i++) {
    remove(bricks[i]);
    if (!willFall(i)) canRemove += 1;
    place(bricks[i]);
  }

  return canRemove;
}

function part2() {
  let bricks = input.split("\n").map((b) => b.split("~").map((c) => c.split(",").map(Number)));
  bricks.sort((a, b) => Math.min(a[0][2], a[1][2]) - Math.min(b[0][2], b[1][2]));

  let blocks = new Set();

  function key(x, y, z) {
    let hash = 7 * x;
    hash <<= 8;
    hash += y * 13;
    hash <<= 8;
    hash += z;
    return hash;
  }

  function canPlace(brick) {
    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
      for (let y = brick[0][1]; y <= brick[1][1]; y++) {
        for (let z = brick[0][2]; z <= brick[1][2]; z++) {
          let k = key(x, y, z);
          if (blocks.has(k)) return false;
        }
      }
    }
    return true;
  }

  function place(brick) {
    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
      for (let y = brick[0][1]; y <= brick[1][1]; y++) {
        for (let z = brick[0][2]; z <= brick[1][2]; z++) {
          let k = key(x, y, z);
          blocks.add(k);
        }
      }
    }
  }

  function remove(brick) {
    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
      for (let y = brick[0][1]; y <= brick[1][1]; y++) {
        for (let z = brick[0][2]; z <= brick[1][2]; z++) {
          let k = key(x, y, z);
          blocks.delete(k);
        }
      }
    }
  }

  for (let brick of bricks) {
    place(brick);
  }

  function fall() {
    let f = 0;
    for (let i = 0; i < bricks.length; i++) {
      let fell = false;
      let b = bricks[i];
      remove(b);
      while (true) {
        b[0][2] -= 1;
        b[1][2] -= 1;
        if (b[0][2] <= 0) break;
        if (!canPlace(b)) break;
        fell = true;
      }
      b[0][2] += 1;
      b[1][2] += 1;
      place(b);
      if (fell) f += 1;
    }
    return f;
  }

  function willFall(ignore = -1) {
    for (let i = 0; i < bricks.length; i++) {
      if (ignore == i) continue;
      let b = bricks[i];
      if (b[0][2] <= 1) continue;
      remove(b);
      b[0][2] -= 1;
      b[1][2] -= 1;
      let couldPlace = canPlace(b);
      b[0][2] += 1;
      b[1][2] += 1;
      place(b);
      if (couldPlace) return true;
    }

    return false;
  }

  while (willFall()) {
    fall();
  }

  let totalFalls = 0;

  for (let i = 0; i < bricks.length; i++) {
    let oldBricks = bricks.map((b) => b.map((p) => p.map((x) => x)));
    let oldBlocks = new Set(blocks);
    remove(bricks[i]);
    bricks.splice(i, 1);
    totalFalls += fall();
    bricks = oldBricks;
    blocks = oldBlocks;
  }

  return totalFalls;
}
