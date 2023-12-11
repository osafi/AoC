Array.prototype.intersect = function(...a) {
  return [this,...a].reduce((p,c) => p.filter(e => c.includes(e)));
}

Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}

function parseCard(line) {
  const parts = line.split(":");
  const numbers = parts[1].split("|");
  const winningNums = [...numbers[0].matchAll(/\d+/g)].map(([n]) => +n);
  const haveNums = [...numbers[1].matchAll(/\d+/g)].map(([n]) => +n);
  return { winningNums, haveNums };
}

function calculateCardScore({ winningNums, haveNums }) {
  const matchingNums = winningNums.intersect(haveNums);
  return matchingNums.length === 0 ? 0 : Math.pow(2, matchingNums.length - 1);
}

function part1(input) {
  return input
    .split("\n")
    .map(parseCard)
    .map(calculateCardScore)
    .sum();
}

function part2(input) {
  const lines = input.split("\n");
  const cardCounts = new Array(lines.length).fill(1);

  lines
    .map(parseCard)
    .map(({ winningNums, haveNums }) => winningNums.intersect(haveNums).length)
    .forEach((copies, currentCardIndex) => {
      for (let i = 1; i <= copies; i++) {
        cardCounts[currentCardIndex + i] += cardCounts[currentCardIndex];
      }
    });

  return cardCounts.sum();
}

module.exports = {part1, part2};