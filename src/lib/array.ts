export function unique<T>(input: T[]): T[] {
  return [...new Set(input)];
}

export function merge<T>(...arrays: T[][]): T[] {
  return arrays.reduce((a, b) => a.concat(b), []);
}

function inEvery<T>(value: T, ...arrays: T[][]): boolean {
  for (const array of arrays) {
    if (!array.includes(value)) {
      return false;
    }
  }

  return true;
}

export function intersect<T>(...arrays: T[][]): T[] {
  return unique(merge(...arrays)).filter((value) => (
    inEvery(value, ...arrays)
  ));
}

export function batches<T>(input: T[], size = 3): T[][] {
  const batches = [];

  for (let i = 0; i < input.length; i += size) {
    batches.push(input.slice(i, i + size));
  }

  return batches;
}
