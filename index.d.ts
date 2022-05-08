declare function matches(rule: Record<any, any>): (object: Record<any, any>) => boolean;
declare function matchesProperty(key: any, value: any): (object: Record<any, any>) => boolean;
declare function property(key: any): (object: Record<any, any>) => any;
declare function range(start: number, end: number, step?: number): number[];
declare function exclude(...lists: any[][]): any[];
declare function filter(list: any[], fun: (value: any, index: number, array: any[]) => unknown): any[];
declare function intersect(...lists: any[][]): any[];
declare function partition(list: any[], rule: ((...args: any[]) => unknown) | Record<any, any> | any[] | string): any[][];
declare function factorial(input: number): number;
declare function fibonacci(n: number): number;
/**
 *
 * @deprecated This function is unsafe because it uses eval
 */
declare function must(rule: Record<any, any>): (object: Record<any, any>) => boolean;
declare function factor(d: number, nums: Iterable<number>): boolean;
declare function frequency(data: Iterable<any>): Map<any, any>;
declare function factors(n: number): number[];
declare function gcd(a: number, b: number): number;
declare function hcf(...nums: number[]): number;
declare function prime(n: number): boolean;
declare function mergeSort(list: any[]): any[];
declare function mode(data: Iterable<any>): any[];
declare function quickSort(items: any[]): any[];
declare function shellSort(items: any[]): any[];
declare function zip(...lists: any[]): any[][];

export { exclude, factor, factorial, factors, fibonacci, filter, frequency, gcd, hcf, intersect, matches, matchesProperty, mergeSort, mode, must, partition, prime, property, quickSort, range, shellSort, zip };
