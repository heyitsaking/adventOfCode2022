var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(`${__dirname}/input.txt`),
});

/*
 * The start of a packet is indicated by a sequence of four characters that are all different.
 */
let result = 0;

const checkUnique = (array) => {
  return array.length === [...new Set(array)].length;
};

const tuningTrouble = async () => {
  lineReader.on("line", function (line) {
    let sequenceLength = 4;
    for (let i = 0; i + sequenceLength <= line.length; i++) {
      if (checkUnique([...line.substring(i, i + sequenceLength)])) {
        result = i + sequenceLength;
        return;
      }
    }
  });

  await require("events").once(lineReader, "close");
  console.log(result);
};

tuningTrouble();
