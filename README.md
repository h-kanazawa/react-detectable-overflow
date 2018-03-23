# React Detectable Overflow

[![Circle Status](https://circleci.com/gh/h-kanazawa/react-detectable-overflow.svg?style=shield&circle-token=bdff2eda82abf6802195c4c9935852b1f276745f)](https://circleci.com/gh/h-kanazawa/react-detectable-overflow)
[![npm version](https://badge.fury.io/js/react-detectable-overflow.svg)](https://badge.fury.io/js/react-detectable-overflow)

A React component which is able to detect changes in the state that the contents is overflowed.

## [Demo](https://h-kanazawa.github.io/react-detectable-overflow/index.html)

## Install

```
npm install react-detectable-overflow
```
or
```
yarn add react-detectable-overflow
```

## Props

|prop|required|type|description|default|
|:--|:--|:--|:--|:--|
|value|true|string|||
|tag||string|element type (e.g. `'p'`, `'div'`)|'div'|
|style||object|css style of the element|{<br>width: '100%',<br>textOverflow: 'ellipsis',<br>whiteSpace: 'nowrap',<br>overflow: 'hidden',<br>}|
|className||string|class names|''|
|onChange||(isOverflowed: boolean) => void|callback function called when its overflowing status is changed|

## Example

```jsx
import * as React from 'react';
import DetectableOverflow from 'react-detectable-overflow';

class SampleComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(isOverflowed) {
    // do something
  }

  render {
    return (
      <DetectableOverflow
        value="This is a sample text."
        onChange={this.handleChange}
        />
    );
  }
}
```

## Caution

Be careful when you change the length of `value` by onChange callback. The following code perhaps causes the infinite loop of changing `isOverflowed` state.

```jsx
// DO NOT WRITE LIKE THIS!
<DetectableOverflow
  value={this.state.value}
  onChange={(isOverflowed) => {
    if (isOverflowed) {
      this.setState({ value: 'short' });
    } else {
      this.setState({ value: 'loooooooooooooooooooooooooooooooooooooong' });
    }
  }}
  />
```

## License

This package is released under the MIT License, see [LICENSE](./LICENSE)
