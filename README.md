# React Detectable Overflow

[![npm version](https://badge.fury.io/js/react-detectable-overflow.svg)](https://badge.fury.io/js/react-detectable-overflow)

A React hook and component detecting overflow state.

## [Demo](https://h-kanazawa.github.io/react-detectable-overflow/index.html)

## Install

```
npm install react-detectable-overflow
```

or

```
yarn add react-detectable-overflow
```

## Example

### Hook useOverflowDetector

```jsx
import * as React from 'react';
import { useOverflowDetector } from 'react-detectable-overflow';

const SampleComponent = () => {
  const { ref, overflow } = useOverflowDetector();

  return (
    <div
      ref={ref}
      style={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '120px',
        backgroundColor: overflow ? 'red' : 'green',
      }}
    >
      This is a sample text.
    </div>
  );
};
```

### Class DetectableOverflow

```jsx
import * as React from 'react';
import DetectableOverflow from 'react-detectable-overflow';

const SampleComponent = () => {
  const [overflow, setOverflow] = useState(false);

  return (
    <DetectableOverflow
      onChange={setOverflow}
      style={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '120px',
        backgroundColor: overflow ? '#F9E9CF' : '#BCF2E7',
      }}
    >
      This is a sample text.
    </DetectableOverflow>
  );
};
```

## Caution

Be careful when the size of `children` content depends on overflow state. The following code perhaps causes the infinite loop of changing `overflow` state.

```jsx
import * as React from 'react';
import { useOverflowDetector } from 'react-detectable-overflow';

// DO NOT WRITE LIKE THIS!
const SampleComponent = () => {
  const { ref, overflow } = useOverflowDetector();

  return <div ref={ref}>{overflow ? 'short' : 'loooooooooooooooooooooooooooooooooooooong'}</div>;
};
```

## License

This package is released under the MIT License, see [LICENSE](./LICENSE)

## Changelog

#### 0.7.0

- Add useOverflowDetector

#### 0.4.0

- BREAKING CHANGE: Support vertical overflow detection
