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
const sum = (array) => array.reduce((a, b) => a + b, 0)

console.log("part 1:", depths.windowed(2).count(([a, b]) => a < b));
console.log("part 2:", depths.windowed(3).map(sum).windowed(2).count(([a, b]) => a < b));