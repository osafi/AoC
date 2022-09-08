#!/bin/bash
set -eu

YEAR=$1
DAY=$2
SESSION=${AOC_SESSION}

if [ ! -f ./${YEAR}/inputs/day_${DAY}.txt ]; then
  echo "Downloading input for year ${YEAR} day ${DAY}"
  curl -s -H "Cookie: session=${AOC_SESSION}" "https://adventofcode.com/${YEAR}/day/${DAY}/input" -o ./${YEAR}/inputs/day_${DAY}.txt
else
  echo "Input for year ${YEAR} day ${DAY} already exists. Skipping download"
fi

if [ ! -f ./${YEAR}/inputs/day_${DAY}_sample.txt ]; then
  echo "Making sample input file for year ${YEAR} day ${DAY}"
  touch ./${YEAR}/inputs/day_${DAY}_sample.txt
else
  echo "Sample input for year ${YEAR} day ${DAY} already exists. Skipping creation"
fi

if [ ! -f ./${YEAR}/js/day_${DAY}.js ]; then
  echo "Copying template for year ${YEAR} day ${DAY}"
  cp ./templates/js/day_template.js ./${YEAR}/js/day_${DAY}.js
else
  echo "Script for year ${YEAR} day ${DAY} already exists. Skipping creation"
fi
