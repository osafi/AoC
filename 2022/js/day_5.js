Array.prototype.chunked = function (size) {
  return Array.from(
      {length: this.length / size},
      (_, index) => this.slice(index * size, index * size + size)
  )
}
Array.prototype.transpose = function () {
  return this[0].map((_, colIndex) => this.map(row => row[colIndex]));
}
String.prototype.extractNumbers = function (lineDelimiter = "\n") {
  return this.split(lineDelimiter).map(line => line.match(/-?\d+/g).map(i => +i))
}

function parseInput(input) {
  const [topSection, bottomSection] = input.split("\n\n");

  const stacks = topSection
    .substring(0, topSection.lastIndexOf("\n") + 1) // remove last line of string but keep line break
    .split(/(?<=\n)/g) // split on new line but keep new line character so chunking is easier
    .map(l => [...l].chunked(4)) // group characters in each line in chunks of 4
    .map(a => a.map(b => b[1])) // extract the second element (either a letter or space) from each group
    .transpose()
    .map(c => c.filter(d => d !== ' ')); // remove blanks;
  
  const instructions = bottomSection.extractNumbers()
  
  return { stacks, instructions }
}

function part1(input) {
  const { stacks, instructions } = parseInput(input);

  instructions.forEach(([qty, from, to]) => {
    const srcStack = stacks[from - 1];
    const destStack = stacks[to - 1];
    const removed = srcStack.splice(0, qty);
    destStack.unshift(...removed.reverse());
  });

  return stacks.map(s => s.at(0)).join("")
}

function part2(input) {
  const { stacks, instructions } = parseInput(input);

  instructions.forEach(([qty, from, to]) => {
    const srcStack = stacks[from - 1];
    const destStack = stacks[to - 1];
    const removed = srcStack.splice(0, qty);
    destStack.unshift(...removed);
  });

  return stacks.map(s => s.at(0)).join("")
}

module.exports = {part1, part2};