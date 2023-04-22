import React from 'react';
import Node from './Node/Node';
import './PathFindingVisualizer.css';

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 10;

const PathFindingVisualizer = () => {
    const createNode = (col,row) =>{
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isWall: false,
            previousNode: null
        };
    };

    //create a 2D grid of Node component
    let grid = new Array(20).fill(null).map((_, row) => {
        return new Array(20).fill(null).map((_, col) => {
            return createNode(row,col);
        });
    });
    


    const getInitialGrid = () => {
        return grid.map((row, rowIdx) => {
            return <div key={rowIdx}>
                {
                    row.map((node, nodeIdx) => {
                        const { isStart, isFinish } = node;
                        const nodeClass = isStart ? 'node-start' : isFinish ? 'node-finish' : '';
                        return <Node key={`${rowIdx}-${nodeIdx}`} className={nodeClass}></Node>
                    })
                }
            </div>
        })
    }

    function visualizeDijkstra() {

    }

    return (
        <>
            <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
            <div className='grid'>
                {getInitialGrid()}
            </div>
        </>
    );
};

export default PathFindingVisualizer;
