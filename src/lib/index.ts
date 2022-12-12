import path from 'path';
import fs from 'fs';
import util from 'util';

export * as array from './array';

export function getInput(dirname: string) {
  const inputFilepath = path.resolve(dirname, './input.txt');

  return fs.readFileSync(inputFilepath, 'utf-8');
}

/**
 * Add numeric value to the sum total.
 *
 * @param sum
 * @param row
 */
export function sumItems(sum: number, row: string | number): number {
  return sum + Number(row);
}

export function inspect(contents: unknown): void {
  const inspection = util.inspect(contents, {
    depth: 3,
    colors: true,
    // breakLength: 60,
    // compact: true,
  });

  console.log(inspection);
}

/**
 * Set the first and last elements as min and max.
 *
 * @param input
 */
export function toMinMax(input: number[]): MinMax {
  const sorted = [...input];

  const [min, max] = sorted;

  return { min, max };
}

export function isInRange(input: number, { min, max }: MinMax): boolean {
  return input >= min && input <= max;
}

export function isContainedIn(first: MinMax, second: MinMax): boolean {
  return first.min >= second.min && first.max <= second.max;
}

export function isOverlapping([first, second]: [MinMax, MinMax]): boolean {
  return isContainedIn(first, second) || isContainedIn(second, first);
}
