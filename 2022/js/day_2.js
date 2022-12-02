Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}

// A: Rock, B: Paper, C: Scissors
// X: Rock, Y: Paper, Z: Scissors

// Rock: 1, Paper: 2, Scissors: 3
// Loss: 0, Draw: 3, Win: 6
const part1Lookup = {
  "A X": 1 + 3,
  "B X": 1 + 0,
  "C X": 1 + 6,
  "A Y": 2 + 6,
  "B Y": 2 + 3,
  "C Y": 2 + 0,
  "A Z": 3 + 0,
  "B Z": 3 + 6,
  "C Z": 3 + 3,
}

function part1(input) {
  return input.split("\n").map(round => part1Lookup[round]).sum();
}

const part2Lookup = {
  "A X": 0 + 3,
  "B X": 0 + 1,
  "C X": 0 + 2,
  "A Y": 3 + 1,
  "B Y": 3 + 2,
  "C Y": 3 + 3,
  "A Z": 6 + 2,
  "B Z": 6 + 3,
  "C Z": 6 + 1,
}

function part2(input) {
  return input.split("\n").map(round => part2Lookup[round]).sum();
}

module.exports = {part1, part2};