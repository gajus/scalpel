// @flow

import type {
  CombinatorTokenType,
  SelectorTokenType
} from '../../src/types';
import {
  createGenerator,
  createParser
} from '../../src';

export const generate = (selectors: Array<SelectorTokenType | CombinatorTokenType>) => {
  const generator = createGenerator();

  return generator.generate(selectors);
};

export const parse = (selector: string) => {
  const parser = createParser();

  return parser.parse(selector);
};
