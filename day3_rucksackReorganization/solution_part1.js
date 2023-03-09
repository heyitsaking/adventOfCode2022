var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

/*
 * Lowercase item types a through z have priorities 1 through 26.
 * Uppercase item types A through Z have priorities 27 through 52.
 */
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const priorities = [...alphabet.split(""), ...alphabet.toUpperCase().split("")];

let total = 0;

const rucksackReorg = async () => {
  lineReader.on("line", function (line) {
    const middle = line.length / 2;
    const before = line.substring(0, middle);
    const after = line.substring(middle);

    new Array(...before).every((letter) => {
      if (after.includes(letter)) {
        total += priorities.indexOf(letter) + 1;
        return false;
      }
      return true;
    });
  });

  await require("events").once(lineReader, "close");
  console.log(total);
};

rucksackReorg();
