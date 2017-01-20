// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

test('*', (t): void => {
  t.deepEqual(
    parse('*')[0].body[0],
    {
      type: 'universalSelector'
    }
  );
});
