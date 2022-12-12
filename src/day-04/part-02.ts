import { array, getInput, inspect } from '@src/lib';
import { prepareData } from './part-01';

/**
 * Convert a min/max pair to a range of values.
 *
 * @param min
 * @param max
 */
function toRange({ min, max }: MinMax): number[] {
  const length = max - min + 1;
  const map = (_, i) => min + i;

  return Array.from({ length }, map);
}


/**
 * Convert a list of min/max pairs to a list of ranges.
 *
 * @param first
 * @param second
 */
function minMaxGroupsToRange([first, second]: [MinMax, MinMax]): number[][] {
  return [
    toRange(first),
    toRange(second),
  ];
}

if (require.main === module) {
  inspect('Day 4 - Part 2');

  const data = prepareData(getInput(__dirname))
    .map(minMaxGroupsToRange);

  inspect(data.length);

  const result = data.filter(([a, b]) => array.isIntersecting(a, b));

  inspect(result.length);
}
