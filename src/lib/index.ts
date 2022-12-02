import path from 'path';
import fs from 'fs';

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
