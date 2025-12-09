import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

function part1() {
  const positions = input.split("\n").map((r) => r.split(",").map((x) => +x));

  let largestArea = 0;

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const [x1, y1] = positions[i];
      const [x2, y2] = positions[j];

      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
      if (area > largestArea) largestArea = area;
    }
  }

  return largestArea;
}

function part2() {
  const positions = input.split("\n").map((r) => r.split(",").map((x) => +x));

  const edges = [...positions, positions[0]];

  function inside(x, y) {
    // Check maybe inside an edge
    for (let i = 0; i < edges.length - 1; i++) {
      let [x1, y1] = edges[i];
      let [x2, y2] = edges[i + 1];

      if (x2 < x1) {
        [x1, x2] = [x2, x1];
      }

      if (y2 < y1) {
        [y1, y2] = [y2, y1];
      }

      if (x1 === x2 && x === x1 && y1 <= y && y <= y2) {
        return true;
      }

      if (y1 === y2 && y === y1 && x1 <= x && x <= x2) {
        return true;
      }
    }

    // Raycast to horizontally to the right
    let count = false;

    for (let i = 0; i < edges.length - 1; i++) {
      let [x1, y1] = edges[i];
      let [_, y2] = edges[i + 1];

      // Ignore horizontal edges
      if (y1 === y2) continue;

      if (y2 < y1) {
        [y1, y2] = [y2, y1];
      }

      if (y1 <= y && y < y2 && x < x1) {
        count = !count;
      }
    }

    return count;
  }

  // Doesn't count corners of edges
  function edgeIntersects(minX, minY, maxX, maxY) {
    const isVertical = minX === maxX;

    for (let i = 0; i < edges.length - 1; i++) {
      let [x1, y1] = edges[i];
      let [x2, y2] = edges[i + 1];

      const polyVertical = x1 === x2;

      if (x2 < x1) {
        [x1, x2] = [x2, x1];
      }

      if (y2 < y1) {
        [y1, y2] = [y2, y1];
      }

      if (isVertical && !polyVertical) {
        if (x1 < maxX && maxX < x2 && minY < y2 && y2 < maxY) return true;
      }
      if (!isVertical && polyVertical) {
        if (y1 < maxY && maxY < y2 && minX < x2 && x2 < maxX) return true;
      }
    }

    return false;
  }

  let largestArea = 0;

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const [x1, y1] = positions[i];
      const [x2, y2] = positions[j];

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const middleInside = inside(minX + 1, minY + 1);

      if (!middleInside) continue;

      const cornersInside =
        inside(minX, minY) && inside(maxX, minY) && inside(maxX, maxY) && inside(minX, maxY);

      if (!cornersInside) continue;

      const edgesIntersect =
        edgeIntersects(minX, minY, maxX, minY) ||
        edgeIntersects(maxX, minY, maxX, maxY) ||
        edgeIntersects(minX, maxY, maxX, maxY) ||
        edgeIntersects(minX, minY, minX, maxY);

      if (edgesIntersect) continue;

      const area = (maxX - minX + 1) * (maxY - minY + 1);

      if (area > largestArea) {
        largestArea = area;
      }
    }
  }

  return largestArea;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
