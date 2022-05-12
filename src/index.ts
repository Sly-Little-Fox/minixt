/* eslint-disable @typescript-eslint/no-implied-eval */

export function matches(rule: Record<any, any>) {
  return (object: Record<any, any>) => {
    let match = true;
    for (const [key, value] of Object.entries(rule)) {
      if (object[key] !== value) {
        match = false;
      }
    }
    return match;
  };
}

export function matchesProperty(key: any, value: any) {
  return (object: Record<any, any>) => object[key] === value;
}

export function property(key: any) {
  return (object: Record<any, any>) => object[key];
}

export function range(start: number, end: number, step = 1) {
  const list = [];
  if (start > end) {
    step *= -1;
    for (let i = start; i > end; i += step) {
      list.push(i);
    }
  } else {
    for (let i = start; i < end; i += step) {
      list.push(i);
    }
  }
  return list;
}

export function exclude<T = any>(...lists: T[][]): T[] {
  let all: any[] = [];
  for (const list of lists) {
    all = all.concat(list);
  }
  const track: any[] = [];
  const common: any[] = [];
  for (const item of all) {
    if (track.includes(item)) common.push(item);
    else track.push(item);
  }
  return all.filter((x) => !common.includes(x));
}

export function filter<T = any>(
  list: T[],
  fun: (value: any, index: number, array: any[]) => unknown
): T[] {
  return list.filter(fun);
}

export function intersect<T = any>(...lists: T[][]): T[] {
  let all: any[] = [];
  for (const list of lists) {
    all = all.concat(list);
  }
  return all.filter((x) => {
    let common = true;
    for (const list of lists) {
      if (!list.includes(x)) common = false;
    }
    return common;
  });
}

export function partition<T = any>(
  list: T[],
  rule: ((...args: T[]) => unknown) | Record<any, T> | T[] | string
) {
  if (typeof rule === "function") {
    const yes = list.filter(rule as (...args: any[]) => unknown);
    const no = list.filter((x) => !rule(x));
    return [yes, no];
  }
  if (Array.isArray(rule)) {
    const yes = list.filter((x) => matchesProperty(rule[0], rule[1])(x));
    const no = list.filter((x) => !matchesProperty(rule[0], rule[1])(x));
    return [yes, no];
  }
  if (typeof rule === "object") {
    const yes = list.filter((x) => matches(rule)(x));
    const no = list.filter((x) => !matches(rule)(x));
    return [yes, no];
  }
  if (typeof rule === "string") {
    const yes = list.filter((x) => property(rule)(x));
    const no = list.filter((x) => !property(rule)(x));
    return [yes, no];
  }
  throw new TypeError(
    "Rule is an not array, number, function, object, or string"
  );
}

/**
 *
 * @deprecated This function is unsafe because it uses eval
 */
export function must<T = any>(rule: Record<any, T>) {
  return (object: Record<any, T>) => {
    let match = true;
    for (const [key, value] of Object.entries(rule)) {
      if (typeof value === "string") {
        if (object[key] !== value) {
          match = false;
        }
      } else if (Array.isArray(value) && value.length > 1) {
        let str = "";
        const con = value.shift();
        value.forEach((item, index) => {
          if (index === 0) {
            str += `(${JSON.stringify(object[key])})${item}`;
          } else {
            str += `${con}(${JSON.stringify(object[key])})${item}`;
          }
        });
        // eslint-disable-next-line no-eval
        if (!(0, eval)(str)) {
          match = false;
        }
      } else if (typeof value === "boolean") {
        if (object[key] !== value) {
          match = false;
        }
      }
    }
    return match;
  };
}

export function factor(d: number, nums: Iterable<number>) {
  for (const num of nums) {
    if (num % d !== 0) {
      return false;
    }
  }
  return true;
}

export function frequency<T = any>(data: Iterable<T>): Map<T, number> {
  const chart = new Map();
  for (const item of data) {
    const value = chart.get(item);
    if (value) {
      chart.set(item, value + 1);
    } else {
      chart.set(item, 1);
    }
  }
  return chart;
}

export function factors(n: number): number[] {
  const list = [];
  for (const i of range(2, Math.floor(Math.sqrt(n)) + 1)) {
    if (n % i === 0) {
      list.push(i);
      list.push(n / i);
    }
  }
  return list;
}

export function gcd(a: number, b: number): number {
  if (b) return gcd(b, a % b);
  return Math.abs(a);
}

export function hcf(...nums: number[]) {
  let p = null;
  for (const i of range(
    Math.min(...nums),
    Math.floor(Math.sqrt(Math.min(...nums))) - 1
  )) {
    if (factor(i, nums)) {
      return i;
    }
    if (factor(Math.min(...nums) / i, nums)) {
      p = Math.min(...nums) / i;
    }
  }
  return p ?? 1;
}

export function prime(n: number) {
  for (const i of range(2, Math.floor(Math.sqrt(n)) + 1)) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

export function mode<T = any>(data: Iterable<T>): T[] {
  const chart = frequency(data);
  const max = Math.max(...chart.values());
  return [...chart.keys()].filter((x) => chart.get(x) === max);
}

export function quickSort<T = any>(items: T[]): T[] {
  const { length } = items;

  if (length <= 1) {
    return items;
  }
  const pivot = items[0];
  const greater = [];
  const less = [];

  for (let i = 1; i < length; i += 1) {
    if (items[i] > pivot) {
      greater.push(items[i]);
    } else {
      less.push(items[i]);
    }
  }

  const sorted = [...quickSort(less), pivot, ...quickSort(greater)];
  return sorted;
}

export function shellSort<T = any>(items: T[]): T[] {
  let interval = 1;

  while (interval < items.length / 3) {
    interval = interval * 3 + 1;
  }

  while (interval > 0) {
    for (let outer = interval; outer < items.length; outer += 1) {
      const value = items[outer];
      let inner = outer;

      while (inner > interval - 1 && items[inner - interval] >= value) {
        items[inner] = items[inner - interval];
        inner -= interval;
      }
      items[inner] = value;
    }
    interval = (interval - 1) / 3;
  }
  return items;
}

export function zip<T = any>(...lists: T[][]): T[][] {
  const zipped: T[][] = [];
  for (let i = 0; i < lists[0].length; i += 1) {
    const item: T[] = [];
    for (const list of lists) {
      item.push(list[i]);
    }
    zipped.push(item);
  }
  return zipped;
}

export function unite<T = any>(...lists: T[][]): T[] {
  let unision: T[] = [];
  for (const list of lists) {
    unision = unision.concat(list);
  }
  return unision;
}

export function subtract<T = any>(target: T[], ...lists: T[][]): T[] {
  let sub: T[] = [];
  for (const list of lists) {
    sub = sub.concat(list);
  }
  return target.filter((x) => !sub.includes(x));
}
