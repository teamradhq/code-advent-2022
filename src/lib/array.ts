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

export function isIntersecting(a: unknown[], b: unknown[]): boolean {
  return intersect(a, b).length > 0;
}

export function batches<T>(input: T[], size = 3): T[][] {
  const batches = [];

  for (let i = 0; i < input.length; i += size) {
    batches.push(input.slice(i, i + size));
  }

  return batches;
}

/**
 * Find the maximum array length in the provided arrays.
 *
 * @param arrays
 */
export function getMaxLength(...arrays: unknown[][]): number {
  return arrays.reduce((max, array) => Math.max(max, array.length), 0);
}

/**
 * Expand the given `array` to the `max` length filled with the given `value`.
 *
 * @param array
 * @param max
 * @param value
 */
export function fillArray(array: string[], max: number, value = '-'): string[] {
  const length = max - array.length;

  if (!length) {
    return array;
  }

  return [
    ...array,
    ...Array.from({ length }).fill(value),
  ] as string[];
}

/**
 * Given a multidimensional array, rotate the contents. This is a naive implementation,
 * and will not work for arrays of varying lengths.
 *
 * @param array
 * @example ```typescript
 *  rotate([0, 1], [2, 3]) // => [0, 2], [1, 3]
 * ```
 *
 */
export function rotate<T>(array: T[][]): T[][] {
  return array[0].map((_, i) => array.map(row => row[i]));
}
