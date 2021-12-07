function* range(start, stop, step = 1) {
    if (stop == null) {
        stop = start;
        start = 0;
    }
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}
Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

function solve(input, moveCost) {
    const crabPositions = input.split(",").map(i => +i)
    const minPosition = Math.min(...crabPositions)
    const maxPosition = Math.max(...crabPositions)

    let bestCost = Number.MAX_SAFE_INTEGER
    for (let targetPosition of range(minPosition, maxPosition)) {
        const cost = crabPositions.map(crabPosition => moveCost(crabPosition, targetPosition)).sum();
        if (cost < bestCost) {
            bestCost = cost;
        }
    }

    return bestCost
}

function part1(input) {
    return solve(input, (crabPosition, targetPosition) => Math.abs(crabPosition - targetPosition));
}

function part2(input) {
    return solve(input, (crabPosition, targetPosition) => {
        const positionsToMove = Math.abs(crabPosition - targetPosition)
        return (positionsToMove * (positionsToMove + 1)) / 2; //nth triangle
    });
}

module.exports = {part1, part2};