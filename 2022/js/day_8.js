Array.matrix = function (rows, columns, fillValue = 0) {
  return Array(rows).fill(0).map(e => Array(columns).fill(0).map(_ => fillValue));
}
Array.prototype.max = function () {
  return this.reduce((acc, val) => Math.max(acc, val), Number.MIN_SAFE_INTEGER);
}
Array.prototype.matrixIterator = function* (xOffset = 0, yOffset = 0) {
  for (let x = xOffset; x < this.length - xOffset; x++) {
      for (let y = yOffset; y < this[x].length - yOffset; y++) {
          const value = this[x][y];
          yield [value, x, y];
      }
  }
}
Array.prototype.transpose = function () {
  return this[0].map((_, colIndex) => this.map(row => row[colIndex]));
}
String.prototype.toIntMatrix = function () {
  return this.split("\n").map(s => s.split("").map(s => +s)).transpose();
}

function part1(input) {
  const treeHeights = input.toIntMatrix();

  let visibleCount = 0;
  for (let [value, x, y] of treeHeights.matrixIterator()) {
    const maxLeft = treeHeights.slice(0, x).map(r => r[y]).max();
    const maxRight = treeHeights.slice(x + 1).map(r => r[y]).max();
    const maxAbove = treeHeights[x].slice(0, y).max();
    const maxBelow = treeHeights[x].slice(y + 1).max();
    if (value > Math.min(maxLeft, maxRight, maxAbove, maxBelow)) {
      visibleCount++;
    }
  }

  return visibleCount;
}

const range = function* (startInclusive, endExclusive, step) {
  if (endExclusive === undefined) {
    endExclusive = startInclusive;
    startInclusive = 0;
  }
  if (step === undefined) {
    step = startInclusive < endExclusive ? 1 : -1;
  }
  if (startInclusive < endExclusive) {
    for (let x = startInclusive; x < endExclusive; x += step) {
      yield x;
    }
  } else {
    for (let x = startInclusive; x > endExclusive; x += step) {
      yield x;
    }
  }
}

function part2(input) {
  const treeHeights = input.toIntMatrix();

  let max = 0;

  for (let [value, x, y] of treeHeights.matrixIterator(1, 1)) {
    let visibleLeft = 0;
    for (let lx of range(x - 1, -1)) {
      visibleLeft++;
      if (value <= treeHeights[lx][y]) {
        break;
      }
    }

    let visibleRight = 0;
    for (let rx of range(x + 1, treeHeights.length)) {
      visibleRight++;
      if (value <= treeHeights[rx][y]) {
        break;
      }
    }

    let visibleAbove = 0;
    for (let ay of range(y - 1, -1)) {
      visibleAbove++;
      if (value <= treeHeights[x][ay]) {
        break;
      }
    }

    let visibleBelow = 0;
    for (let by of range(y + 1, treeHeights[x].length)) {
      visibleBelow++;
      if (value <= treeHeights[x][by]) {
        break;
      }
    }

    max = Math.max(max, visibleLeft * visibleRight * visibleAbove * visibleBelow);
  }

  return max;
}

module.exports = {part1, part2};