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

const OverflowEdgeDemo = () => {
  const { ref, overflowTop, overflowBottom, overflowLeft, overflowRight } = useOverflowDetector({ epsilon: 8 });

  const borderTop = `8px solid ${overflowTop ? '#F39C12' : '#18BC9C'}`;
  const borderBottom = `8px solid ${overflowBottom ? '#F39C12' : '#18BC9C'}`;
  const borderLeft = `8px solid ${overflowLeft ? '#F39C12' : '#18BC9C'}`;
  const borderRight = `8px solid ${overflowRight ? '#F39C12' : '#18BC9C'}`;
  return (
    <>
      <div>
        overflowTop: {overflowTop ? "true" : "false"}
        <br />
        overflowBottom: {overflowBottom ? "true" : "false"}
        <br />
        overflowLeft: {overflowLeft ? "true" : "false"}
        <br />
        overflowRight: {overflowRight ? "true" : "false"}
      </div>
      <div ref={ref} style={{ height: "200px", width: "300px", borderTop, borderBottom, borderLeft, borderRight, overflow: 'scroll' }}>
        <div style={{ height: "300px", width: "400px", background: "linear-gradient(45deg, #FFCCCC, #CCFFCC)", fontSize: '40px' }} >
          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
          <br />
          1 2 3 4 5 6 7 8 9 0
        </div>
      </div>
    </>
  )
}

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

        <h2 className="">Detect overflow of each edge</h2>

        <OverflowEdgeDemo />
      </div>
    </React.StrictMode>
  );
};

export default App;
