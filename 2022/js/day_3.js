Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}
Array.prototype.chunked = function (size) {
  return Array.from(
      {length: this.length / size},
      (_, index) => this.slice(index * size, index * size + size)
  )
}
String.prototype.isLowercase = function () {
  return this.toLowerCase() === String(this)
}


function part1(input) {
  const lines = input.split("\n")
  
  const commonCharPerLine = lines.map(line => {
    const [firstHalfChars, secondHalfChars] = [...line].chunked(line.length / 2);
    return firstHalfChars.find(c => secondHalfChars.includes(c))
  })
  
  return commonCharPerLine.map(toPriority).sum()
}

function part2(input) {
  const lines = input.split("\n")
  const groups = lines.chunked(3);
  
  const commonCharPerGroup = groups.map(group => {
    const [first, second, third] = group;
    return [...first].find(c => second.includes(c) && third.includes(c))
  })
  
  return commonCharPerGroup.map(toPriority).sum()
}

function toPriority(char) {
  const charCode = char.charCodeAt(0);
  if (char.isLowercase()) {
    return charCode - 'a'.charCodeAt(0) + 1;
  } else {
    return charCode - 'A'.charCodeAt(0) + 27;
  }
}

module.exports = {part1, part2};