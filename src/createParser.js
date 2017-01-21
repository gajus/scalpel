// @flow

import {
  Parser
} from 'nearley';
import type {
  CombinatorTokenType,
  SelectorTokenType
} from './types';
import grammar from './grammar';

export default () => {
  const parse = (selector: string): Array<SelectorTokenType | CombinatorTokenType> => {
    const parser = new Parser(grammar.ParserRules, grammar.ParserStart);

    const results = parser.feed(selector).results;

    if (results.length === 0) {
      throw new Error('Found no parsings.');
    }

    if (results.length > 1) {
      throw new Error('Ambiguous results.');
    }

    return results[0];
  };

  return {
    parse
  };
};
