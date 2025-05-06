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

let highestPoint = 0;

for (let c = 0; c < 2022; c++) {
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
      shape.forEach(([ox, oy]) => {
        if (y + oy > highestPoint) highestPoint = y + oy;
        rocks.add(getKey(x + ox, y + oy));
      });

      break;
    }
  }
}

console.log(highestPoint);
