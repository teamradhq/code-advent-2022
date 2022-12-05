import { getInput, sumItems, array } from '@src/lib';

function split(input: string): [string[], string[]] {
  const half = Math.ceil(input.length / 2);

  return [
    input.slice(0, half).split(''),
    input.slice(half).split(''),
  ];
}

function mapInput(input: string): [string[], string[]][] {
  return input.split('\n').map(split);
}

const offset = {
  upper: 38,
  lower: 96,
};

const isUpper = char => char === char.toUpperCase();

export function getPriority(char: string): number {
  return char.charCodeAt(0) - (isUpper(char) ? offset.upper : offset.lower);
}

if (require.main === module) {
  const data = mapInput(getInput(__dirname));

  const mapped = data.map(
    ([a, b]) => array.intersect(a, b)
      .map(getPriority)
      .reduce(sumItems, 0),
  ).reduce(sumItems, 0);

  console.log(mapped);
}
