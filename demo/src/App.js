import React, { useState } from 'react';
import DetectableOverflow from 'react-detectable-overflow';
import './App.css';

const repoURL = 'https://github.com/h-kanazawa/react-detectable-overflow';
const demoURL = 'https://github.com/h-kanazawa/react-detectable-overflow/tree/master/demo/src/App.js';

const App = () => {
  const [input, updateInput] = useState('');
  const [width, updateWidth] = useState('');
  const [isOverflow, updateIsOverflow] = useState(false);

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">React Detectable Overflow</h1>
      </header>
      <div className="app-body">
        <p>
          This is a demo of <a href={repoURL}>react component DetectableOverflow</a>. Try to change the input text, the
          width, and browser window's size. You can see this page's source code <a href={demoURL}>here</a>.
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

        <label htmlFor="output-text" className="app-label">
          {'Rendered <DetectableOverflow/> '}
          <label
            className="overflow-state"
            style={{
              backgroundColor: isOverflow ? '#F39C12' : '#18BC9C',
            }}
          >{`isOverflowed: ${isOverflow}`}</label>
        </label>
        <DetectableOverflow
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: width,
            backgroundColor: isOverflow ? '#F9E9CF' : '#BCF2E7',
          }}
          onChange={updateIsOverflow}
          className="output"
        >
          {input}
        </DetectableOverflow>
      </div>
    </div>
  );
};

export default App;
