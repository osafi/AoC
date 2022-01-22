Array.matrix = function (rows, columns, fillValue = 0) {
    return [...Array(rows)].map(_ => Array(columns).fill(fillValue));
}

function parseInput(input) {
    const coordRegex = /^(\d+),(\d+)$/gm;
    const dots = [...input.matchAll(coordRegex)].map(m => ({x: +m[1], y: +m[2]}));

    const foldRegex = /fold along ([xy])=(\d+)/gm;
    const instructions = [...input.matchAll(foldRegex)].map(m => m[1] === "x" ? {x: +m[2]} : {y: +m[2]});

    return {dots, instructions};
}

function fold(dots, instruction) {
    const newDots = dots.map(({x, y}) => {
        if (x > instruction.x) {
            const dx = x - instruction.x;
            return {x: x - 2 * dx, y};
        }
        if (y > instruction.y) {
            const dy = y - instruction.y;
            return {x, y: y - 2 * dy};
        }
        return {x, y};
    });

    const uniqueDots = new Set();
    return newDots.filter(d => {
        const duplicate = uniqueDots.has(`${d.x},${d.y}`);
        uniqueDots.add(`${d.x},${d.y}`);
        return !duplicate;
    });
}

function part1(input) {
    const {dots, instructions: [firstInstruction]} = parseInput(input);
    return fold(dots, firstInstruction).length
}

function matrixToString(matrix) {
    let string = "";
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            string +=  matrix[y][x];
        }
        string += "\n";
    }
    return string;
}

function part2(input) {
    const {dots, instructions} = parseInput(input);
    const foldedDots = instructions.reduce((currentDots, instruction) => fold(currentDots, instruction), dots)
    const {maxX, maxY} = foldedDots.reduce(({maxX, maxY}, {x, y}) => ({maxX: Math.max(maxX, x), maxY: Math.max(maxY, y)}), {maxX: 0, maxY: 0})

    const matrix = foldedDots.reduce((paper, dot) => (paper[dot.y][dot.x] = '█', paper), Array.matrix(maxY + 1, maxX + 1, " "))
    return "\n" +  matrixToString(matrix)
}

module.exports = {part1, part2};