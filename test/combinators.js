// @flow

import test from 'ava';
import {
  parse
} from './helpers';

const combinators = {
  'foo > bar > baz': [
    'selector',
    'childCombinator',
    'selector',
    'childCombinator',
    'selector'
  ],
  'foo ~ bar + baz': [
    'selector',
    'generalSiblingCombinator',
    'selector',
    'adjacentSiblingCombinator',
    'selector'
  ],
  'foo bar   baz': [
    'selector',
    'descendantCombinator',
    'selector',
    'descendantCombinator',
    'selector'
  ],
  'foo>bar>baz': [
    'selector',
    'childCombinator',
    'selector',
    'childCombinator',
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
