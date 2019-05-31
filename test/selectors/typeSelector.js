// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

const validNodeNames = [
  'foo',
  'foo-123',
  'FOO',
  'foo-bar',
  '_0'
];

for (const validNodeName of validNodeNames) {
  test('valid:' + validNodeName, (t): void => {
    const tokens = parse(validNodeName);

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: validNodeName,
        type: 'typeSelector'
      }
    );
  });
}

const invalidNodeNames = [
  '-foo',
  '123'
];

for (const invalidNodeName of invalidNodeNames) {
  test('invalid:' + invalidNodeName, (t): void => {
    t.throws(() => {
      parse(invalidNodeName);
    });
  });
}
