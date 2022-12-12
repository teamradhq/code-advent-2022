import { getInput, inspect } from '@src/lib';

const markerLength = 4;

/**
 * Given the input, return the first set of non-repeating characters with a length of 4.
 *
 * @param input
 */
function findNonRepeatingCharacters(input: string): number {
  const characters = [...input];

  for (const [index] of characters.entries()) {
    const sequence = characters.slice(index, index + markerLength);
    const unique = new Set(sequence);

    if (unique.size === markerLength) {
      return index + markerLength;
    }
  }

  return -1;
}

if (require.main === module) {
  console.log('Day 6 - Part 1');

  const data = getInput(__dirname);

  const examples: [string, number][] = [
    ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
    ['nppdvjthqldpwncqszvftbrmjlhg', 6],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
  ];

  for (const [input, expected] of examples) {
    const actual = findNonRepeatingCharacters(input);

    if (actual !== expected) {
      throw new ReferenceError(`Expected ${expected} but got ${actual}`);
    }
  }

  inspect((findNonRepeatingCharacters(data)));
}
