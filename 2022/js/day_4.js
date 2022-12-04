Array.prototype.count = function (predicate) {
  return this.filter(predicate).length;
}
Array.prototype.toNum = function () {
  return this.map(i => i.constructor === Array ? i.toNum() : Number(i));
}
String.prototype.recursiveSplit = function (...delimiters) {
  const [delimiter, ...rest] = delimiters;
  if (typeof delimiter === 'string') {
    return this.split(delimiter).map(s => s.recursiveSplit(...rest));
  }
  return this;
}

function part1(input) {
  return input
    .recursiveSplit("\n", ",", "-")
    .toNum()
    .count(([[s1, e1], [s2, e2]]) => (s1 <= s2 && e1 >= e2) || (s2 <= s1 && e2 >= e1))
}

function part2(input) {
  return input
    .recursiveSplit("\n", ",", "-")
    .toNum()
    .count(([[s1, e1], [s2, e2]]) => (s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1))
}

module.exports = {part1, part2};