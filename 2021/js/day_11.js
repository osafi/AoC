Array.prototype.transpose = function () {
    return this[0].map((_, colIndex) => this.map(row => row[colIndex]));
}

function toIntMatrix(input) {
    return input.split("\n").map(s => s.split("").map(s => +s)).transpose()
}

function increaseEnergy(octopi) {
    for (let x = 0; x < octopi.length; x++) {
        for (let y = 0; y < octopi[x].length; y++) {
            octopi[x][y]++
        }
    }

}

Array.prototype.matrixIterator = function* () {
    for (let x = 0; x < this.length; x++) {
        for (let y = 0; y < this[x].length; y++) {
            const value = this[x][y];
            yield [value, x, y];
        }
    }
}

function performFlash(octopi) {
    for(let [octopus, x, y] of octopi.matrixIterator()) {
        if(octopus)
    }
}

function part1(input) {
    const octopi = toIntMatrix(input)
    increaseEnergy(octopi)
    return ''
}

function part2(input) {
    return '';
}

module.exports = {part1, part2};