// @flow

import test from 'ava';
import {
  parse
} from '../helpers';

const pseudoClassSelectorNames = [
  'foo',
  'FOO',
  'foo123',
  'foo-bar'
];

for (const pseudoClassSelectorName of pseudoClassSelectorNames) {
  test('valid :' + pseudoClassSelectorName, (t): void => {
    const tokens = parse(':' + pseudoClassSelectorName);

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: pseudoClassSelectorName,
        type: 'pseudoClassSelector'
      }
    );
  });
}

const invalidPseudoClassSelectorNames = [
  '-foo',
  '123foo'
];

for (const invalidPseudoClassSelectorName of invalidPseudoClassSelectorNames) {
  test('invalid :' + invalidPseudoClassSelectorName, (t): void => {
    t.throws(() => {
      parse(':' + invalidPseudoClassSelectorName);
    });
  });
}

const unquotedValues = [
  'foo',
  'FOO',
  '123',
  '!@#$%^&*'
];

for (const unquotedValue of unquotedValues) {
  test('valid :not(' + unquotedValue + ')', (t): void => {
    const tokens = parse(':not(' + unquotedValue + ')');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: 'not',
        parameters: [
          unquotedValue
        ],
        type: 'pseudoClassSelector'
      }
    );
  });
}

const invalidUnquotedValues = [
  'foo foo',
  'foo()foo',
  '"',
  '\''
];

for (const invalidUnquotedValue of invalidUnquotedValues) {
  test('invalid :foo(' + invalidUnquotedValue + ')', (t): void => {
    t.throws(() => {
      parse(':foo(' + invalidUnquotedValue + ')');
    });
  });
}

/* eslint-disable quotes */
const quotedValuesSingleQuotes = [
  "'foo'",
  "'foo bar'",
  "'FOO'",
  "'123'",
  "'!@#$%^&*'",
  "'foo\\' bar'",
  "'foo, bar'",
  "'foo()[] bar'"
];

/* eslint-enable */

for (const quotedValueSingleQuotes of quotedValuesSingleQuotes) {
  test('valid :not(' + quotedValueSingleQuotes + ')', (t): void => {
    const tokens = parse(':not(' + quotedValueSingleQuotes + ')');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: 'not',
        parameters: [
          quotedValueSingleQuotes.replace('\\\'', '\'').slice(1, -1)
        ],
        type: 'pseudoClassSelector'
      }
    );
  });
}

const quotedValuesDoubleQuotes = [
  '"foo"',
  '"foo bar"',
  '"FOO"',
  '"123"',
  '"!@#$%^&*"',
  '"foo\\" bar"',
  '"foo, bar"',
  '"foo()[] bar"'
];

for (const quotedValueDoubleQuotes of quotedValuesDoubleQuotes) {
  test('valid :not(' + quotedValueDoubleQuotes + ')', (t): void => {
    const tokens = parse(':not(' + quotedValueDoubleQuotes + ')');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: 'not',
        parameters: [
          quotedValueDoubleQuotes.replace('\\"', '"').slice(1, -1)
        ],
        type: 'pseudoClassSelector'
      }
    );
  });
}

const multipleParameters = [
  'foo,bar,baz',
  'foo, bar, baz',
  '"foo", "bar", "baz"',

  // eslint-disable-next-line quotes
  "'foo', 'bar', 'baz'"
];

for (const multipleParamter of multipleParameters) {
  test('valid :not(' + multipleParamter + ')', (t): void => {
    const tokens = parse(':not(' + multipleParamter + ')');

    if (tokens[0].type !== 'selector') {
      throw new Error('Unexpected state.');
    }

    t.deepEqual(
      tokens[0].body[0],
      {
        name: 'not',
        parameters: [
          'foo',
          'bar',
          'baz'
        ],
        type: 'pseudoClassSelector'
      }
    );
  });
}
