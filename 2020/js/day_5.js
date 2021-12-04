const mapping = {'F': '0', 'B': '1', 'L': '0', 'R': '1'};

function sortedSeats(input) {
    return input.split("\n")
        .map(r => r.replace(/[FBLR]/g, m => mapping[m]))
        .map(b => parseInt(b, 2))
        .sort((a, b) => a - b);
}

function part1(input) {
    const seats = sortedSeats(input);
    return seats[seats.length - 1];
}

function part2(input) {
    const seats = sortedSeats(input);
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] + 1 !== seats[i + 1]) {
            return seats[i] + 1
        }
    }
}

module.exports = {part1, part2};