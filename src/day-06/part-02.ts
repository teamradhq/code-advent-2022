import { getInput } from '@src/lib';

import { findNonRepeatingCharacters } from './part-01';

if (require.main === module) {
  console.log('Day 6 - Part 2');

  const data = getInput(__dirname);

  const examples: [string, number][] = [
    ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
    ['nppdvjthqldpwncqszvftbrmjlhg', 23],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
  ];

  for (const [input, expected] of examples) {
    const actual = findNonRepeatingCharacters(input, 14);

    if (actual !== expected) {
      throw new ReferenceError(`Expected ${expected} but got ${actual}`);
    }
  }

  const result = findNonRepeatingCharacters(data, 14);

  if (result !== 2625) {
    throw new ReferenceError(`Expected 2625 but got ${result}`);
  }

  console.log(result);
}
