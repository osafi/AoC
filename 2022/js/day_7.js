Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
}
Array.prototype.min = function () {
  return this.reduce((acc, val) => Math.min(acc, val));
}

function calculateDirectorySizes(input) {
  const dirSizes = {};
  const cwd = [];

  for (const line of input.split("\n")) {
    if (line.startsWith("$ ls") || line.startsWith("dir")) {
      continue;
    }
    if (line.startsWith("$ cd")) {
      const dir = line.split(" ")[2];
      if (dir === "..") {
        cwd.pop();
      } else {
        cwd.push(dir);
      }
    } else {
      const fileSize = Number(line.split(" ")[0]);
      for (let i = cwd.length; i > 0; i--) {
        const dirToUpdate = cwd.slice(0, i);
        dirSizes[dirToUpdate] = fileSize + (dirSizes[dirToUpdate] ?? 0);
      }
    }
  }

  return dirSizes;
}

function part1(input) {
  const dirSizes = calculateDirectorySizes(input);
  return Object.values(dirSizes).filter(dirSize => dirSize < 100000).sum()
}

function part2(input) {
  const dirSizes = calculateDirectorySizes(input);
  const spaceAvailable = 70000000 - dirSizes['/'];
  const spaceNeeded = 30000000 - spaceAvailable;
  return Object.values(dirSizes).filter(dirSize => dirSize >= spaceNeeded).min()
}

module.exports = {part1, part2};