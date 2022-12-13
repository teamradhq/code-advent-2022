import { assertEquals, getInput, inspect } from '@src/lib';
import { getTopItemsFromCols, prepare } from './part-01';
import type { Stack, MoveInstruction } from './part-01';

function moveItemStack(labels: number[], cols: Stack, { move, from, to }: MoveInstruction): void {
  const fromCol = cols[labels.indexOf(from)];
  const toCol = cols[labels.indexOf(to)];
  const stack = fromCol.splice(0, move);

  toCol.unshift(...stack);
}

if (require.main === module) {
  console.log('Day 5 - Part 2');

  const data = getInput(__dirname);
  const { moves, cols, labels } = prepare(data);

  for (const move of moves) {
    moveItemStack(labels, cols, move);
  }


  const result = getTopItemsFromCols(cols);

  assertEquals(result, 'VRQWPDSGP');

  inspect(result);
}
