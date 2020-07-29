import * as React from 'react';
import { default as ReactResizeDetector } from 'react-resize-detector';

export interface Props {
  tag?: string;
  style?: object;
  className?: string;
  onChange?: (isOverflowed: boolean) => void;
}

export interface States {
  isOverflowed: boolean;
}

const defaultTag: string = 'div';
const defaultStyle: object = {
  width: '100%',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export class DetectableOverflow extends React.Component<Props, States> {

  private ref: HTMLElement | null;

  constructor(props: Props) {
    super(props);
    this.ref = null;
    this.state = { isOverflowed: false };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate() {
    this.updateState();
  }

  updateState() {
    if (this.ref === null) {
      return;
    }

    const newState =
      this.ref.offsetWidth !== this.ref.scrollWidth ||
      this.ref.offsetHeight !== this.ref.scrollHeight;

    if (newState === this.state.isOverflowed) {
      return;
    }

    this.setState({ isOverflowed: newState });
    if (this.props.onChange) {
      this.props.onChange(newState);
    }
  }

  render() {
    const tag = this.props.tag ? this.props.tag : defaultTag;
    const style = this.props.style ? this.props.style : defaultStyle;
    const className = this.props.className ? this.props.className : '';
    const props = {
      style,
      className,
      ref: (el: Element | null) => {
        this.ref = (el instanceof HTMLElement) ? el : null;
      },
    };

    return React.createElement(
      tag,
      props,
      <ReactResizeDetector handleWidth onResize={this.updateState} />,
      this.props.children,
    );
  }
}
