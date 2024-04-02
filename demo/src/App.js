import React, { useCallback, useState } from 'react';
import { default as DetectableOverflow, useOverflowDetector } from 'react-detectable-overflow';
import './App.css';

const repoURL = 'https://github.com/h-kanazawa/react-detectable-overflow';
const demoURL = 'https://github.com/h-kanazawa/react-detectable-overflow/tree/master/demo/src/App.js';

// Demo using useOverflowDetector hook
const HookDemo = ({ input, width, handleWidth, handleHeight }) => {
  const onChangeOverflow = useCallback((overflow) => {
    console.log(`useOverflowDetector onChange(${overflow}) is called`);
  }, []);

  const { overflow, ref } = useOverflowDetector({
    onChange: onChangeOverflow,
    handleWidth,
    handleHeight,
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
const ClassicClassDemo = ({ input, width, handleWidth, handleHeight }) => {
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
        handleWidth={handleWidth}
        handleHeight={handleHeight}
      >
        {input}
      </DetectableOverflow>
    </>
  );
};

/**
 * RadioButtons<T>
 * @argument title: string
 * @argument selectedValue: T
 * @argument options: {[key: string]: T}
 * @argument onChange: (value: T) => void
 */
const RadioButtons = ({ title, selectedValue, options, onChange }) => {
  return (
    <>
      <legend className="app-label">{title}</legend>
      {Object.entries(options).map(([key, value]) => (
        <label key={key} className="radio">
          <input
            type="radio"
            className="radio-button"
            checked={selectedValue === value}
            onChange={() => onChange(value)}
          />
          {key}
        </label>
      ))}
    </>
  );
};

const App = () => {
  const [input, updateInput] = useState('');
  const [width, updateWidth] = useState('');
  const [handleWidth, updateHandleWidth] = useState(true);
  const [handleHeight, updateHandleHeight] = useState(true);

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

        <RadioButtons
          title={'width'}
          selectedValue={width}
          options={{
            'not specified': '',
            '40px': '40px',
            '120px': '120px',
          }}
          onChange={updateWidth}
        />

        <RadioButtons
          title={'handleWidth'}
          selectedValue={handleWidth}
          options={{
            true: true,
            false: false,
          }}
          onChange={updateHandleWidth}
        />

        <RadioButtons
          title={'handleHeight'}
          selectedValue={handleHeight}
          options={{
            true: true,
            false: false,
          }}
          onChange={updateHandleHeight}
        />

        <HookDemo input={input} width={width} handleWidth={handleWidth} handleHeight={handleHeight} />

        <ClassicClassDemo input={input} width={width} handleWidth={handleWidth} handleHeight={handleHeight} />
      </div>
    </React.StrictMode>
  );
};

export default App;
