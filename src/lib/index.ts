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
