import React from 'react';
import './Node.css';

const Node = React.forwardRef((props, ref) => {
  const {
    col,
    row,
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
      id={`node-${row}-${col}`}
      ref={ref}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
});

export default Node;
