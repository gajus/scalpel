// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

const attributeValueOperators = [
  '=',
  '~=',
  '|=',
  '^=',
  '$=',
  '*='
];

for (const attributeValueOperator of attributeValueOperators) {
  test('valid comparison operator: [foo' + attributeValueOperator + '"bar"]', (t): void => {
    const tokens = parse('[foo' + attributeValueOperator + '"bar"]');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: 'foo',
        operator: attributeValueOperator,
        type: 'attributeValueSelector',
        value: 'bar'
      }
    );
  });
}

const validAttributeValues = [
  'foo',
  'FOO',
  'a123',
  'a-123',
  '_123',
  '_-'
];

for (const validAttributeValue of validAttributeValues) {
  test('valid attribute value: [foo="' + validAttributeValue + '"]', (t): void => {
    const tokens = parse('[foo="' + validAttributeValue + '"]');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: 'foo',
        operator: '=',
        type: 'attributeValueSelector',
        value: /^['"]/.test(validAttributeValue) ? validAttributeValue.slice(1, -1) : validAttributeValue
      }
    );
  });
}

const invalidAttributeValues = [
  '=',
  '[',
  ']',
  ',',
  'foo bar',
  '"',
  '\''
];

for (const invalidAttributeValue of invalidAttributeValues) {
  test('invalid attribute value: [foo="' + invalidAttributeValue + '"]', (t): void => {
    t.throws(() => {
      parse('[foo=' + invalidAttributeValue + ']');
    });
  });
}
