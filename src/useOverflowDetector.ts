import { useCallback, useState, useRef, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export interface useOverflowDetectorProps {
  onChange?: (overflow: boolean) => void;
}

export function useOverflowDetector(props: useOverflowDetectorProps) {
  const [overflow, setOverflow] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const updateState = useCallback(() => {
    if (ref.current == undefined) {
      return;
    }
    const newState =
      ref.current.offsetWidth < ref.current.scrollWidth || ref.current.offsetHeight < ref.current.scrollHeight;
    if (newState === overflow) {
      return;
    }
    setOverflow(newState);
    if (props.onChange) {
      props.onChange(newState);
    }
  }, [ref.current, props.onChange, setOverflow, overflow]);

  useResizeDetector({
    targetRef: ref,
    onResize: updateState,
  });

  useEffect(() => {
    updateState();
  });

  return {
    overflow,
    ref,
  };
}
