import { readFileSync } from "fs";

const input = readFileSync("../input.txt").toString().trim();

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

function nextSecret(secret) {
  secret = ((secret * 64n) ^ secret) % 16777216n;
  secret = ((secret / 32n) ^ secret) % 16777216n;
  secret = ((secret * 2048n) ^ secret) % 16777216n;
  return secret;
}

function part1() {
  const nums = input.split("\n").map((x) => BigInt(x));

  let sum = 0n;
  for (const num of nums) {
    let n = num;
    for (let i = 0; i < 2000; i++) {
      n = nextSecret(n);
    }
    sum += n;
  }

  return sum;
}

function part2() {
  const nums = input.split("\n").map((x) => BigInt(x));

  const maps = [];

  for (const num of nums) {
    const map = {};
    const lastFourChanges = [];
    let secret = num;
    for (let i = 0; i < 2000; i++) {
      let newSecret = nextSecret(secret);
      lastFourChanges.push((newSecret % 10n) - (secret % 10n));
      if (lastFourChanges.length > 4) {
        lastFourChanges.shift();
      }
      if (lastFourChanges.length === 4) {
        const key = lastFourChanges.join(",");
        if (map[key] === undefined) map[key] = newSecret % 10n;
      }
      secret = newSecret;
    }
    maps.push(map);
  }

  const summedMap = {};

  for (const map of maps) {
    for (const key in map) {
      if (summedMap[key] === undefined) summedMap[key] = 0n;
      summedMap[key] += map[key];
    }
  }

  let maxProfit = 0n;

  for (const key in summedMap) {
    const value = summedMap[key];
    if (value > maxProfit) maxProfit = value;
  }

  return maxProfit;
}
