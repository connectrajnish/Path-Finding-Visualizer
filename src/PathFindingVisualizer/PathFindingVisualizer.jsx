import React, { useState, useRef } from 'react';
import Node from './Node/Node';
import './PathFindingVisualizer.css';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';

const START_NODE_ROW = 3;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 10;
const TIME_DELAY = 50;

const PathFindingVisualizer = () => {

    const nodeRefs = useRef([]);
    
    const createNode = (col, row) => {
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
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const getInitialGrid = () => {
        const initialGrid = new Array(20).fill(null).map((_, row) => {
            return new Array(20).fill(null).map((_, col) => {
                return createNode(col, row);
            });
        });
        return initialGrid;
    }

    // set the grid state variable by calling getInitialGrid function
    useState(() => {
        setGrid(getInitialGrid());
    }, []);

    function animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            const element = nodeRefs.current[`${node.row}-${node.col}`];
            console.log('node:', node, 'element:', element);
            // console.log(node.className);
            if (element) {
              element.className = 'node node-shortest-path';
            }
          }, 50 * i);
        }
    }
      
      function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, TIME_DELAY * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const element = nodeRefs.current[`${node.row}-${node.col}`];
            // console.log('node:', node, 'element:', element);
            if (element) {
              element.className = 'node node-visited';
            }
          }, TIME_DELAY * i);
        }
      }
      


    const visualizeDijkstra = () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    function handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    function handleMouseEnter(row, col) {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    function handleMouseUp() {
        setMouseIsPressed(false);
    }

    const handleNodeRef = (row, col, ref) => {
        nodeRefs.current[`${row}-${col}`] = ref;
    }


    return (
        <>
            <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
            <div className='grid'>
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { isStart, isFinish } = node;
                                const nodeClass = isStart ? 'node-start' : isFinish ? 'node-finish' : '';
                                // return <Node key={`node-${node.row}-${node.col}`} className={nodeClass}></Node>
                                return <Node
                                    key={`node-${node.row}-${node.col}`}
                                    className={nodeClass}
                                    isStart={node.isStart}
                                    isFinish={node.isFinish}
                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                    onMouseUp={() => handleMouseUp()}
                                    ref={(ref) => handleNodeRef(node.row, node.col, ref)}
                                />
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PathFindingVisualizer;
