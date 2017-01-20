// @flow

import {
  createParser
} from '../../src';

export const parse = (selector: string) => {
  const parser = createParser();

  return parser.parse(selector);
};
