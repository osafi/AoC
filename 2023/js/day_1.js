Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}

function extractCalibrationValue(line) {
  const matches = line.match(/\d/g);
  return Number(matches.at(0) + matches.at(-1));
}

function part1(input) {
  return input
    .split('\n')
    .map(extractCalibrationValue)
    .sum();
}

function replaceWords(input) {
  return input
    .replaceAll("one", "o1e")
    .replaceAll("two", "t2o")
    .replaceAll("three", "t3e")
    .replaceAll("four", "f4r")
    .replaceAll("five", "f5e")
    .replaceAll("six", "s6x")
    .replaceAll("seven", "s7n")
    .replaceAll("eight", "e8t")
    .replaceAll("nine", "n9e")
    .replaceAll("zero", "z4o")
}

function part2(input) {
  return input
    .split('\n')
    .map(replaceWords)
    .map(extractCalibrationValue)
    .sum();
}

module.exports = {part1, part2};