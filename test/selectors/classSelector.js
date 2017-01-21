// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

const validClassNames = [
  'foo',
  'FOO',
  '-foo',
  '-_foo',
  '_0',
  'foo-0'
];

for (const validClassName of validClassNames) {
  test('valid className selector: .' + validClassName, (t): void => {
    const tokens = parse('.' + validClassName);

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: validClassName,
        type: 'classSelector'
      }
    );
  });
}

const invalidClassNames = [
  '0',
  '-0',
  '*'
];

for (const invalidClassName of invalidClassNames) {
  test('invalid className selector: .' + invalidClassName, (t): void => {
    t.throws(() => {
      parse('.' + invalidClassName);
    });
  });
}
