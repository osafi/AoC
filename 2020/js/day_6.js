String.prototype.letterFrequency = function () {
    return Array.from(this).reduce((acc, letter) => (acc[letter] = -~acc[letter], acc), {});
}

Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

function part1(input) {
    return input.split('\n\n')
        .map(s => s.replaceAll("\n", ""))
        .map(s => s.letterFrequency())
        .map(s => Object.keys(s).length)
        .sum();
}

function part2(input) {
    return input.split('\n\n')
        .map(s => s.split("\n").map(s => Array.from(s)))
        .map(s => s.reduce((a, b) => a.filter(c => b.includes(c))))
        .map(s => s.length)
        .sum();
}

module.exports = {part1, part2};