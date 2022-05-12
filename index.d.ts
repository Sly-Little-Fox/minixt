declare function matches(
  rule: Record<any, any>
): (object: Record<any, any>) => boolean;
declare function matchesProperty(
  key: any,
  value: any
): (object: Record<any, any>) => boolean;
declare function property(key: any): (object: Record<any, any>) => any;
declare function range(start: number, end: number, step?: number): number[];
declare function exclude<T = any>(...lists: T[][]): T[];
declare function filter<T = any>(
  list: T[],
  fun: (value: any, index: number, array: any[]) => unknown
): T[];
declare function intersect<T = any>(...lists: T[][]): T[];
declare function partition<T = any>(
  list: T[],
  rule: ((...args: T[]) => unknown) | Record<any, T> | T[] | string
): T[][];
/**
 *
 * @deprecated This function is unsafe because it uses eval
 */
declare function must<T = any>(
  rule: Record<any, T>
): (object: Record<any, T>) => boolean;
declare function factor(d: number, nums: Iterable<number>): boolean;
declare function frequency<T = any>(data: Iterable<T>): Map<T, number>;
declare function factors(n: number): number[];
declare function gcd(a: number, b: number): number;
declare function hcf(...nums: number[]): number;
declare function prime(n: number): boolean;
declare function mode<T = any>(data: Iterable<T>): T[];
declare function quickSort<T = any>(items: T[]): T[];
declare function shellSort<T = any>(items: T[]): T[];
declare function zip<T = any>(...lists: T[][]): T[][];
declare function unite<T = any>(...lists: T[][]): T[];
declare function subtract<T = any>(target: T[], ...lists: T[][]): T[];

export {
  exclude,
  factor,
  factors,
  filter,
  frequency,
  gcd,
  hcf,
  intersect,
  matches,
  matchesProperty,
  mode,
  must,
  partition,
  prime,
  property,
  quickSort,
  range,
  shellSort,
  subtract,
  unite,
  zip,
};
