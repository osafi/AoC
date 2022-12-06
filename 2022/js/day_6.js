Array.prototype.windowed = function (size) {
  return Array.from(
      {length: this.length - (size - 1)},
      (_, index) => this.slice(index, index + size)
  )
}

function markerLocation(input, distinctCharacterLength) {
  return distinctCharacterLength +
    [...input].windowed(distinctCharacterLength)
              .map(l => new Set(l))
              .findIndex(s => s.size === distinctCharacterLength);
}

function part1(input) {
  return markerLocation(input, 4);
}

function part2(input) {
  return markerLocation(input, 14);
}

module.exports = {part1, part2};