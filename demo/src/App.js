import React, { useState } from 'react';
import { Col, ControlLabel, Form, FormControl, FormGroup, Label, Grid, Radio, Row } from 'react-bootstrap';
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

      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <p>
              This is a demo of <a href={repoURL}>react component DetectableOverflow</a>. Try to change the input text,
              the width, and browser window's size. You can see this page's source code <a href={demoURL}>here</a>.
            </p>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <FormGroup controlId="input" bsSize="sm">
                <ControlLabel>input text</ControlLabel>
                <FormControl type="text" value={input} onChange={(e) => updateInput(e.target.value)} />
              </FormGroup>

              <FormGroup controlId="width" bsSize="sm">
                <ControlLabel>width</ControlLabel>
                <Radio checked={width === ''} onChange={() => updateWidth('')}>
                  not specified
                </Radio>
                <Radio checked={width === '40px'} onChange={() => updateWidth('40px')}>
                  40px
                </Radio>
                <Radio checked={width === '120px'} onChange={() => updateWidth('120px')}>
                  120px
                </Radio>
              </FormGroup>

              <FormGroup controlId="output" bsSize="sm">
                <ControlLabel>
                  {'Rendered <DetectableOverflow/> '}
                  <Label bsStyle={isOverflow ? 'warning' : 'success'}>{`isOverflowed: ${isOverflow}`}</Label>
                </ControlLabel>
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
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default App;
