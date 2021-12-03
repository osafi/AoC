Array.prototype.transpose = function () {
    return this[0].map((_, colIndex) => this.map(row => row[colIndex]));
}
Array.prototype.average = function () {
    return this.reduce((acc, val) => acc + +val, 0) / this.length;
}

function commonBits(binaryStrings) {
    return binaryStrings.map(b => [...b])
        .transpose()
        .map(p => Math.round(p.average()));
}

function part1(input) {
    const gammaBits = commonBits(input.split("\n"))
    const epsilonBits = gammaBits.map(b => b ^ 1)
    return parseInt(gammaBits.join(""), 2) * parseInt(epsilonBits.join(""), 2);
}

function part2(input) {
    let position = 0;
    let oxyPool = input.split("\n")
    while (oxyPool.length > 1) {
        const commonBit = commonBits(oxyPool)[position]
        oxyPool = oxyPool.filter(b => +b.charAt(position) === commonBit)
        position++;
    }

    position = 0;
    let c02Pool = input.split("\n")
    while (c02Pool.length > 1) {
        const commonBit = commonBits(c02Pool)[position]
        c02Pool = c02Pool.filter(b => +b.charAt(position) === (commonBit ^ 1))
        position++;
    }

    return parseInt(oxyPool[0], 2) * parseInt(c02Pool[0], 2);
}

module.exports = {part1, part2};