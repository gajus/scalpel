// @flow

import test from 'ava';
import {
  generate,
  parse
} from './helpers';

const MIRROR = {};

/* eslint-disable sort-keys */
const validSelectors = {
  '*': MIRROR,
  '::grault': MIRROR,
  'foo > bar > baz': MIRROR,
  'foo ~ bar ~ baz': MIRROR,
  'foo + bar + baz': MIRROR,
  'foo bar baz': MIRROR,
  'foo:corge()': 'foo:corge',
  'foo:corge(foo)': 'foo:corge("foo")',
  'foo.baz': MIRROR,
  'foo[qux]': MIRROR,
  'foo[qux^="val1"]': MIRROR,
  'foo[qux="val1"]': MIRROR,
  'foo[qux=\'val1\']': 'foo[qux="val1"]',
  'foo#bar.baz': MIRROR,
  'foo#bar': MIRROR
};

/* eslint-enable */

for (const [input, output] of Object.entries(validSelectors)) {
  const expectedResult = output === MIRROR ? input : output;

  if (typeof expectedResult !== 'string') {
    throw new Error('Unexpected state.');
  }

  test('\ninput:\t' + input + '\noutput:\t' + expectedResult, (t): void => {
    t.true(expectedResult === generate(parse(input)));
  });
}
