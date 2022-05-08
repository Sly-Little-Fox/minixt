var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  exclude: () => exclude,
  factorial: () => factorial,
  fibonacci: () => fibonacci,
  filter: () => filter,
  intersect: () => intersect,
  matches: () => matches,
  matchesProperty: () => matchesProperty,
  must: () => must,
  partition: () => partition,
  property: () => property,
  range: () => range,
  triangular: () => triangular
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
