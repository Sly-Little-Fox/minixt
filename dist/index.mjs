// src/index.ts
function matches(rule) {
  return (object) => {
    let match = true;
    for (const [key, value] of Object.entries(rule)) {
      if (object[key] !== value) {
        match = false;
      }
    }
    return match;
  };
}
function matchesProperty(key, value) {
  return (object) => object[key] === value;
}
function property(key) {
  return (object) => object[key];
}
function range(start, end, step) {
  const list = [];
  if (!step)
    step = 1;
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
function exclude(...lists) {
  let all = [];
  for (const list of lists) {
    all = all.concat(list);
  }
  const track = [];
  const common = [];
  for (const item of all) {
    if (track.includes(item))
      common.push(item);
    else
      track.push(item);
  }
  return all.filter((x) => !common.includes(x));
}
function filter(list, fun) {
  return list.filter(fun);
}
function intersect(...lists) {
  let all = [];
  for (const list of lists) {
    all = all.concat(list);
  }
  return all.filter((x) => {
    let common = true;
    for (const list of lists) {
      if (!list.includes(x))
        common = false;
    }
    return common;
  });
}
function partition(list, rule) {
  if (typeof rule === "function") {
    const yes = list.filter(rule);
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
  throw new TypeError("Rule is an not array, number, function, object, or string");
}
function factorial(input) {
  let n = 1;
  for (let i = 2; i <= input; i += 1) {
    n *= i;
  }
  return n;
}
function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
function triangular(n) {
  return (n + 1) * (n / 2);
}
function must(rule) {
  return (object) => {
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
export {
  exclude,
  factorial,
  fibonacci,
  filter,
  intersect,
  matches,
  matchesProperty,
  must,
  partition,
  property,
  range,
  triangular
};
