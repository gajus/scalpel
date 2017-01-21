// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

const pseudoElementSelectorNames = [
  'foo',
  'FOO',
  'foo123',
  'foo-bar'
];

for (const pseudoElementSelectorName of pseudoElementSelectorNames) {
  test('valid :' + pseudoElementSelectorName, (t): void => {
    const tokens = parse('::' + pseudoElementSelectorName);

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: pseudoElementSelectorName,
        type: 'pseudoElementSelector'
      }
    );
  });
}

const invalidPseudoElementSelectorNames = [
  '-foo',
  '123foo'
];

for (const invalidPseudoElementSelectorName of invalidPseudoElementSelectorNames) {
  test('invalid :' + invalidPseudoElementSelectorName, (t): void => {
    t.throws(() => {
      parse('::' + invalidPseudoElementSelectorName);
    });
  });
}
