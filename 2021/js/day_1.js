Array.prototype.windowed = function (size) {
    return Array.from(
        {length: this.length - (size - 1)},
        (_, index) => this.slice(index, index + size)
    )
}
Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}
const sum = (array) => array.reduce((a, b) => a + b, 0)

function part1(input) {
    return input.split("\n").map(s => +s).windowed(2).count(([a, b]) => a < b)
}

function part2(input) {
    return input.split("\n").map(s => +s).windowed(3).map(sum).windowed(2).count(([a, b]) => a < b);
}

module.exports = {part1, part2};