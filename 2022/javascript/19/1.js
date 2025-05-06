import fs from "fs";

const numbers = fs
  .readFileSync("19/test.txt")
  .toString()
  .trim()
  .match(/\d+/g)
  .map((n) => +n);

const blueprints = [];

for (let i = 0; i < numbers.length; i += 7) {
  blueprints.push(numbers.slice(i + 1, i + 7));
}

function maxGeods(blueprint) {
  const q = [];
  // q.push([3, 3, 1, 29, 4, 2, 2, 3, 2]);
  q.push([24, 0, 1, 0, 0, 0, 0, 0, 0]);

  let max = 0;

  const set = new Set();

  const maxOre = Math.max(blueprint[0], blueprint[1], blueprint[2], blueprint[4]);
  const maxClay = Math.max(blueprint[3]);
  const maxObsidian = Math.max(blueprint[5]);

  while (q.length > 0) {
    let [
      minsLeft,
      ore,
      oreRobots,
      clay,
      clayRobots,
      obsidian,
      obisidianRobots,
      geode,
      geodeRobots,
    ] = q.pop();

    const key = `${minsLeft} ${ore} ${oreRobots} ${clay} ${clayRobots} ${obsidian} ${obisidianRobots} ${geode} ${geodeRobots}`;

    if (set.has(key)) continue;
    set.add(key);

    if (minsLeft <= 0) {
      if (geode > max) {
        max = geode;
        console.log(key);
      }
      continue;
    }

    const canMakeOreRobot = ore >= blueprint[0];
    const canMakeClayRobot = ore >= blueprint[1];
    const canMakeObsidianRobot = ore >= blueprint[2] && clay >= blueprint[3];
    const canMakeGeodeRobot = ore >= blueprint[4] && obsidian >= blueprint[5];

    ore += oreRobots;
    clay += clayRobots;
    obsidian += obisidianRobots;
    geode += geodeRobots;

    if (canMakeGeodeRobot) {
      q.push([
        minsLeft - 1,
        ore - blueprint[4],
        oreRobots,
        clay,
        clayRobots,
        obsidian - blueprint[5],
        obisidianRobots,
        geode,
        geodeRobots + 1,
      ]);

      continue;
    }

    if (canMakeOreRobot)
      q.push([
        minsLeft - 1,
        ore - blueprint[0],
        oreRobots + 1,
        clay,
        clayRobots,
        obsidian,
        obisidianRobots,
        geode,
        geodeRobots,
      ]);

    if (canMakeClayRobot)
      q.push([
        minsLeft - 1,
        ore - blueprint[1],
        oreRobots,
        clay,
        clayRobots + 1,
        obsidian,
        obisidianRobots,
        geode,
        geodeRobots,
      ]);
    if (canMakeObsidianRobot)
      q.push([
        minsLeft - 1,
        ore - blueprint[2],
        oreRobots,
        clay - blueprint[3],
        clayRobots,
        obsidian,
        obisidianRobots + 1,
        geode,
        geodeRobots,
      ]);

    if (ore > maxOre && clay > maxClay && obsidian > maxObsidian) continue;

    q.push([
      minsLeft - 1,
      ore,
      oreRobots,
      clay,
      clayRobots,
      obsidian,
      obisidianRobots,
      geode,
      geodeRobots,
    ]);
  }

  return max;
}

console.log(maxGeods(blueprints[1]));
