import { inspect } from '@src/lib';
import { prepareState } from './part-01';

const DISK_SIZE = 70000000;
const UPDATE_SIZE = 30000000;

if (require.main === module) {
  console.log('Day 5 - Part 2');

  const state = prepareState();

  const {
    spaceRequired,
  } = state;

  const matches: number[] = [];

  for (const path of state.contents.keys()) {
    const size = state.getDirectorySize(path);

    if (size >= spaceRequired) {
      matches.push(size);
    }
  }

  inspect(Math.min(...matches));
}
