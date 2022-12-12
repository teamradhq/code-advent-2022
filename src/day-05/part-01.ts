import { getInput, inspect } from '@src/lib';


/**
 * Representation of the stack as rows and columns with labels.
 */
type StackData = {
  rows: string[][];
  cols: string[][];
  labels: number[];
};

type MoveInstruction = Record<'move' | 'from' | 'to', number>;

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
      const result = item.trim().replace(/\[|\]/g, '');

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


/**
 * Parse the stack from input data and return its rows and columns, with labels.
 *
 * @param input
 * @param splitIndex
 */
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

  const cols = rotate(rows).map((col) => col.filter(val => val !== EMPTY_ROW));

  return { labels, cols, rows };
}

/**
 *
 * @param input
 * @param splitIndex
 */
function prepareMovesList(input: string, splitIndex: number): MoveInstruction[] {
  return input.slice(splitIndex)
    .split('\n')
    .filter(Boolean)
    .map((row) => {
      const {
        move,
        from,
        to,
      } = row.match(/move\s(?<move>\d+)\sfrom\s(?<from>\d+)\sto\s(?<to>\d+)/).groups;


      return { move: Number(move), from: Number(from), to: Number(to) };
    });
}


if (require.main === module) {
  console.log('Day 5 - Part 1');

  const data = getInput(__dirname);
  const moveIndex = data.indexOf('move');

  const { rows, cols, labels } = prepareStackRows(data, moveIndex);

  const doMove = ({ move, from, to }: MoveInstruction): void => {
    const fromCol = cols[labels.indexOf(from)];
    const toCol = cols[labels.indexOf(to)];

    while (move--) {
      toCol.unshift(fromCol.shift());
    }
  };

  const moves = prepareMovesList(data, moveIndex);

  inspect('rows');
  inspect([
    [],
    ...rows,
    [],
  ]);


  inspect('cols before');
  inspect([
    [],
    ...cols,
    [],
  ]);

  for (const move of moves) {
    doMove(move);
  }

  inspect('cols after');
  inspect([
    [],
    ...cols,
    [],
  ]);

  const result = cols.reduce((str, col) => str + col.shift(), '');
  inspect(cols[labels.indexOf(1)]);
  inspect(result);
}
