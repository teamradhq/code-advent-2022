import { array, assertEquals, getInput, inspect, sumItems } from '@src/lib';

type Blob = {
  type: 'file' | 'directory';
  name: string;
  size: number;
}

type Directory = Blob & { type: 'directory' };
type File = Blob & { type: 'file' };

class State {
  #currentWorkingDirectory = '/';

  readonly diskSize = 70000000;

  readonly updateSize = 30000000;

  length = 0;

  buffer: string[] = [];

  isListing = false;

  contents = new Map<string, (File | Directory)[]>();


  constructor(public script: string[] = []) {
    this.length = script.length;
    this.run();
  }

  get cwd() {
    return this.#currentWorkingDirectory;
  }

  set cwd(path: string) {
    let cwd = this.#currentWorkingDirectory;
    if (path === '/') {
      cwd = '/';
    }

    if (path === '..') {
      const split = cwd.lastIndexOf('/');
      cwd = cwd.slice(0, split) || '/';
    }

    if (cwd === this.#currentWorkingDirectory) {
      cwd = `${cwd}/${path}`;
    }

    this.#currentWorkingDirectory = cwd.replace(/\/\//g, '/');
  }

  get freeSpace(): number {
    const usedSpace = this.getDirectorySize('/');

    return this.diskSize - usedSpace;
  }

  get spaceRequired(): number {
    return this.updateSize - this.freeSpace;
  }

  get canUpdate(): boolean {
    return this.spaceRequired < 0;
  }

  run() {
    while (this.script.length) {
      this.runLine(this.script.shift());
    }
  }

  private runLine(line: string) {
    this.buffer.push(line);

    if (line.startsWith('$')) {
      this.isListing = false;
    }

    if (line.startsWith('$ ls')) {
      this.isListing = true;
      return;
    }


    if (line.startsWith('$ cd')) {
      const path = line.split(' ').pop();
      this.cwd = path;
      return;
    }

    if (this.isListing) {
      this.list(line);
    }
  }

  private list(line: string): void {
    const [size, name] = line.split(' ');


    const item: Directory | File = size === 'dir' ? { type: 'directory', name, size: 0 } : {
      type: 'file',
      name,
      size: Number(size),
    };

    const contents = this.contents.get(this.cwd) || [];

    contents.push(item);

    this.contents.set(this.cwd, contents);
  }

  listFiles(path: string): File[] {
    const directories = [...this.contents.keys()]
      .filter((key) => key.startsWith(path))
      .map((key) => this.contents.get(key));

    return array.merge(...directories)
      .filter((item): item is File => item.type === 'file');
  }

  getDirectorySize(path: string): number {
    return this.listFiles(path)
      .map((file) => file.size)
      .reduce(sumItems, 0);
  }
}

export function prepareState(): State {
  return new State(getInput(__dirname).split('\n').filter(Boolean));
}

const SIZE_LIMIT = 100000;

if (require.main === module) {
  console.log('Day 5 - Part 1');

  const state = prepareState();
  const sizes: number[] = [];

  for (const path of state.contents.keys()) {
    const size = state.getDirectorySize(path);

    if (size <= SIZE_LIMIT) {
      sizes.push(size);
    }
  }

  const result = sizes.reduce(sumItems, 0);

  assertEquals(result, 1350966);

  inspect(result);
}
