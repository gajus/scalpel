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
    t.deepEqual(
      parse('.' + validClassName)[0].body[0],
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
