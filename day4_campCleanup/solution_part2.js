var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

/*
 * Some of the pairs have noticed that one of their assignments fully contains the other.
 * For example, 2-8 fully contains 3-7, and 6-6 is fully contained by 4-6.
 */
let total = 0;

const checkRanges = (first, second) => {
  if (first[0] <= second[1] && first[1] >= second[0]) {
    return true;
  }
  return false;
};

const campCleanup = async () => {
  lineReader.on("line", function (line) {
    const ranges = line
      .split(",")
      .map((values) => values.split("-").map((val) => parseInt(val)));

    if (checkRanges(ranges[0], ranges[1])) total++;
  });

  await require("events").once(lineReader, "close");
  console.log(total);
};

campCleanup();
