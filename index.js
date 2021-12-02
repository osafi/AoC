const { performance } = require("perf_hooks");

const data = require('fs').readFileSync(process.stdin.fd).toString();

const TEST_YEAR = process.argv[2];
const TEST_DAY = process.argv[3];

if (!TEST_DAY || !TEST_YEAR) {
  throw new Error(
    "Please supply a year and day to test using the format `node index.js {year} {day}`"
  );
}

const day = require(`./${TEST_YEAR}/js/day_${TEST_DAY}`);

const t0 = performance.now();
const result1 = day.part1(data);
const t1 = performance.now();
console.log(`Part 1: ${result1} in ${(t1 - t0).toFixed(2)}ms\n`);

const t2 = performance.now();
const result2 = day.part2(data);
const t3 = performance.now();
console.log(`Part 2: ${result2} in ${(t3 - t2).toFixed(2)}ms\n`);
