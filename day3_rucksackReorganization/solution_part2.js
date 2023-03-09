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

let elfGroup = [];

const rucksackReorg = async () => {
  lineReader.on("line", function (line) {
    elfGroup.push(line);

    if (elfGroup.length === 3) {
      new Array(...elfGroup[0]).every((letter) => {
        if (elfGroup[1].includes(letter) && elfGroup[2].includes(letter)) {
          total += priorities.indexOf(letter) + 1;
          return false;
        }
        return true;
      });
      elfGroup = [];
    }
  });

  await require("events").once(lineReader, "close");
  console.log(total);
};

rucksackReorg();
