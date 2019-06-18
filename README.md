# scalpel

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/scalpel?style=flat-square)](https://gitspo.com/mentions/gajus/scalpel)
[![Travis build status](http://img.shields.io/travis/gajus/scalpel/master.svg?style=flat-square)](https://travis-ci.org/gajus/scalpel)
[![NPM version](http://img.shields.io/npm/v/scalpel.svg?style=flat-square)](https://www.npmjs.org/package/scalpel)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

<img src='https://rawgit.com/gajus/scalpel/master/.README/scalpel.svg' height='300' />

A [CSS selector](https://www.w3.org/TR/css3-selectors/) parser.

It parses any valid CSS3 selector into [tokens](#token-types). [Try it](https://jsbin.com/namibub/2/edit?output)!

> Found a selector that cannot be parsed?
> [Raise an issue](https://github.com/gajus/scalpel/issues/new?title=selector%20X%20does%20not%20work&body=The%20following%20X%20(https://www.w3.org/TR/css3-selectors/)%20selector%20produces%20Y%20error.).

This parser is implemented using [Earley parser algorithm](https://en.wikipedia.org/wiki/Earley_parser). Read about Writing a CSS selector parser in under 120 LoC.

> Note:
>
> This parser could be extended to support the entire CSS grammar.
> I don't have such a use case. However, should you want to add new grammar, [raise an issue](https://github.com/gajus/scalpel/issues/new).

* [Usage](#usage)
* [Token types](#token-types)
* [Fields](#fields)
  * [`adjacentSiblingCombinator`](#adjacentsiblingcombinator)
  * [`attributePresenceSelector`](#attributepresenceselector)
  * [`attributeValueSelector`](#attributevalueselector)
  * [`childCombinator`](#childcombinator)
  * [`classSelector`](#classselector)
  * [`descendantCombinator`](#descendantcombinator)
  * [`generalSiblingCombinator`](#generalsiblingcombinator)
  * [`idSelector`](#idselector)
  * [`pseudoClassSelector`](#pseudoclassselector)
  * [`pseudoElementSelector`](#pseudoelementselector)
  * [`typeSelector`](#typeselector)
  * [`universalSelector`](#universalselector)
* [Development](#development)

## Usage

```js
import {
  createGenerator,
  createParser
} from 'scalpel';

const generator = createGenerator();
const parser = createParser();

const tokens: Array<SelectorTokenType | CombinatorTokenType> = parser.parse('.foo.bar');

// [
//   {
//     type: 'selector',
//     body: [
//       {
//         type: 'classSelector',
//         name: 'foo'
//       },
//       {
//         type: 'classSelector',
//         name: 'bar'
//       }
//     ]
//   }
// ]

const selector: string = generator.generate(token);

// .foo.bar

```

> Note:
>
> For programmatic type definitions, refer to [`./src/types.js`](./src/types.js).

## Token types

|Type|Description|Example|
|---|---|---|
|[`adjacentSiblingCombinator`](#adjacentsiblingcombinator)|An [adjacent sibling combinator](https://www.w3.org/TR/css3-selectors/#adjacent-sibling-combinators).|`.baz0 + .baz1`|
|[`attributePresenceSelector`](#attributepresenceselector)|An [attribute presence selector](https://www.w3.org/TR/css3-selectors/#attribute-selectors).|`[qux]`|
|[`attributeValueSelector`](#attributevalueselector)|An [attribute value selector](https://www.w3.org/TR/css3-selectors/#attribute-selectors).|`[qux=val]`, `[qux~=val]`|
|[`childCombinator`](#childcombinator)|A [child combinator](https://www.w3.org/TR/css3-selectors/#child-combinators).|`.baz0 > .baz1`|
|[`classSelector`](#classselector)|A [class selector](https://www.w3.org/TR/css3-selectors/#class-html).|`.baz`|
|[`descendantCombinator`](#descendantcombinator)|A [descendant combinator](https://www.w3.org/TR/css3-selectors/#descendant-combinators).|`.baz0 .baz1`|
|[`generalSiblingCombinator`](#generalsiblingcombinator)|A [general sibling combinator](https://www.w3.org/TR/css3-selectors/#general-sibling-combinators).|`.baz0 ~ .baz1`|
|[`idSelector`](#idselector)|An [ID selector](https://www.w3.org/TR/css3-selectors/#id-selectors)|`#bar`|
|[`pseudoClassSelector`](#pseudoclassselector)|A [pseudo-class selector](https://www.w3.org/TR/css3-selectors/#pseudo-classes).|`:corge`, `:corge()`, `:corge(val0, 'val1', "val2")`|
|[`pseudoElementSelector`](#pseudoelementselector)|A [pseudo-element selector](https://www.w3.org/TR/css3-selectors/#pseudo-elements).|`::grault`|
|[`typeSelector`](#typeselector)|A [type selector](https://www.w3.org/TR/css3-selectors/#type-selectors).|`foo`|
|[`universalSelector`](#universalselector)|A [universal selector](https://www.w3.org/TR/css3-selectors/#universal-selector).|`*`|

## Fields

Tokens have fields that describe additional information about the token. Fields are [token type](#token-types) specific.

### `adjacentSiblingCombinator`

|Name|Description|Example|
|---|---|---|
|`type`|Name of the token type.|"adjacentSiblingCombinator"|

### `attributePresenceSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Name of the element attribute.|"qux" in `[qux]`|
|`type`|Name of the token type.|"attributePresenceSelector"|

### `attributeValueSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Name of the element attribute.|"qux" in `[qux]`|
|`operator`|Operator of the expression.|"\*=" in `[qux*=val]`|
|`type`|Name of the token type.|"attributeValueSelector"|
|`value`|Value of the expression.|"val" in `[qux=val]`|

### `childCombinator`

|Name|Description|Example|
|---|---|---|
|`type`|Name of the token type.|"childCombinator"|

### `classSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Class name.|"baz" in `.baz[qux]`|
|`type`|Name of the token type.|"classSelector"|

### `descendantCombinator`

|Name|Description|Example|
|---|---|---|
|`type`|Name of the token type.|"descendantCombinator"|

### `generalSiblingCombinator`

|Name|Description|Example|
|---|---|---|
|`type`|Name of the token type.|"generalSiblingCombinator"|

### `idSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Name of the ID.|"bar" in `#bar:corge()`|
|`type`|Name of the token type.|"idSelector"|

### `pseudoClassSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Name of the pseudo-class.|"corge" in `#bar:corge()`|
|`parameters`|Array of parameter values.|"var0", "var1" and "var2" in `:corge(var0, 'var1', "var2")`|
|`type`|Name of the token type.|"pseudoClassSelector"|

### `pseudoElementSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Name of the pseudo-element.|"grault" in `#bar::grault`|
|`type`|Name of the token type.|"pseudoElementSelector"|

### `typeSelector`

|Name|Description|Example|
|---|---|---|
|`name`|Name of the node.|"foo" in `foo#bar.baz`|
|`type`|Name of the token type.|"typeSelector"|

### `universalSelector`

|Name|Description|Example|
|---|---|---|
|`type`|Name of the token type.|"universalSelector"|

## Development

```bash
git pull git@github.com:gajus/scalpel.git
cd ./scalpel
npm install
npm run test
```

The parser grammar is in the [`./src/grammar.ne`](./src/grammar.ne) file. After making changes to the parser grammar, you need to compile the parser using `npm run compile-grammar` command.
