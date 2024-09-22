import { useCallback, useState, useRef, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export interface useOverflowDetectorProps {
  onChange?: (overflow: boolean) => void;
  handleHeight?: boolean;
  handleWidth?: boolean;
  epsilon?: number;
}

export function useOverflowDetector(props: useOverflowDetectorProps = {}) {
  const [overflow, setOverflow] = useState(false);
  const [overflowTop, setOverflowTop] = useState(false);
  const [overflowBottom, setOverflowBottom] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(false);
  const [overflowRight, setOverflowRight] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const updateState = useCallback(() => {
    if (ref.current == undefined) {
      return;
    }

    const { handleWidth = true, handleHeight = true, epsilon = 0 } = props;

    setOverflowTop(ref.current.scrollTop > epsilon);
    setOverflowBottom(ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight > epsilon);
    setOverflowLeft(ref.current.scrollLeft > epsilon);
    setOverflowRight(ref.current.scrollWidth - ref.current.scrollLeft - ref.current.clientWidth > epsilon);

    const newState =
      (handleWidth && ref.current.offsetWidth < ref.current.scrollWidth) ||
      (handleHeight && ref.current.offsetHeight < ref.current.scrollHeight);

    if (newState === overflow) {
      return;
    }
    setOverflow(newState);
    if (props.onChange) {
      props.onChange(newState);
    }
  }, [ref.current, props.handleWidth, props.handleHeight, props.onChange, setOverflow, overflow, overflowTop, overflowBottom, overflowLeft, overflowRight]);

  useResizeDetector({
    targetRef: ref,
    onResize: updateState,
  });

  useEffect(() => {
    updateState();
  });

  useEffect(() => {
    if (ref.current == undefined) {
      return;
    }
    ref.current.addEventListener('scroll', updateState);
    return () => {
      if (ref.current == undefined) {
        return;
      }
      ref.current.removeEventListener('scroll', updateState);
    };
  }, [ref.current]);

  return {
    overflow,
    ref,
    overflowTop,
    overflowBottom,
    overflowLeft,
    overflowRight,
  };
}
