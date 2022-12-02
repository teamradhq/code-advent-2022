import { sumItems } from '@src/lib';

import { elfCalories } from '@src/day-01/part-01';

function main() {
  const sorted = elfCalories.sort((a, b) => a <= b ? 1 : -1);

  console.log(sorted.slice(0, 3).reduce(sumItems));
}

if (require.main === module) {
  main();
}
