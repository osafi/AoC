Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}

const limits = {
  red: 12,
  blue: 14,
  green: 13,
}

function maxForColor(line, color) {
  const matches = [...line.matchAll(new RegExp(`(\\d+) ${color}`, "g"))];
  return Math.max(...matches.map(m => Number(m[1])));
}

function part1(input) {
  return input
    .split("\n")
    .filter(l => 
      maxForColor(l, 'red') <= limits['red'] &&
      maxForColor(l, 'blue') <= limits['blue'] &&
      maxForColor(l, 'green') <= limits['green']
    )
    .map(l => Number(l.split(":")[0].split(" ")[1]))
    .sum();
}

function part2(input) {
  return input
    .split("\n")
    .map(l => maxForColor(l, 'red') * maxForColor(l, 'blue') * maxForColor(l, 'green'))
    .sum();
}

module.exports = {part1, part2};