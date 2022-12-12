import { getInput } from '@src/lib';

// import type { Stack, StackData, MoveInstruction } from './part-01';
import { prepare } from './part-01';

if (require.main === module) {
  console.log('Day 5 - Part 2');

  const data = getInput(__dirname);
  const { moves, cols, labels } = prepare(data);

  console.log(data);
}
