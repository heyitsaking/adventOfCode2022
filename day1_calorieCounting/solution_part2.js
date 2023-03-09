var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let highest = [0, 1, 2];

(async function getCalories() {
  let current = 0;
  lineReader.on("line", function (line) {
    if (line === "") {
      if (current > highest[0]) {
        highest[0] = current;
        highest.sort();
      }
      current = 0;
      return;
    }
    current += parseInt(line);
  });

  await require("events").once(lineReader, "close");
  let total = highest[0] + highest[1] + highest[2];
  console.log(total);
})();
