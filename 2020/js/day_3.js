Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

Array.prototype.product = function () {
    return this.reduce((acc, val) => acc * val, 1);
}

function treeEncounters(map, slope) {
    const input = map.split('\n')
        .map(r => Array.from(r))

    const mapHeight = input.length
    const mapWidth = input[0].length
    const [slopeX, slopeY] = slope;

    return Array.from({length: mapHeight / slopeY})
        .map((_, i) => input[i * slopeY][(i * slopeX) % mapWidth])
        .count(symbol => symbol === '#')
}

function part1(input) {
    return treeEncounters(input, [3, 1]);
}

function part2(input) {
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    return slopes.map(s => treeEncounters(input, s)).product();
}

module.exports = {part1, part2};