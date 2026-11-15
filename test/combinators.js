// @flow

import test from 'ava';
import {
  parse
} from './helpers';

const combinators = {
  'foo + bar + baz': [
    'selector',
    'adjacentSiblingCombinator',
    'selector',
    'adjacentSiblingCombinator',
    'selector'
  ],
  'foo > bar > baz': [
    'selector',
    'childCombinator',
    'selector',
    'childCombinator',
    'selector'
  ],
  'foo ~ bar ~ baz': [
    'selector',
    'generalSiblingCombinator',
    'selector',
    'generalSiblingCombinator',
    'selector'
  ],
  'foo bar baz': [
    'selector',
    'descendantCombinator',
    'selector',
    'descendantCombinator',
    'selector'
  ]
};

for (const [selector, types] of Object.entries(combinators)) {
  test(selector, (t): void => {
    t.deepEqual(
      parse(selector)
        .map((part) => {
          return part.type;
        }),
      types
    );
  });
}

for (const whitespace of ['\n', '\r', '\t', '\f', '\r\n', ' \n\t ']) {
  for (const combinator of ['', '>', '+', '~']) {
    const selector = `foo${whitespace}${combinator}${whitespace}bar`;
    const normalized = combinator ? `foo ${combinator} bar` : 'foo bar';

    test(`CSS whitespace ${JSON.stringify(selector)}`, (t): void => {
      t.deepEqual(parse(selector), parse(normalized));
    });
  }
}
