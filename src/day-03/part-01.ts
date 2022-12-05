import { getInput, sumItems } from '@src/lib';

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

function unique<T>(input: T[]): T[] {
  return [...new Set(input)];
}

// Get the intersection of two arrays.
function intersect(a: string[], b: string[]): string[] {
  return unique([
    ...a,
    ...b,
  ]).filter(value => a.includes(value) && b.includes(value));
}


const isUpper = char => char === char.toUpperCase();

function getPriority(char: string): number {
  return char.charCodeAt(0) - (isUpper(char) ? offset.upper : offset.lower);
}

if (require.main === module) {
  const data = mapInput(getInput(__dirname));

  console.log({
    a: data[0][0],
    b: data[0][1],
    i: intersect(data[0][0], data[0][1]),
    m: intersect(data[0][0], data[0][1]).map(getPriority),
  });


  console.log({
    a: 'a'.charCodeAt(0) - offset.lower,
    z: 'z'.charCodeAt(0) - offset.lower,
    A: 'A'.charCodeAt(0) - offset.upper,
    Z: 'Z'.charCodeAt(0) - offset.upper,
  });

  const mapped = data.map(
    ([a, b]) => intersect(a, b).map(getPriority).reduce(sumItems, 0),
  ).reduce(sumItems, 0);

  console.log(mapped);
}
