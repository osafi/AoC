Array.prototype.combinations = function (comboLength) {
    function choose(array, comboLengthRemaining, accumulation = []) {
        if (comboLengthRemaining === 0) return [accumulation];
        return array.flatMap((element, index) =>
            choose(array.slice(index + 1), comboLengthRemaining - 1, [...accumulation, element])
        );
    }

    return choose(this, comboLength);
}

Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

Array.prototype.product = function () {
    return this.reduce((acc, val) => acc * val, 1);
}

function part1(input) {
    return input.split("\n").map(i => +i)
        .combinations(2)
        .find((tuple) => tuple.sum() === 2020)
        .product();
}

function part2(input) {
    return input.split("\n").map(i => +i)
        .combinations(3)
        .find((tuple) => tuple.sum() === 2020)
        .product();
}

module.exports = {part1, part2};