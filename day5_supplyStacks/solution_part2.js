var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(`${__dirname}/input.txt`),
});

/*
 *     [H]         [D]     [P]
 * [W] [B]         [C] [Z] [D]
 * [T] [J]     [T] [J] [D] [J]
 * [H] [Z]     [H] [H] [W] [S]     [M]
 * [P] [F] [R] [P] [Z] [F] [W]     [F]
 * [J] [V] [T] [N] [F] [G] [Z] [S] [S]
 * [C] [R] [P] [S] [V] [M] [V] [D] [Z]
 * [F] [G] [H] [Z] [N] [P] [M] [N] [D]
 *  1   2   3   4   5   6   7   8   9
 */
let result = "";
let stacks = [
  ["F", "C", "J", "P", "H", "T", "W"],
  ["G", "R", "V", "F", "Z", "J", "B", "H"],
  ["H", "P", "T", "R"],
  ["Z", "S", "N", "P", "H", "T"],
  ["N", "V", "F", "Z", "H", "J", "C", "D"],
  ["P", "M", "G", "F", "W", "D", "Z"],
  ["M", "V", "Z", "W", "S", "J", "D", "P"],
  ["N", "D", "S"],
  ["D", "Z", "S", "F", "M"],
];

const supplyStacks = async () => {
  lineReader.on("line", function (line) {
    const [amount, start, end] = line
      .replaceAll(/[a-z]+ /g, "")
      .trim()
      .split(" ");
    // Get crates
    let cratesToMove = stacks[start - 1].slice(`-${amount}`);
    // Remove crates
    for (let i = 0; i < amount; i++) stacks[start - 1].pop();
    // Add crates
    stacks[end - 1] = [...stacks[end - 1], ...cratesToMove];
  });

  await require("events").once(lineReader, "close");
  stacks.forEach((stack) => (result += stack[stack.length - 1]));
  console.log(result);
};

supplyStacks();
