Array.prototype.sorted = function (compareFn) {
    let tmp = [...this];
    tmp.sort(compareFn);
    return tmp;
}

String.prototype.numberOfLettersInCommon = function (other) {
    const otherAsSet = new Set([...other]);
    return new Set([...this].filter(x => otherAsSet.has(x))).size;
}

Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

const knownSegmentsRegex = /\b(\w{2})\b|\b(\w{3})\b|\b(\w{4})\b|\b(\w{7})\b/g

function part1(input) {
    return input.split("\n")
        .map(l => l.split("|")[1])
        .join(" ")
        .match(knownSegmentsRegex)
        .length
}

function part2(input) {
    const lines = input.split("\n")

    return lines.map(l => {
        const [patternText, outputText] = l.split("|")

        const [one, seven, four, eight] = patternText.match(knownSegmentsRegex).sorted((a, b) => a.length - b.length)

        const zeroSixOrNinePatterns = patternText.split(" ").filter(s => s.length === 6);
        const nine = zeroSixOrNinePatterns.find(p => p.numberOfLettersInCommon(four) === 4);
        const zero = zeroSixOrNinePatterns.filter(p => p !== nine).find(p => p.numberOfLettersInCommon(seven) === 3);
        const six = zeroSixOrNinePatterns.filter(p => p !== nine && p !== zero)[0];

        const twoThreeOrFivePatterns = patternText.split(" ").filter(s => s.length === 5);
        const five = twoThreeOrFivePatterns.find(p => p.numberOfLettersInCommon(six) === 5);
        const three = twoThreeOrFivePatterns.filter(p => p !== five).find(p => p.numberOfLettersInCommon(four) === 3);
        const two = twoThreeOrFivePatterns.filter(p => p !== five && p !== three)[0];

        const patterns = [zero, one, two, three, four, five, six, seven, eight, nine];

        const decodedAsString =
            outputText.trim()
                .split(" ")
                .map(o => patterns.findIndex(p => o.length === p.length && o.numberOfLettersInCommon(p) === o.length))
                .join("")
        return parseInt(decodedAsString);
    }).sum();
}

module.exports = {part1, part2};