/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies, global-require */
import b from "benny";
import * as Minixt from ".";

let q: typeof Minixt;
let m: typeof Minixt;

b.suite(
  "Start up",

  b.add("Quxt", () => {
    Object.keys(require.cache).forEach((key) => {
      delete require.cache[key];
    });
    q = new (require("quxt").Qux as any)() as typeof Minixt;
  }),

  b.add("Minixt", () => {
    Object.keys(require.cache).forEach((key) => {
      delete require.cache[key];
    });
    m = require(".");
  }),

  b.cycle(),
  b.complete()
);

b.suite(
  "Must (simple array)",

  b.add("Quxt", () => {
    [
      {
        name: "foo",
        age: 8,
        deleted: false,
      },
      {
        name: "bar",
        age: 18,
        deleted: false,
      },
      {
        name: "baz",
        age: 13,
        deleted: true,
      },
      {
        name: "qux",
        age: 13,
        deleted: false,
      },
    ].filter(q.must({ age: ">= 13", name: "[1] === 'a'" }));
  }),

  b.add("Minixt", () => {
    [
      {
        name: "foo",
        age: 8,
        deleted: false,
      },
      {
        name: "bar",
        age: 18,
        deleted: false,
      },
      {
        name: "baz",
        age: 13,
        deleted: true,
      },
      {
        name: "qux",
        age: 13,
        deleted: false,
      },
    ].filter(m.must({ age: ">= 13", name: "[1] === 'a'" }));
  }),

  b.cycle(),
  b.complete()
);

