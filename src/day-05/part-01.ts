import { array, assertEquals, getInput, inspect } from '@src/lib';


export type Stack = string[][];

/**
 * Representation of the stack as rows and columns with labels.
 */
export type StackData = {
  rows: Stack;
  cols: Stack;
  labels: number[];
};

export type MoveInstruction = Record<'move' | 'from' | 'to', number>;

const EMPTY_ROW = '---';

/**
 * Split a row into its column stacks, populating empty stacks with EMPTY_ROW.
 *
 * @param row
 */
function splitRowToStack(row: string): string[] {
  return row.match(/.{1,4}/g)
    .map((item) => {
      const result = item.trim().replace(/[[\]]/g, '');

      return result || EMPTY_ROW;
    });
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

  const max = array.getMaxLength(mapped);

  const rows = [
    ...mapped.map((row) => array.fillArray(row, max, EMPTY_ROW)),
  ];

  const labels = rows.pop().map((label) => Number(label));

  const cols = array.rotate(rows).map((col) => col.filter(val => val !== EMPTY_ROW));

  return { labels, cols, rows };
}

/**
 * Parse the list of moves from input data in Move Instructions.
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

export function prepare(input: string) {
  const moveIndex = input.indexOf('move');

  const { cols, labels } = prepareStackRows(input, moveIndex);
  const moves = prepareMovesList(input, moveIndex);

  return { moves, cols, labels };
}

/**
 * Move items from one stack to another one at a time.
 *
 * @param labels
 * @param cols
 * @param move
 * @param from
 * @param to
 */
function moveSingleItems(labels: number[], cols: Stack, { move, from, to }: MoveInstruction): void {
  const fromCol = cols[labels.indexOf(from)];
  const toCol = cols[labels.indexOf(to)];

  while (move--) {
    toCol.unshift(fromCol.shift());
  }
}

export function getTopItemsFromCols(cols: Stack): string {
  return cols.reduce((str, col) => str + col.shift(), '');
}


if (require.main === module) {
  console.log('Day 5 - Part 1');

  const data = getInput(__dirname);

  const { moves, cols, labels } = prepare(data);

  for (const move of moves) {
    moveSingleItems(labels, cols, move);
  }

  const result = getTopItemsFromCols(cols);

  assertEquals(result, 'GFTNRBZPF');

  inspect(result);
}
