const input = require('fs').readFileSync(process.stdin.fd).toString();

const depths = input.split("\n").map(s => +s);

Array.prototype.windowed = function (size) {
    return Array.from(
        {length: this.length - (size - 1)},
        (_, index) => this.slice(index, index + size)
    )
}
Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

const part1Result = depths.count((depth, index, array) => depth > array[index - 1])
console.log("part 1:", part1Result);

const part2Result =
    depths.windowed(3)
        .map(s => s.reduce((a, b) => a + b))
        .count((depth, index, array) => depth > array[index - 1])

console.log("part 2:", part2Result);