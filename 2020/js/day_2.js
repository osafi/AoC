Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

String.prototype.charCount = function (character) {
    return (this.match(new RegExp(character, "g")) || []).length
}

const rowFormat = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/gm

function part1(input) {
    return [...input.matchAll(rowFormat)].count(([_, min, max, character, pass]) => {
        const charCount = pass.charCount(character)
        return +min <= charCount && charCount <= +max
    })
}

function part2(input) {
    return [...input.matchAll(rowFormat)].count(([_, pos1, pos2, character, pass]) => {
        return pass.charAt(pos1 - 1) === character ^ pass.charAt(pos2 - 1) === character
    })
}

module.exports = {part1, part2};