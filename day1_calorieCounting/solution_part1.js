var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let highest = 0;

(async function getCalories() {
  let current = 0;
  lineReader.on("line", function (line) {
    if (line === "") {
      if (current > highest) {
        highest = current;
      }
      current = 0;
      return;
    }
    current += parseInt(line);
  });

  await require("events").once(lineReader, "close");
  console.log(highest);
})();
