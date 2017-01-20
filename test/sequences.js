// @flow

import test from 'ava';
import {
  parse
} from './helpers';

const validSelectors = {
  '#bar': [
    'bar'
  ],
  '#bar.baz': [
    'bar',
    'baz'
  ],
  '#bar.baz:corge()': [
    'bar',
    'baz',
    'corge'
  ],
  '#bar.baz0.baz1': [
    'bar',
    'baz0',
    'baz1'
  ],
  '#bar[qux]': [
    'bar',
    'qux'
  ],
  '*': [
    '*'
  ],
  '*:corge()': [
    '*',
    'corge'
  ],
  '*[qux]': [
    '*',
    'qux'
  ],
  '*[qux]:corge()': [
    '*',
    'qux',
    'corge'
  ],
  '.baz': [
    'baz'
  ],
  '.baz:corge()': [
    'baz',
    'corge'
  ],
  '.baz[qux]': [
    'baz',
    'qux'
  ],
  '.baz0.baz1': [
    'baz0',
    'baz1'
  ],
  ':corge()': [
    'corge'
  ],
  ':corge0():corge1()': [
    'corge0',
    'corge1'
  ],
  '[qux]': [
    'qux'
  ],
  '[qux]:corge()': [
    'qux',
    'corge'
  ],
  '[qux0][qux1]': [
    'qux0',
    'qux1'
  ],
  'foo#bar': [
    'foo',
    'bar'
  ],
  'foo#bar.baz': [
    'foo',
    'bar',
    'baz'
  ],
  'foo#bar.baz:corge()': [
    'foo',
    'bar',
    'baz',
    'corge'
  ],
  'foo#bar.baz[qux]:corge()': [
    'foo',
    'bar',
    'baz',
    'qux',
    'corge'
  ],
  'foo.baz': [
    'foo',
    'baz'
  ],
  'foo:corge()': [
    'foo',
    'corge'
  ],
  'foo[qux]': [
    'foo',
    'qux'
  ]
};

for (const [selector, expectedResult] of Object.entries(validSelectors)) {
  test('valid: ' + selector, (t): void => {
    t.deepEqual(
      parse(selector)[0].body.map((result) => {
        if (result.type === 'universalSelector') {
          return '*';
        }

        if (!result.name) {
          throw new Error('"name" property is not defined.');
        }

        return result.name;
      }),
      expectedResult
    );
  });
}

const invalidSelectors = [
  '#bar0#bar1'
];

for (const invalidSelector of invalidSelectors) {
  test('invalid: ' + invalidSelector, (t): void => {
    t.throws(() => {
      parse(invalidSelector);
    });
  });
}
