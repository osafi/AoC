function part1(input) {
    let x = 0, y = 0;
    const commands = {
        forward: (n) => x += n,
        down: (n) => y += n,
        up: (n) => y -= n,
    };
    [...input.matchAll(/(\w+) (\d+)/g)].forEach(([_, dir, n]) => commands[dir](Number(n)))
    return x * y;
}

function part2(input) {
    let x = 0, y = 0, aim = 0;
    const commands = {
        forward: (n) => (x += n, y += (n * aim)),
        down: (n) => aim += n,
        up: (n) => aim -= n,
    };
    [...input.matchAll(/(\w+) (\d+)/g)].forEach(([_, dir, n]) => commands[dir](Number(n)))
    return x * y;
}

module.exports = {part1, part2};