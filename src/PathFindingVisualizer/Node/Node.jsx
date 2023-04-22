import React from 'react';
import './Node.css';

const Node = ({ className }) => {
  return (
    <div className={`node ${className}`}></div>
  );
};

export default Node;
