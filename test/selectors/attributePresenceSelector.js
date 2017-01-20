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
    t.deepEqual(
      parse('[' + validAttributeName + ']')[0].body[0],
      {
        name: validAttributeName,
        type: 'attributePresenceSelector'
      }
    );
  });
}
