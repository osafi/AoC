Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}
String.prototype.splitAsNumbers = function (delimiter = "\n") {
  return this.split(delimiter).map(n => +n);
}

function calculateSortedTotalCaloriesPerElf(input) {
  const inventories = input.split("\n\n");
  const summedInventories = inventories.map(i => i.splitAsNumbers().sum())
  return summedInventories.sort((a, b) => b - a)
}

function part1(input) {
  return calculateSortedTotalCaloriesPerElf(input)[0];
}

function part2(input) {
  const totalCalByElf = calculateSortedTotalCaloriesPerElf(input);
  return totalCalByElf.slice(0, 3).sum();
}

module.exports = {part1, part2};