// eslint-disable-next-line import/no-extraneous-dependencies
import { expectDeprecated, expectType } from "tsd";
import { must, range } from ".";

expectDeprecated(must);
expectType<number[]>(range(1, 5, 2));
expectType<number[]>(range(1, 5));
