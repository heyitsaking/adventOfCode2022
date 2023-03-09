var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

/*
 * ROCK      - A (1)
 * PAPER     - B (2)
 * SCISSORS  - C (3)
 */

const outcome = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
};

let total = 0;

const rockPaperScissors = async () => {
  lineReader.on("line", function (line) {
    const [opp, me] = line.split(" ");
    total += outcome[opp][me];
  });

  await require("events").once(lineReader, "close");
  console.log(total);
};

rockPaperScissors();
