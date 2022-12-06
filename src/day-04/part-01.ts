import { getInput } from '@src/lib';

type MinMax = Record<'min' | 'max', number>;

function toMinMax(input: string): MinMax {
  const [min, max] = input.split('-').map(Number);

  return { min, max };
}

function toGroupDetails(row: string): MinMax[] {
  return row.split(',').map(toMinMax);
}

function isInRange(input: number, { min, max }: MinMax): boolean {
  return input >= min && input <= max;
}

function isContainedIn(first: MinMax, second: MinMax): boolean {
  return first.min >= second.min && first.max <= second.max;
}

function isOverlapping([first, second]: [MinMax, MinMax]): boolean {
  return isContainedIn(first, second) || isContainedIn(second, first);
}

if (require.main === module) {
  const data = getInput(__dirname)
    .split('\n')
    .filter(Boolean)
    .map(toGroupDetails)
    .filter(isOverlapping);

  console.log('Day 4 - Part 1');
  console.log(data.length);


  const example = data[0];
  const [first, second] = example;
  console.log(example);
  console.log({
    firstMin: isInRange(first.min, second),
    firstMax: isInRange(first.max, second),
    secondMin: isInRange(second.min, first),
    secondMax: isInRange(second.max, first),
  });
  console.log({
    first: isContainedIn(first, second),
    second: isContainedIn(second, first),
    matches: isContainedIn(first, second) || isContainedIn(second, first),
  });
}
