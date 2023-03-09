var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(`${__dirname}/input.txt`),
});

/*
 * The start of a packet is indicated by a sequence of four characters that are all different.
 */
let result = 0;

const tuningTrouble = async () => {
  lineReader.on("line", function (line) {
    
  });

  await require("events").once(lineReader, "close");
  console.log(result);
};

tuningTrouble();
