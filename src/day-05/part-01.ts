import { getInput, inspect } from '@src/lib';


/**
 * Representation of the stack as rows and columns with labels.
 */
type StackData = {
  rows: string[][];
  cols: string[][];
  labels: number[];
};

const EMPTY_ROW = '---';

function rotate<T>(array: T[][]): T[][] {
  return array[0].map((_, i) => array.map(row => row[i]));
}

/**
 * Split a row into its column stacks, populating empty stacks with EMPTY_ROW.
 *
 * @param row
 */
function splitRowToStack(row: string): string[] {
  return row.match(/.{1,4}/g)
    .map((item) => {
      const result = item.trim();

      return result || EMPTY_ROW;
    });
}


/**
 * Find the maximum array length in the provided arrays.
 *
 * @param arrays
 */
function getMaxLength(...arrays: unknown[][]): number {
  return arrays.reduce((max, array) => Math.max(max, array.length), 0);
}

/**
 * Fill an array with EMPTY_VALUE up to length.
 *
 * @param array
 * @param max
 */
function fillArray(array: string[], max: number): string[] {
  const length = max - array.length;

  if (!length) {
    return array;
  }

  return [
    ...array,
    ...Array.from({ length }).fill(EMPTY_ROW),
  ] as string[];
}


function prepareStackRows(input: string, splitIndex: number): StackData {
  const mapped = input.slice(0, splitIndex)
    .split('\n')
    .filter(Boolean)
    .map(splitRowToStack);

  const max = getMaxLength(mapped);

  const rows = [
    fillArray([], max),
    ...mapped.map((row) => fillArray(row, max)),
  ];

  const labels = rows.pop().map((label) => Number(label));

  const cols = rotate(rows);

  return { labels, cols, rows };
}

if (require.main === module) {
  console.log('Day 5 - Part 1');

  const data = getInput(__dirname);
  const moveIndex = data.indexOf('move');

  const { rows, cols, labels } = prepareStackRows(data, moveIndex);

  const moves = data.slice(moveIndex).split('\n').filter(Boolean);

  inspect(getMaxLength(rows));
  inspect([
    [],
    ...rows,
    [],
  ]);


  inspect([
    [],
    ...cols,
    [],
  ]);

  inspect([
    [],
    ...labels,
    [],
  ]);

  inspect(cols[labels.indexOf(1)]);
}
