import * as fs from 'fs';
import * as path from 'path';

const inputFilepath = path.resolve(__dirname, './input.txt');
const data = fs.readFileSync(inputFilepath, 'utf-8');

