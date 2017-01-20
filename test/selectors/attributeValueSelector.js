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
  test('valid comparison operator: [foo' + attributeValueOperator + 'bar]', (t): void => {
    t.deepEqual(
      parse('[foo' + attributeValueOperator + 'bar]')[0].body[0],
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
  '_-',

  // eslint-disable-next-line quotes
  "'foo123FOO_-'",
  '"foo123FOO_-"'
];

for (const validAttributeValue of validAttributeValues) {
  test('valid attribute value: [foo=' + validAttributeValue + ']', (t): void => {
    t.deepEqual(
      parse('[foo=' + validAttributeValue + ']')[0].body[0],
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
  test('invalid attribute value: [foo=' + invalidAttributeValue + ']', (t): void => {
    t.throws(() => {
      parse('[foo=' + invalidAttributeValue + ']');
    });
  });
}
