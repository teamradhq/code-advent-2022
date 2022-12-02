import { getInput } from '@src/lib';

function main() {
  const data = getInput(__dirname);

  console.log(data);
}


if (require.main === module) {
  main();
}
