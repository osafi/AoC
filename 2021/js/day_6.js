Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}
Array.zeroed = (length) => Array(length).fill(0);

function solve(input, days) {
    let timersByDay = input.split(",")
        .map(f => +f)
        .reduce((acc, cur) => (++acc[cur], acc), Array.zeroed(9));

    Array.from({length: days}).forEach(() => {
        const newTimersByDay = Array.zeroed(9);
        timersByDay.forEach((timers, day) => {
            if (day === 0) {
                newTimersByDay[6] += timers;
                newTimersByDay[8] += timers;
            } else {
                newTimersByDay[day - 1] += timers;
            }
        })
        timersByDay = newTimersByDay;
    })

    return timersByDay.sum();
}

function part1(input) {
    return solve(input, 80);
}

function part2(input) {
    return solve(input, 256);
}

module.exports = {part1, part2};