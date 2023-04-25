import React from 'react';
import './Node.css';

const Node = React.forwardRef((props, ref) => {
  const {
    isStart,
    isFinish,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

  return (
    <div
      ref={ref}
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  );
});

export default Node;
