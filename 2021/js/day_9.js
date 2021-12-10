Array.prototype.product = function () {
    return this.reduce((acc, val) => acc * val, 1);
}
Array.prototype.sorted = function (compareFn) {
    let tmp = [...this];
    tmp.sort(compareFn);
    return tmp;
}
Array.prototype.transpose = function () {
    return this[0].map((_, colIndex) => this.map(row => row[colIndex]));
}

function toIntMatrix(input) {
    return input.split("\n").map(s => s.split("").map(s => +s)).transpose()
}

Array.prototype.matrixIterator = function* () {
    for (let x = 0; x < this.length; x++) {
        for (let y = 0; y < this[x].length; y++) {
            const value = this[x][y];
            yield [value, x, y];
        }
    }
}

function neighbors(matrix, x, y, outOfBoundsValue = Number.MAX_SAFE_INTEGER) {
    return {
        above: matrix[x][y - 1] ?? outOfBoundsValue,
        below: matrix[x][y + 1] ?? outOfBoundsValue,
        left: matrix[x - 1] ? matrix[x - 1][y] : outOfBoundsValue,
        right: matrix[x + 1] ? matrix[x + 1][y] : outOfBoundsValue,
    };
}

const isLowPoint = (value, neighbors) => Object.values(neighbors).every(neighbor => value < neighbor);

function findLowPoints(map) {
    const lowCoords = []
    for (let [value, x, y] of map.matrixIterator()) {
        if (isLowPoint(value, neighbors(map, x, y))) lowCoords.push([x, y]);
    }
    return lowCoords;
}

function part1(input) {
    const map = toIntMatrix(input);
    return findLowPoints(map).reduce((acc, [x, y]) => acc + map[x][y] + 1, 0)
}

Array.prototype.includesArray = function (otherArray) {
    return this.some((arr) => {
        if (arr.length !== otherArray.length) return false;
        return arr.every((value, i) => value === otherArray[i])
    })
}

function findBasin(map, x, y, basin = []) {
    basin.push([x, y]);
    const {above, below, left, right} = neighbors(map, x, y);
    if (above < 9 && !basin.includesArray([x, y - 1])) {
        findBasin(map, x, y - 1, basin);
    }
    if (below < 9 && !basin.includesArray([x, y + 1])) {
        findBasin(map, x, y + 1, basin);
    }
    if (left < 9 && !basin.includesArray([x - 1, y])) {
        findBasin(map, x - 1, y, basin);
    }
    if (right < 9 && !basin.includesArray([x + 1, y])) {
        findBasin(map, x + 1, y, basin);
    }
    return basin;
}

function part2(input) {
    const map = toIntMatrix(input);
    const lowPoints = findLowPoints(map);
    return lowPoints.map(([x, y]) => findBasin(map, x, y).length)
        .sorted((a, b) => b - a)
        .slice(0, 3)
        .product();
}

module.exports = {part1, part2};