Array.matrix = function (rows, columns, fillValue = 0) {
    return [...Array(rows)].map(e => Array(columns).fill(fillValue));
}
Array.prototype.transpose = function () {
    return this[0].map((_, colIndex) => this.map(row => row[colIndex]));
}
Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

function parseInput(input) {
    const firstLineEndIndex = input.indexOf("\n\n");
    const numbers = input.substring(0, firstLineEndIndex).split(",").map(n => +n);

    const boards = input
        .substring(firstLineEndIndex + 2)
        .split("\n\n")
        .map(s => s.trim().split("\n").map(s => s.trim().split(/\s+/).map(s => +s)));

    return {boards, numbers};
}

function updateBoard(board, number) {
    for (let y = 0; y < board.length; y++) {
        const x = board[y].indexOf(number);
        if (x !== -1) {
            board[y][x] = "X"
        }
    }
}

function boardHasWin(board) {
    return board.some(row => row.every(n => n === "X")) || board.transpose().some(column => column.every(n => n === "X"))
}

function calculateScore({board, winningNumber}) {
    return board.flat().filter(n => n !== "X").sum() * winningNumber
}

function boardsInWinOrder(input) {
    let {numbers, boards} = parseInput(input)

    const winningBoards = []
    for (const numberCalled of numbers) {
        for (const b of boards) {
            updateBoard(b, numberCalled);
            if (boardHasWin(b)) {
                winningBoards.push({winningNumber: numberCalled, board: b});
            }
        }
        boards = boards.filter(b => !winningBoards.map(w => w.board).includes(b));
    }
    return winningBoards;
}

function part1(input) {
    const winningBoards = boardsInWinOrder(input);
    return calculateScore(winningBoards[0])
}

function part2(input) {
    const winningBoards = boardsInWinOrder(input);
    return calculateScore(winningBoards[winningBoards.length - 1])
}

module.exports = {part1, part2};