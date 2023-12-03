Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}

function findAll(lines, regex) {
  return lines.flatMap((l, lineNum) => 
    [...l.matchAll(regex)].map(match => ({
      part: Number(match[0]),
      start: match.index,
      end: match.index + match[0].length,
      line: lineNum,
    }))
  );
}

function isAdjacent(match1, match2) {
  return match1.start <= match2.end &&
    match1.end >= match2.start &&
    Math.abs(match1.line - match2.line) <= 1;
}

function part1(input) {
  const partNumbers = findAll(input.split("\n"), /\d+/g);
  const symbols = findAll(input.split("\n"), /[^.\d]/g);

  return partNumbers
    .filter(partNum => symbols.some(symbol => isAdjacent(partNum, symbol)))
    .map(partNum => partNum.part)
    .sum();
}

function part2(input) {
  const partNumbers = findAll(input.split("\n"), /\d+/g);
  const gears = findAll(input.split("\n"), /\*/g);

  return gears.map(gear => {
      const adjacentNums = partNumbers.filter(part => isAdjacent(gear, part));
      return adjacentNums.length === 2 ? adjacentNums[0].part * adjacentNums[1].part : 0
    })
    .sum();
}

module.exports = {part1, part2};