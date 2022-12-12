import { getInput, inspect } from '@src/lib';

/**
 * Given the input, return the first set of non-repeating characters with a length of 4.
 *
 * @param input
 * @param length
 */
export function findNonRepeatingCharacters(input: string, length = 4): number {
  const characters = [...input];

  for (const [index] of characters.entries()) {
    const sequence = characters.slice(index, index + length);
    const unique = new Set(sequence);

    if (unique.size === length) {
      return index + length;
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
