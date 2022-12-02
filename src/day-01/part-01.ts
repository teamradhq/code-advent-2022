import { getInput, sumItems } from '@src/lib';

/**
 * The Elf data boundary is two new lines.
 *
 * @param input
 */
function extractElfBlocks(input: string): string[] {
  return input.split('\n\n');
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

const data = getInput(__dirname);

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
