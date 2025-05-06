import fs from "fs";

const jetPattern = fs.readFileSync("17/input.txt").toString().trim().split("");

let jetPointer = 0;
function nextJet() {
  const oldPointer = jetPointer;
  jetPointer = (jetPointer + 1) % jetPattern.length;
  return jetPattern[oldPointer] == "<" ? -1 : 1;
}

// 0, 0 - bottom left corner
const shapes = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [0, 1],
    [1, 2],
    [2, 1],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
];

let shapePointer = 0;
function nextShape() {
  const oldPointer = shapePointer;
  shapePointer = (shapePointer + 1) % shapes.length;
  return shapes[oldPointer];
}

function getKey(x, y) {
  return `${x} ${y}`;
}

const rocks = new Set();
function isRock(x, y) {
  if (x <= 0 || x >= 8 || y <= 0) return true;

  return rocks.has(getKey(x, y));
}

const deltaMap = new Map();

let highestPoint = 0;

const lastDeltas = [];
const deltaSize = 1000;

let willAdd = undefined;

const iters = 1000000000000;

for (let c = 0; c < iters; c++) {
  let x = 3;
  let y = highestPoint + 4;
  const shape = nextShape();

  while (true) {
    const jetOffset = nextJet();

    // check if it can be pushed
    if (shape.every(([ox, oy]) => !isRock(x + ox + jetOffset, y + oy))) {
      // push it
      x += jetOffset;
    }

    // check if it can fall
    if (shape.every(([ox, oy]) => !isRock(x + ox, y + oy - 1))) {
      // it falls down
      y -= 1;
    } else {
      // it has come to rest
      let maxPoint = 0;
      shape.forEach(([ox, oy]) => {
        if (y + oy > maxPoint) maxPoint = y + oy;
        rocks.add(getKey(x + ox, y + oy));
      });

      lastDeltas.unshift(maxPoint - highestPoint);
      if (lastDeltas.length > deltaSize) lastDeltas.pop();

      if (maxPoint > highestPoint) highestPoint = maxPoint;

      // check if it has filled fully
      if (lastDeltas.length == deltaSize && willAdd == undefined) {
        const s = lastDeltas.join(" ");
        if (deltaMap.has(s)) {
          const [previousHighestPoint, previousC] = deltaMap.get(s);

          const deltaHeight = highestPoint - previousHighestPoint;
          const deltaC = c - previousC;

          willAdd = Math.floor((iters - c) / deltaC) * deltaHeight;
          c += Math.floor((iters - c) / deltaC) * deltaC;
        } else {
          deltaMap.set(s, [highestPoint, c]);
        }
      }

      break;
    }
  }
}

console.log(highestPoint + willAdd);
