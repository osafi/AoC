function part1(input) {
  var lines = input.split('\n');
  var firstColumn = lines.map(l => Number(l.split(' ')[0]));
  var secondColumn = lines.map(l => Number(l.split(' ').at(-1)));

  firstColumn.sort();
  secondColumn.sort();

  var sum = 0;
  for (let x = 0; x < firstColumn.length; x++) {
    sum += Math.abs(firstColumn[x] - secondColumn[x]);
  }

  return sum;
}

function part2(input) {
  var lines = input.split('\n');
  var firstColumn = lines.map(l => Number(l.split(' ')[0]));
  var secondColumn = lines.map(l => Number(l.split(' ').at(-1)));

  let sum = 0;
  for (const num1 of firstColumn) {
    sum += num1 * secondColumn.filter(x => x === num1).length;
  }
  return sum;
}

module.exports = {part1, part2};