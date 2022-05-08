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

export function range(start: number, end: number, step: number) {
  const list = [];
  if (!step) step = 1;
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

export function exclude(...lists: any[][]) {
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

export function filter(
  list: any[],
  fun: (value: any, index: number, array: any[]) => unknown
) {
  return list.filter(fun);
}

export function intersect(...lists: any[][]) {
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

export function partition(
  list: any[],
  rule: ((...args: any[]) => any) | Record<any, any> | any[] | string
) {
  if (typeof rule === "function") {
    const yes = list.filter(rule as (...args: any[]) => any);
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

export function factorial(input: number) {
  let n = 1;
  for (let i = 2; i <= input; i += 1) {
    n *= i;
  }
  return n;
}

export function fibonacci(n: number): number {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function triangular(n: number) {
  return (n + 1) * (n / 2);
}

/**
 *
 * @deprecated This function is unsafe because it uses eval
 */
export function must(rule: Record<any, any>) {
  return (object: Record<any, any>) => {
    let match = true;
    for (const [key, value] of Object.entries(rule)) {
      if (typeof value === "string") {
        if (!new Function(`(${JSON.stringify(object[key])})${value}`)()) {
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
        if (!new Function(str)()) {
          match = false;
        }
      } else if (typeof value === "boolean") {
        if (!new Function(`(${JSON.stringify(object[key])}) === ${value}`)()) {
          match = false;
        }
      }
    }
    return match;
  };
}
