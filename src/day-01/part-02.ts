import { elfCalories, sumItems } from '@src/day-01/part-01';

const sorted = elfCalories.sort((a, b) => a <= b ? 1 : -1);

console.log(sorted.slice(0, 3).reduce(sumItems));
