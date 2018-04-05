import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormControl, FormGroup, Label, Grid, Radio, Row } from 'react-bootstrap';
import DetectableOverflow from 'react-detectable-overflow';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      width: '',
      isOverflowed: false,
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeWidth = this.handleChangeWidth.bind(this);
  }

  handleChangeInput(event) {
    this.setState({ input: event.target.value });
  }

  handleChangeWidth(width) {
    this.setState({ width });
  }

  handleChangeOverflow(isOverflowed) {
    this.setState({ isOverflowed });
  }

  render() {
    const repoURL = 'https://github.com/h-kanazawa/react-detectable-overflow';
    const demoURL = 'https://github.com/h-kanazawa/react-detectable-overflow/tree/master/demo/src/App.js';

    return (
      <div>
        <header className="app-header">
          <h1 className="app-title">React Detectable Overflow</h1>
        </header>

        <Grid>
          <Row>
            <Col xs={12} sm={6} smOffset={3}>

              <p>
                This is a demo of <a href={repoURL}>react component DetectableOverflow</a>.
                Try to change the input text, the width, and browser window's size.
                You can see this page's source code <a href={demoURL}>here</a>.
              </p>

              <Form onSubmit={e => {e.preventDefault()}}>
                <FormGroup controlId="input" bsSize="sm">
                  <ControlLabel>input text</ControlLabel>
                  <FormControl type="text" value={this.state.input} onChange={this.handleChangeInput} />
                </FormGroup>

                <FormGroup controlId="width" bsSize="sm">
                  <ControlLabel>width</ControlLabel>
                  <Radio checked={this.state.width === ''} onChange={e => this.handleChangeWidth('')}>not specified</Radio>
                  <Radio checked={this.state.width === '40px'} onChange={e => this.handleChangeWidth('40px')}>40px</Radio>
                  <Radio checked={this.state.width === '120px'} onChange={e => this.handleChangeWidth('120px')}>120px</Radio>
                </FormGroup>

                <FormGroup controlId="output" bsSize="sm">
                  <ControlLabel>
                    {'Rendered <DetectableOverflow/> '}
                    <Label
                      bsStyle={this.state.isOverflowed ? 'warning' : 'success'}
                      >
                      {`isOverflowed: ${this.state.isOverflowed}`}
                    </Label>
                  </ControlLabel>
                    <DetectableOverflow
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: this.state.width,
                        backgroundColor: this.state.isOverflowed ? '#F9E9CF' : '#BCF2E7',
                      }}
                      onChange={isOverflowed => this.handleChangeOverflow(isOverflowed)}
                      className="output"
                      >
                      {this.state.input}
                    </DetectableOverflow>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
