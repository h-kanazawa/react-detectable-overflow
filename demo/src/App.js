import React, { useCallback, useState } from 'react';
import { default as DetectableOverflow, useOverflowDetector } from 'react-detectable-overflow';
import './App.css';

const repoURL = 'https://github.com/h-kanazawa/react-detectable-overflow';
const demoURL = 'https://github.com/h-kanazawa/react-detectable-overflow/tree/master/demo/src/App.js';

// Demo using useOverflowDetector hook
const HookDemo = ({ input, width }) => {
  const onChangeOverflow = useCallback((overflow) => {
    console.log(`useOverflowDetector onChange(${overflow}) is called`);
  }, []);

  const { overflow, ref } = useOverflowDetector({
    onChange: onChangeOverflow,
  });

  return (
    <>
      <label htmlFor="output-text" className="app-label">
        {'useOverflowDetector '}
        <label
          className="overflow-state"
          style={{
            backgroundColor: overflow ? '#F39C12' : '#18BC9C',
          }}
        >{`overflow: ${overflow}`}</label>
      </label>
      <div
        ref={ref}
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: width,
          backgroundColor: overflow ? '#F9E9CF' : '#BCF2E7',
        }}
        className="output"
      >
        {input}
      </div>
    </>
  );
};

// Demo using DetectableOverflow component
const ClassicClassDemo = ({ input, width }) => {
  const [overflow, setOverflow] = useState(false);

  return (
    <>
      <label htmlFor="output-text" className="app-label">
        {'<DetectableOverflow/> '}
        <label
          className="overflow-state"
          style={{
            backgroundColor: overflow ? '#F39C12' : '#18BC9C',
          }}
        >{`overflow: ${overflow}`}</label>
      </label>
      <DetectableOverflow
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: width,
          backgroundColor: overflow ? '#F9E9CF' : '#BCF2E7',
        }}
        onChange={setOverflow}
        className="output"
      >
        {input}
      </DetectableOverflow>
    </>
  );
};

const App = () => {
  const [input, updateInput] = useState('');
  const [width, updateWidth] = useState('');

  return (
    <React.StrictMode>
      <header className="app-header">
        <h1 className="app-title">React Detectable Overflow</h1>
      </header>
      <div className="app-body">
        <p>
          This is a demo of <a href={repoURL}>react-detectable-overflow</a>. Try changing the input text, the width, and
          browser's window size. You can see this page's source code <a href={demoURL}>here</a>.
        </p>

        <label htmlFor="input-text" className="app-label">
          input text
        </label>
        <input
          id="input-text"
          className="input-text"
          type="text"
          value={input}
          onChange={(e) => updateInput(e.target.value)}
        />

        <legend className="app-label">width</legend>
        <label className="radio">
          <input type="radio" className="radio-button" checked={width === ''} onChange={() => updateWidth('')} />
          not specified
        </label>
        <label className="radio">
          <input
            type="radio"
            className="radio-button"
            checked={width === '40px'}
            onChange={() => updateWidth('40px')}
          />
          40px
        </label>
        <label className="radio">
          <input
            type="radio"
            className="radio-button"
            checked={width === '120px'}
            onChange={() => updateWidth('120px')}
          />
          120px
        </label>

        <HookDemo input={input} width={width} />

        <ClassicClassDemo input={input} width={width} />
      </div>
    </React.StrictMode>
  );
};

export default App;
