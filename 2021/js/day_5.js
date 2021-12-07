function parseLines(input) {
    return input.split("\n").map(range => {
        const match = range.match(/(\d+),(\d+) -> (\d+),(\d+)/)
        return {x1: +match[1], y1: +match[2], x2: +match[3], y2: +match[4]};
    });
}

function* range(start, stop, step = 1) {
    if (stop == null) {
        stop = start;
        start = 0;
    }
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}

Array.prototype.count = function (predicate) {
    return this.filter(predicate).length;
}

function solve(lines) {
    let pointCoveredCount = {};
    lines.forEach(({x1, y1, x2, y2}) => {
        pointCoveredCount[[x1, y1]] = -~pointCoveredCount[[x1, y1]];
        pointCoveredCount[[x2, y2]] = -~pointCoveredCount[[x2, y2]];
        if (x1 === x2) {
            const min = Math.min(y1, y2);
            const max = Math.max(y1, y2);
            for (let y of range(min + 1, max)) {
                pointCoveredCount[[x1, y]] = -~pointCoveredCount[[x1, y]];
            }
        } else if (y1 === y2) {
            const min = Math.min(x1, x2);
            const max = Math.max(x1, x2);
            for (let x of range(min + 1, max)) {
                pointCoveredCount[[x, y1]] = -~pointCoveredCount[[x, y1]];
            }
        } else {
            const dx = x1 < x2 ? 1 : -1;
            const dy = y1 < y2 ? 1 : -1;
            for (let i of range(1, Math.abs(x2 - x1))) {
                const point = [x1 + i * dx, y1 + i * dy];
                pointCoveredCount[point] = -~pointCoveredCount[point];
            }
        }
    });

    return Object.values(pointCoveredCount).count(coverCount => coverCount > 1);
}

function part1(input) {
    const linesExcludingDiagonals = parseLines(input).filter(l => l.x1 === l.x2 || l.y1 === l.y2);
    return solve(linesExcludingDiagonals);
}

function part2(input) {
    return solve(parseLines(input));
}

module.exports = {part1, part2};