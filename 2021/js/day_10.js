Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}
Array.prototype.sorted = function (compareFn) {
    let tmp = [...this];
    tmp.sort(compareFn);
    return tmp;
}

const symbols = {'[': ']', '{': '}', '(': ')', '<': '>'};

const balance = (line) => {
    const stack = [];
    let illegalCharacter = undefined;
    for (const symbol of [...line]) {
        if (symbols[symbol]) {
            stack.push(symbol);
        } else if (symbol !== symbols[stack.pop()]) {
            illegalCharacter = symbol;
            break;
        }
    }
    return {stack, illegalCharacter}
}

const cost = {')': 3, ']': 57, '}': 1197, '>': 25137, '(': 1, '[': 2, '{': 3, '<': 4}

function part1(input) {
    return input.split("\n").map(line => cost[balance(line).illegalCharacter] || 0).sum()
}

function part2(input) {
    const scores = input.split("\n")
        .map(line => balance(line))
        .filter(({illegalCharacter}) => !illegalCharacter)
        .map(({stack}) =>
            stack.reverse()
                .map(openSymbol => cost[openSymbol])
                .reduce((cost, closingCost) => cost * 5 + closingCost, 0)
        )
        .sorted((a, b) => a - b);

    return scores[Math.floor(scores.length / 2)];
}

module.exports = {part1, part2};