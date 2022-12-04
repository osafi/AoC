Array.prototype.count = function (predicate) {
  return this.filter(predicate).length;
}
Array.prototype.toNum = function () {
  return this.map(i => Number(i));
}

function part1(input) {
  return input
    .split("\n")
    .map(l => l.match(/(\d*)-(\d*),(\d*)-(\d*)/).slice(1, 5).toNum())
    .count(([s1, e1, s2, e2]) => (s1 <= s2 && e1 >= e2) || (s2 <= s1 && e2 >= e1))
}

function part2(input) {
  return input
    .split("\n")
    .map(l => l.match(/(\d*)-(\d*),(\d*)-(\d*)/).slice(1, 5).toNum())
    .count(([s1, e1, s2, e2]) => (s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1))
}

module.exports = {part1, part2};