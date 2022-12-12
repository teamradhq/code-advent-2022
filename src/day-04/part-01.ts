import {
  getInput,
  isOverlapping,
  toMinMax,
} from '@src/lib';

function toGroupDetails(row: string): MinMax[] {
  return row.split(',')
    .map((group) => group.split('-').map(Number))
    .map(toMinMax);
}

export function prepareData(data: string): MinMax[][] {
  return data.split('\n')
    .filter(Boolean)
    .map(toGroupDetails);
}

if (require.main === module) {
  const data = prepareData(getInput(__dirname))
    .filter(isOverlapping);

  console.log('Day 4 - Part 1');
  console.log(data.length);
}
