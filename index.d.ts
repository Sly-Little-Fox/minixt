declare function matches(rule: Record<any, any>): (object: Record<any, any>) => boolean;
declare function matchesProperty(key: any, value: any): (object: Record<any, any>) => boolean;
declare function property(key: any): (object: Record<any, any>) => any;
declare function range(start: number, end: number, step: number): number[];
declare function exclude(...lists: any[][]): any[];
declare function filter(list: any[], fun: (value: any, index: number, array: any[]) => unknown): any[];
declare function intersect(...lists: any[][]): any[];
declare function partition(list: any[], rule: ((...args: any[]) => any) | Record<any, any> | any[] | string): any[][];
declare function factorial(input: number): number;
declare function fibonacci(n: number): number;
declare function triangular(n: number): number;
/**
 *
 * @deprecated This function is unsafe because it uses eval
 */
declare function must(rule: Record<any, any>): (object: Record<any, any>) => boolean;

export { exclude, factorial, fibonacci, filter, intersect, matches, matchesProperty, must, partition, property, range, triangular };
