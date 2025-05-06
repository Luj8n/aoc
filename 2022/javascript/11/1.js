import fs from "fs";

const monkeys = fs
  .readFileSync("11/input.txt")
  .toString()
  .trim()
  .split("\n\n")
  .map((input) => {
    const lines = input.split("\n").map((l) => l.trim());

    const items = lines[1]
      .split(": ")[1]
      .split(", ")
      .map((n) => +n);
    const operation = eval(`(old) => ${lines[2].split(" = ")[1]}`);
    const nextMonkey = eval(
      `(n) => n % ${lines[3].split(" ")[3]} == 0 ? ${lines[4].split(" ")[5]} : ${
        lines[5].split(" ")[5]
      }`
    );

    return {
      items,
      operation,
      nextMonkey,

      inspected: 0,
    };
  });

for (let c = 0; c < 20; c++) {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();

      item = monkey.operation(item);
      item = Math.floor(item / 3);
      monkeys[+monkey.nextMonkey(item)].items.push(item);

      monkey.inspected += 1;
    }
  }
}

const inspected = monkeys.map((m) => m.inspected);
inspected.sort((a, b) => b - a);

const monkeyBusiness = inspected[0] * inspected[1];

console.log(monkeyBusiness);
