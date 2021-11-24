const fs = require('fs');
const input =
    fs.readFileSync(process.stdin.fd)
        .toString()
        .split('\n')
        .map(i => Number(i));

Array.prototype.combinations = function (comboLength) {
    function choose(array, comboLengthRemaining, accumulation = []) {
        if (comboLengthRemaining == 0) return [accumulation];
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

const combinations = 3;

const result =
    input.combinations(combinations)
        .find((tuple) => tuple.sum() === 2020)
        .product();

console.log(result);
