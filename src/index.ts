// import { execSync } from 'child_process';
import { inspect } from '@src/lib';

inspect('Hello');
//
// const args = process.argv.filter((val) => val.startsWith('--'))
//   .map((option) => {
//     const [key, value] = option.split('=');
//
//     return [key.slice(2), Number(value)];
//   });
//
// const options = Object.fromEntries(args);
//
// inspect({ options, args });
//
// execSync('npm run build', { stdio: 'inherit' });
