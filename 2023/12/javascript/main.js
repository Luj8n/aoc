const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function part1() {
  return input
    .split("\n")
    .map((line) => {
      let [springs, groups] = line.split(" ");
      groups = groups.split(",").map(Number);
      let count = 0;
      r(0, 0, 0);
      function r(springI, groupI, toPlace) {
        if (springI >= springs.length && groupI == groups.length && toPlace == 0) {
          count += 1;
          return;
        }

        if (springI >= springs.length) return;

        let s = springs[springI];
        let g = groups[groupI];

        if (toPlace > 0) {
          if (s == "?" || s == "#") {
            if (toPlace == 1) {
              if (springI + 1 < springs.length && springs[springI + 1] == "#") return;
              r(springI + 2, groupI, 0);
              return;
            }

            r(springI + 1, groupI, toPlace - 1);
          }

          return;
        }

        if (s == "?" || s == ".") r(springI + 1, groupI, 0);

        if (groupI < groups.length) r(springI, groupI + 1, g);
      }
      return count;
    })
    .reduce((a, c) => a + c, 0);
}
function part2() {
  return input
    .split("\n")
    .map((line) => {
      let [springs, groups] = line.split(" ");
      springs = (springs + "?").repeat(5).slice(0, -1);
      groups = (groups + ",").repeat(5).slice(0, -1);

      groups = groups.split(",").map(Number);
      let mem = {};

      let x = r(0, 0, 0);
      function r(springI, groupI, toPlace) {
        let hash = `${springI} ${groupI} ${toPlace}`;
        if (mem[hash] != undefined) return mem[hash];

        if (springI >= springs.length && groupI == groups.length && toPlace == 0) {
          mem[hash] = 1;
          return 1;
        }

        if (springI >= springs.length) {
          mem[hash] = 0;
          return 0;
        }

        let s = springs[springI];
        let g = groups[groupI];

        if (toPlace > 0) {
          if (s == "?" || s == "#") {
            if (toPlace == 1) {
              if (springI + 1 < springs.length && springs[springI + 1] == "#") {
                mem[hash] = 0;
                return 0;
              }
              let x = r(springI + 2, groupI, 0);
              mem[hash] = x;
              return x;
            }

            let x = r(springI + 1, groupI, toPlace - 1);
            mem[hash] = x;
            return x;
          }

          mem[hash] = 0;
          return 0;
        }

        let toAdd = 0;
        if (s == "?" || s == ".") toAdd += r(springI + 1, groupI, 0);

        if (groupI < groups.length) toAdd += r(springI, groupI + 1, g);

        mem[hash] = toAdd;
        return toAdd;
      }
      return x;
    })
    .reduce((a, c) => a + c, 0);
}
