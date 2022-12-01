import * as fs from 'fs';
import * as path from 'path';

const inputFilepath = path.resolve(__dirname, './input.txt');
const data = fs.readFileSync(inputFilepath, 'utf-8');


/**
 * The Elf data boundary is two new lines.
 *
 * @param input
 */
function extractElfBlocks(input: string): string[] {
  return input.split('\n\n');
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

/**
 * An Elf's total calories is defined by the sum of each
 * row in their data block.
 *
 * @param elf
 */
function reduceElfCalories(elf: string): number {
  const calories = elf.split('\n');

  return calories.reduce(sumItems, 0);
}

/**
 * Serialise input data into calories.
 */
export const elfCalories = extractElfBlocks(data)
  .map((elf) => reduceElfCalories(elf));


function main() {
  const log = [];
  let maxCalory = 0;

  elfCalories.forEach((calory, index) => {
    if (calory > maxCalory) {
      maxCalory = calory;
      log.push({
        i: elfCalories.indexOf(maxCalory),
        v: maxCalory,
      });
    }
  });

  console.log(maxCalory);
}


if (require.main === module) {
  main();
}
