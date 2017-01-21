// @flow

import type {
  CombinatorTokenType,
  SelectorTokenType
} from './types';

const escapeValue = (value: string): string => {
  return JSON.stringify(value);
};

const renderSelector = (selectorToken: SelectorTokenType) => {
  const tokens = selectorToken.body;
  const parts = [];

  for (const token of tokens) {
    let part;

    if (token.type === 'universalSelector') {
      part = '*';
    } else if (token.type === 'typeSelector') {
      part = token.name;
    } else if (token.type === 'idSelector') {
      part = '#' + token.name;
    } else if (token.type === 'classSelector') {
      part = '.' + token.name;
    } else if (token.type === 'attributePresenceSelector') {
      part = '[' + token.name + ']';
    } else if (token.type === 'attributeValueSelector') {
      part = '[' + token.name + token.operator + escapeValue(token.value) + ']';
    } else if (token.type === 'pseudoClassSelector') {
      part = ':' + token.name;

      if (token.parameters.length) {
        part += '(' + token.parameters.map(escapeValue).join(', ') + ')';
      }
    } else if (token.type === 'pseudoElementSelector') {
      part = '::' + token.name;
    } else {
      throw new Error('Unknown token.');
    }

    parts.push(part);
  }

  return parts.join('');
};

export default () => {
  const generate = (tokens: Array<SelectorTokenType | CombinatorTokenType>): string => {
    /**
     * @todo Think of a better name. This array contains selectors or combinators.
     */
    const sequences: Array<string> = [];

    for (const token of tokens) {
      if (token.type === 'selector') {
        sequences.push(renderSelector(token));
      } else if (token.type === 'descendantCombinator') {
        sequences.push(' ');
      } else if (token.type === 'childCombinator') {
        sequences.push(' > ');
      } else if (token.type === 'adjacentSiblingCombinator') {
        sequences.push(' + ');
      } else if (token.type === 'generalSiblingCombinator') {
        sequences.push(' ~ ');
      } else {
        throw new Error('Unknown token.');
      }
    }

    return sequences.join('');
  };

  return {
    generate
  };
};
