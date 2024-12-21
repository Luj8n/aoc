import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
// Dont have time for part 2
// console.log(`Part 2: ${part2()}`);

function generateNumericMap() {
  const numericKeypad = ["789", "456", "123", " 0A"];
  function findCoords(c) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 3; x++) {
        if (numericKeypad[y][x] === c) return { x, y };
      }
    }
  }

  const numericMap = {};

  numericMap["A"] = {};
  for (let to = 0; to <= 9; to++) {
    const c = to.toString();
    const { x, y } = findCoords(c);
    const dy = "^".repeat(3 - y);
    const dx = "<".repeat(2 - x);
    numericMap["A"][c] = [dy + dx];
    if (x !== 0 && dy + dx !== dx + dy) numericMap["A"][c].push(dx + dy);
  }

  numericMap["0"] = {};
  for (let to = 0; to <= 9; to++) {
    const toC = to.toString();
    const { x: toX, y: toY } = findCoords(toC);
    const dx = toX >= 1 ? ">".repeat(toX - 1) : "<".repeat(1 - toX);
    const dy = toY >= 3 ? "v".repeat(toY - 3) : "^".repeat(3 - toY);
    numericMap["0"][toC] = [dy + dx];
    if (toX !== 0 && dy + dx !== dx + dy) numericMap["0"][toC].push(dx + dy);
  }

  for (let from = 1; from <= 9; from++) {
    const fromC = from.toString();
    const { x: fromX, y: fromY } = findCoords(fromC);

    numericMap[fromC] = {};
    for (let to = 0; to <= 9; to++) {
      const toC = to.toString();
      const { x: toX, y: toY } = findCoords(toC);
      const dx = toX >= fromX ? ">".repeat(toX - fromX) : "<".repeat(fromX - toX);
      const dy = toY >= fromY ? "v".repeat(toY - fromY) : "^".repeat(fromY - toY);
      numericMap[fromC][toC] = [dx + dy];
      if (to !== 0 && dy + dx !== dx + dy) numericMap[fromC][toC].push(dy + dx);
    }
  }

  for (let from = 0; from <= 9; from++) {
    const fromC = from.toString();
    const { x: fromX, y: fromY } = findCoords(fromC);

    const dx = ">".repeat(2 - fromX);
    const dy = "v".repeat(3 - fromY);
    numericMap[fromC]["A"] = [dx + dy];
    if (fromX !== 0 && dy + dx !== dx + dy) numericMap[fromC]["A"].push(dy + dx);
  }

  return numericMap;
}

function generateDirectionalMap() {
  const map = {};

  map["A"] = {
    "^": "<",
    A: "",
    "<": "v<<",
    v: "v<",
    ">": "v",
  };
  map["^"] = {
    "^": "",
    A: ">",
    "<": "v<",
    v: "v",
    ">": "v>",
  };
  map["<"] = {
    "^": ">^",
    A: ">>^",
    "<": "",
    v: ">",
    ">": ">>",
  };
  map["v"] = {
    "^": "^",
    A: "^>",
    "<": "<",
    v: "",
    ">": ">",
  };
  map[">"] = {
    "^": "<^",
    A: "^",
    "<": "<<",
    v: "<",
    ">": "",
  };

  return map;
}

function part1() {
  const numericMap = generateNumericMap();
  const directionalMap = generateDirectionalMap();

  function getCodes1(inputCode) {
    let q1 = [""];
    let cur = "A";
    for (const c of inputCode) {
      let q2 = [];
      let minLength = Infinity;

      while (q1.length > 0) {
        const code = q1.pop();
        for (const way of numericMap[cur][c]) {
          const newCode = code + way + "A";
          q2.push(newCode);
          if (newCode.length < minLength) minLength = newCode.length;
        }
      }
      q1 = q2.filter((code) => code.length === minLength);
      cur = c;
    }

    return q1;
  }

  function getCode2(inputCode) {
    let cur = "A";
    let code = "";
    for (const c of inputCode) {
      code += directionalMap[cur][c] + "A";
      cur = c;
    }

    return code;
  }

  let sum = 0;

  function repeatStep(inputCodes) {
    let codes = [];
    for (const code of inputCodes) {
      codes.push(getCode2(code));
    }
    let minLength = codes.map((c) => c.length).reduce((p, x) => (p < x ? p : x));
    return codes.filter((c) => c.length === minLength);
  }

  const doorCodes = input.split("\n");
  for (const doorCode of doorCodes) {
    let codes1 = getCodes1(doorCode, numericMap);

    let codes2 = repeatStep(codes1);
    let codes3 = repeatStep(codes2);

    sum += codes3[0].length * +doorCode.slice(0, -1);
  }

  return sum;
}

// function part2() {
//   const numericMap = generateNumericMap();
//   const directionalMap = generateDirectionalMap();

//   function getCodes1(inputCode) {
//     let q1 = [""];
//     let cur = "A";
//     for (const c of inputCode) {
//       let q2 = [];
//       let minLength = Infinity;

//       while (q1.length > 0) {
//         const code = q1.pop();
//         for (const way of numericMap[cur][c]) {
//           const newCode = code + way + "A";
//           q2.push(newCode);
//           if (newCode.length < minLength) minLength = newCode.length;
//         }
//       }
//       q1 = q2.filter((code) => code.length === minLength);
//       cur = c;
//     }

//     return q1;
//   }

//   let sum = 0;

//   function addCounts(a, b, counts, mul) {
//     const code = directionalMap[a][b] + "A";
//     let prev = "A";
//     for (const c of code) {
//       if (counts[prev] === undefined) counts[prev] = {};
//       if (counts[prev][c] === undefined) counts[prev][c] = 0;
//       counts[prev][c] += mul;
//       prev = c;
//     }
//   }

//   function repeatStep(counts) {
//     let newCounts = {};
//     for (const k in counts) {
//       const v = counts[k];
//       for (const kk in v) {
//         const vv = counts[k][kk];
//         addCounts(k, kk, newCounts, vv);
//       }
//     }
//     return newCounts;
//   }

//   const doorCodes = input.split("\n");
//   for (const doorCode of doorCodes) {
//     let codes = ["vvvA"];

//     for (const code of codes) {
//       let counts = {};
//       for (let i = 1; i < code.length; i++) {
//         const p = code[i - 1];
//         const c = code[i];
//         if (counts[p] === undefined) counts[p] = {};
//         if (counts[p][c] === undefined) counts[p][c] = 0;
//         counts[p][c] += 1;
//       }

//       for (let i = 0; i < 1; i++) {
//         counts = repeatStep(counts);
//         console.log(counts);
//       }
//       let thisSum = 0;
//       for (const k in counts) {
//         const v = counts[k];
//         for (const kk in v) {
//           const vv = counts[k][kk];
//           thisSum += vv;
//         }
//       }
//       console.log(thisSum);
//     }

//     // sum += codes[0].length * +doorCode.slice(0, -1);
//   }

//   return sum;
// }
