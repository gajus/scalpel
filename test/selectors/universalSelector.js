// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

test('*', (t): void => {
  const tokens = parse('*');

  if (tokens[0].type !== 'selector') {
    throw new Error('Unexpected state.');
  }

  t.deepEqual(
    tokens[0].body[0],
    {
      type: 'universalSelector'
    }
  );
});
