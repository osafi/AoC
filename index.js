const {performance} = require("perf_hooks");
const {readFileSync} = require('fs');

const TEST_YEAR = process.argv[2];
const TEST_DAY = process.argv[3];
const RUN_FULL = process.argv[4] === 'full'

if (!TEST_DAY || !TEST_YEAR) {
    throw new Error(
        "Please supply a year and day to test using the format `node index.js {year} {day}`"
    );
}

const day = require(`./${TEST_YEAR}/js/day_${TEST_DAY}`);
const sampleData = readFileSync(`./${TEST_YEAR}/inputs/day_${TEST_DAY}_sample.txt`).toString()
const data = readFileSync(`./${TEST_YEAR}/inputs/day_${TEST_DAY}.txt`).toString()

function run(input) {
    const t0 = performance.now();
    const result1 = day.part1(input);
    const t1 = performance.now();
    console.log(`Part 1: ${result1} in ${(t1 - t0).toFixed(2)}ms\n`);

    const t2 = performance.now();
    const result2 = day.part2(input);
    const t3 = performance.now();
    console.log(`Part 2: ${result2} in ${(t3 - t2).toFixed(2)}ms\n`);
}

console.log("===== sample =====")
run(sampleData);
if(RUN_FULL) {
    console.log("===== real =====")
    run(data);
}

