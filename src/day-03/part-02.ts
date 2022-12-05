import { getInput, sumItems, array } from '@src/lib';
import { getPriority } from './part-01';

function concat(...strings: string[]): string {
  return strings.join('');
}

if (require.main === module) {
  const data = getInput(__dirname).split('\n')
    .filter(Boolean)
    .map(row => row.split(''));

  const batched = array.batches(data)
    .map((groups) => array.intersect(...groups))
    .map((group) => group.map(getPriority));

  console.log(array.merge(...batched).reduce(sumItems, 0));
}
