// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

const validAttributeNames = [
  'foo',
  'FOO',
  'foo123',
  'foo-bar',
  '_foo'
];

for (const validAttributeName of validAttributeNames) {
  test('[' + validAttributeName + ']', (t): void => {
    const tokens = parse('[' + validAttributeName + ']');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: validAttributeName,
        type: 'attributePresenceSelector'
      }
    );
  });
}
