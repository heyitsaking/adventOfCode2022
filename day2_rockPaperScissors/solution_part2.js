var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

/*
 * ROCK      - A (1)
 * PAPER     - B (2)
 * SCISSORS  - C (3)
 */

const outcome = {
  // Lose - Points equal hand value
  X: { A: 3, B: 1, C: 2 },
  // Tie - Points equal hand value + 3
  Y: { A: 4, B: 5, C: 6 },
  // Win - Points equal hand value + 6
  Z: {
    A: 8,
    B: 9,
    C: 7,
  },
};

let total = 0;

const rockPaperScissors = async () => {
  lineReader.on("line", function (line) {
    const [opp, expected] = line.split(" ");
    total += outcome[expected][opp];
  });

  await require("events").once(lineReader, "close");
  console.log(total);
};

rockPaperScissors();
