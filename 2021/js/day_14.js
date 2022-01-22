Array.prototype.windowed = function (size) {
    return Array.from(
        {length: this.length - (size - 1)},
        (_, index) => this.slice(index, index + size)
    )
}

function parseInput(input) {
    const [template, rulesString] = input.split("\n\n");

    const rules = [...rulesString.matchAll(/^([A-Z]{2}) -> ([A-Z])$/gm)].reduce((acc, m) => ({
        ...acc,
        [m[1]]: m[2]
    }), {});

    return {template, rules};
}

function part1(input) {
    const {template, rules} = parseInput(input);
    const elementsToInsert = [...template].windowed(2).map(pair => rules[pair.join("")] || "");
    const newTemplate = [...template].map((t, i) => elementsToInsert[i] ? t + elementsToInsert[i] : t).join("");


    return ''
}

function part2(input) {
    return '';
}

module.exports = {part1, part2};