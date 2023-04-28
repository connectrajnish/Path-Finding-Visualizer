import React, { useState, useRef, useEffect } from 'react';
import Node from './Node/Node';
import './PathFindingVisualizer.css';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import NavBar from './NavBar/NavBar'

const row = 18;
const col = 50;
var START_NODE_ROW = 10;
var START_NODE_COL = 5;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 40;
var TIME_DELAY = 10;

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
    const [timeDelay, setTimeDelay] = useState(TIME_DELAY);
    const [startNodeRow, setStartNodeRow] = useState(START_NODE_ROW);
    const [startNodeColumn, setStartNodeColumn] = useState(START_NODE_COL);
    const [finishNodeRow, setFinishNodeRow] = useState(FINISH_NODE_ROW);
    const [finishNodeColumn, setFinishNodeColumn] = useState(FINISH_NODE_COL);

    useEffect(() => {
        // const nodes = document.querySelectorAll(".node");
        // nodes.forEach((node) => {
        //     node.classList.remove("start-node", "finish-node", "wall-node", "visited-node", "shortest-path-node");
        //     node.classList.add("default-style");
        // });
        // console.log(grid[startNodeRow][startNodeColumn]);
        setGrid(getInitialGrid());

        // set the style of the start node element
        const startNodeElement = document.getElementById(`node-${startNodeRow}-${startNodeColumn}`);
        if (startNodeElement) {
            startNodeElement.style.background = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE0UlEQVR4nO2YfUwbZRzHnyjGGLniJPtDY4zLEnW2galx6ECJc+weOmEL8+7m3P6wd6Jmk2V/LDHGjGVrBTKjDq5mClMzElxQN8buOjM2eW1BNsgM0cGWTZS9cX1l9Ar0Ws4cUCijtFfTKyXhm3yTJk2efD53v+eeXgFYylKWErOoDw6uVeu5Eo2Ba1TrrXc0euuo2mDlNQauX2PgzmsM3L6cL52rQaJFrR/cotZb/9AYrGK4ri1zdGM078VpvgkzujcuNDd4psz6uFrPnY0ELvWFUvt1zOhx4kaPGChm9NRhla5HFwR+VQn3vMZgvSUHPr3E6sBo/u9g+Jny/Xi5Oz2u8GkGu0Zt4Jxy4DV6zltA812h4T2BckTF6NNxgbe9A1XndHvq0vS3BTkCeYfdLRHgxak7cTUu42TH4fd2AopXthFdGQf+uRsOPueLoSZ58J7AnjiiKLwDg1kSfKA3iPzLr+/vvRkKPvOQ4wJO877oBHj/VprPUEzARqD1wQJSOTz3DvFJe28w/EultmsYzbujgccnx0jI+7H6W0XgnVjOChuO+u8VkGoloGvnXrZTgl9tsA1upt3lGO3Jyq8Ske2HxIfxck8mTvM/SFc4nMCm6vpmlCX9OaeoFTEXsGPoB6HgA7UR6FjZR0cbM0rtufOtgRv5PNzIj4aC31J5qRmylCgVZcii2AsQ8OfwAnDcSa6jIq2D0XzRvfBvHbndibKFvoAAZKlfFBBA/wwnMLT35TqxFtwfaZ3sYjEJN3oGpjfu164r8PSu4SB4ETJUb8wFbDhqnQ/e8X52h2BWVcpdC6P576Y2LQfrPu6fBT8hQLoUEIDekPA71vd4Wx8ZEcyIIQqBzzCaH9H+9HnPHPhJASHmAnYcHZojsHXDjbGGVM5nUYmCWVUldy3cyB/Nr6lpCwk/WZsSAn2z4dFh78nH+iT4SQHkX7ERJMnZA5uOmU6FgRchS15WQuBE0CPT56la2RmAD+quSOu8Wbf/Xci8Nx5BoCbmAjYC3R0QGNanN4WAFwWLalRoR/LnW+PAWaiFJp0nPDylzDngJNCnpJPYVZTZEgp+ZpRUfsGiOuZtS35VbFyeLF5cluI1J79mbVt++G3TtlsR4VnSD03UE0CJuHZnfSO0pnjDCYSq14y4i34t6IsEDyevvgkoFa9FtUYwq8ajgZfuyFcN6zrkwENJoF73ClAyghk5Ho0Acz69STY8Qx0HSkdsTVkmmJEBOfB9LU+2yoWHLHXzjRM7UkE8IrQjuZFGydGW2r3RpBuTBc9Q49BEauMCPy1hRirmgx9pSxkgTNsdsq8+Q1WAeEc0gQd9FuTSnCeOBbm780zB1ShGpwer3fNQ3AUmJDqSnxPMCB90kAkHG2CX7E3LkryWIVeBhYyvXfVhQKD2tzXTb1UyR4cEiRCfRXWyq3ml7MflVGtBouSv359N1bK66/JHh7q2vqEwBSRStExhBspSkR+bDCkoftr+30CG3CfjtP0UJGqyG4uTUIa6EAa++8WLhQ+ARA40kWkoS/lCzL0v57ROAxZDIEvWhBCoBosl6BlKPfH7ZubA8i/4gRVtUIaa/tcBZalmsNiCMmRRQGADS0Z82U/IzRwQWDSbNzjFxcX3oQx1Tqr0edaXS1kKSJj8B1PN2xbr8aR9AAAAAElFTkSuQmCC') center center no-repeat`;
            startNodeElement.style.backgroundSize = "95%";
        }
        const FinishNodeElement = document.getElementById(`node-${finishNodeRow}-${finishNodeColumn}`);
        if (FinishNodeElement) {
            FinishNodeElement.style.background = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFV0lEQVR4nO2YfWgbZRzHzya5JBerblocCJ1TJ8K04LreS61sVsV2G0xk9QVf9s8UBaFTBEUQ9/eGyNT+IQyxMKoOcbrJSulbkpa8kb4kfX/LS5O+pO9pkr7p+pPnaa8md5e0d2m7TvuDD5Rc7rnP9+55fs+lBLFb/9Fyc6qStvyMIKKdU50m7qRycRmlrnzVLXe+ChCufNWyi1OdJ3Z6AUHc1cqpLrg4FSThGyCIDGInVm8RoW1h1T+1cGpIRTOn/s3CEnpiJ5W7gNjTzKpMzSuC68OqrM5c4gFiJ1QTp9vv5NQdTZwGhLS+9hRG6tjKObr9t1XewWmedHLqgBMLJeJ69yj4uzvA39sFrg9eFB3HsJphJ6s5fFvkbZy20M6RMw6OBCHuz16HoN8H09PTmEG/D9q+OCP6noMjwc6SEQdDFm+rvIPRvGVjyUU7iwX+hdNC+8WPIRgMQjgchsXFRQz6G33WXnYef0d0HkP+ZWc1Z7dF3sqQpVaWvGVjSUigwACd5V/D8PAwzM7OwtLS0hp8CHSss6IM7M9mJp7LkmBlyWUro9m6veJqCaGysOR3VlYLQmzH9kLXtXIYGRmBSCSSIB4POoZCdF2vAHthlmgcDENerj9KqDdV/mYRobUw2qsWVgtC7Mezodd4E0KhEMRiMUlxxMLCAgaFGB0dhR5TFdhPHhCNt8rvzlyC2hR5C3vP3kZW29DI6kCIrSQHBppsMD4+DnNzcynF4+FD9DptYH/jsGjcFbQ2c8HdWWnJm2jtATOt62pgdCDEcbYQfN0dMDk5KSkvJT4/P79GNBqFsbEx6OtoA8f7L4nGR5hpXb+RIQ8qkjczhhwTrQuaGT0IcX76Jgx6PTA1NYVl5IjzoNDRaBQ/Pc9APzg/PyO6DobWjTYwVK4s+XpW+4KR0YdNjB4SYClovfgJBAIBLI/klIjHE4vFcAiv1wst334JJs6QeM0VoiaaOrEh+VqaeqeOoZbqGQriMT5zL7jLL8HQ0BDMzMysySsV5+VjsRh+EhMTE+D3+8F1pQyMBXsSro2hqb/rGOq9lPI1tP5cLUMt1zEUxGMs3Aedf/6CWyC/QW2GeCwOFAKtJ/R02/6ogPrnHkxwQKy46UuTB2Co2lrGAPGYThyEbnM17vFog9oK8WgcaGqiEO11lWA8/liCC4amqpMGqM7VZdfQBn8NbQCE+fTT0Oe04h6PWt9mikvJRyIRDB+iy2EB06tHsAsmzzBUfUT7SMppVJlnOFRFG/yW0lfA092J5dHgSsQ3etcjq+II9JQR6CUQrbdudys0fngKqvIMPuRGbLR8Ph9eWOiCqcTTmS4RCXEEWmcIPkRPTw8QcovfoLZinq8nHg6HcadDoOmEQsgOgASlxIPnCsFTnLkhAh89LxJ/2zoDOZWTcOjGBDxxbQwe/zUEj/48Ag9fGYaXb4ysiSP43xMohKIAUnd8o/I8wjueTD77xyA8dHkwQZyXTztA/BSRG0A4VVLJ7/veLxJPK4DUHJcbQDjHU8lnlXlF8mgtImQHSLY4lQSIX5yp5O+/5BGJI1A3VBxA2FHkBhB2lVTy933VLxLnkR0gWTtUEiC+s6SSz7zQJxJHb6qItALEt0K5AYQt8dT14aTyx34YEIkj0A8fRQGkNiC5AaRaotQcn0giziM7QLKdU0mAdMRDoRBGcQDhti83QLrioVAI/wNAdoBk7ytyA6QjHlqVVxxA6kVLSYB0xEeVBkj2hig3wHriYxLTRQrZAWxtHpBCboBk48iF+N8FsLZ5AjslgNXtGZQfwOUtlgqx3QGsbs+gpd1bJDvAbu3WbhF3RP0D6HwWFIC/P2oAAAAASUVORK5CYII=') center center no-repeat`;
            FinishNodeElement.style.backgroundSize = "95%";
        }
    }, [startNodeRow, startNodeColumn, finishNodeRow, finishNodeColumn]);


    const getInitialGrid = () => {
        const initialGrid = new Array(row).fill(null).map((_, r) => {
            return new Array(col).fill(null).map((_, c) => {
                return createNode(c, r);
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
                // console.log('node:', node, 'element:', element);
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
        // console.log("grid", grid);
        // console.log("row", row);
        // console.log("col", col);
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
            <div className='navbar-container'>
                <NavBar>
                    <button className='visualizer-button' onClick={visualizeDijkstra}>
                        Visualize Dijkstra's Algorithm
                    </button>
                    <a href='/'>
                        <button className='reset-button'>
                            Reset
                        </button>

                    </a>
                </NavBar>
            </div>
            <div className="data-container">
                <input
                    type="number"
                    className="time-delay-input"
                    placeholder={`Animation Speed: ${timeDelay}`}
                    onChange={(e) => {
                        const value = e.target.value < 0 ? 0 : e.target.value;
                        e.target.value = value;
                        setTimeDelay(value);
                        TIME_DELAY = value;
                    }}
                />

                <input
                    type="number"
                    className="starting-row-input"
                    placeholder={`Starting Row: ${startNodeRow}`}

                    onChange={(e) => {
                        const inputValue = parseInt(e.target.value);
                        let newStartNodeRow;
                        if (isNaN(inputValue) || inputValue === '') {
                            newStartNodeRow = 0;
                        } else if (inputValue < 0) {
                            newStartNodeRow = 0;
                        } else if (inputValue >= row) {
                            newStartNodeRow = row - 1;
                        } else {
                            newStartNodeRow = inputValue;
                        }
                        e.target.value = newStartNodeRow;
                        const startNodeElement = document.getElementById(`node-${startNodeRow}-${startNodeColumn}`);
                        if (startNodeElement) {
                            // Remove the background image
                            startNodeElement.style.backgroundImage = 'none';
                        }
                        grid[START_NODE_ROW][startNodeColumn].isStart = false;
                        // console.log('1st',grid[START_NODE_ROW][startNodeColumn]);
                        setStartNodeRow(newStartNodeRow);
                        START_NODE_ROW = newStartNodeRow;
                        grid[START_NODE_ROW][startNodeColumn].isStart = true;
                    }}
                />
                <input
                    type="number"
                    className="starting-column-input"
                    placeholder={`Starting Column: ${startNodeColumn}`}
                    onChange={(e) => {
                        const inputValue = parseInt(e.target.value);
                        let newStartNodeColumn;
                        if (isNaN(inputValue) || inputValue === '') {
                            newStartNodeColumn = 0;
                        } else if (inputValue < 0) {
                            newStartNodeColumn = 0;
                        } else if (inputValue >= col) {
                            newStartNodeColumn = col - 1;
                        } else {
                            newStartNodeColumn = inputValue;
                        }
                        e.target.value = newStartNodeColumn;
                        const startNodeElement = document.getElementById(`node-${startNodeRow}-${startNodeColumn}`);
                        if (startNodeElement) {
                            // Remove the background image
                            startNodeElement.style.backgroundImage = 'none';
                        }
                        grid[startNodeRow][START_NODE_COL].isStart = false;
                        // console.log('1st',grid[startNodeRow][START_NODE_COLUMN]);
                        setStartNodeColumn(newStartNodeColumn);
                        START_NODE_COL = newStartNodeColumn;
                        grid[startNodeRow][START_NODE_COL].isStart = true;
                    }}
                />


                <input
                    type="number"
                    className="finish-row-input"
                    placeholder={`Target Row: ${finishNodeRow}`}
                    onChange={(e) => {
                        const inputValue = parseInt(e.target.value);
                        let newFinishNodeRow;
                        if (isNaN(inputValue) || inputValue === '') {
                            newFinishNodeRow = 0;
                        } else if (inputValue < 0) {
                            newFinishNodeRow = 0;
                        } else if (inputValue >= row) {
                            newFinishNodeRow = row - 1;
                        } else {
                            newFinishNodeRow = inputValue;
                        }
                        e.target.value = newFinishNodeRow;
                        const finishNodeElement = document.getElementById(`node-${finishNodeRow}-${finishNodeColumn}`);
                        if (finishNodeElement) {
                            finishNodeElement.style.backgroundImage = 'none';
                        }
                        grid[FINISH_NODE_ROW][finishNodeColumn].isFinish = false;
                        setFinishNodeRow(newFinishNodeRow);
                        FINISH_NODE_ROW = newFinishNodeRow;
                        grid[FINISH_NODE_ROW][finishNodeColumn].isFinish = true;
                    }}
                />

                <input
                    type="number"
                    className="finish-column-input"
                    placeholder={`Target Column: ${finishNodeColumn}`}
                    onChange={(e) => {
                        const inputValue = parseInt(e.target.value);
                        let newFinishNodeColumn;
                        if (isNaN(inputValue) || inputValue === '') {
                            newFinishNodeColumn = 0;
                        } else if (inputValue < 0) {
                            newFinishNodeColumn = 0;
                        } else if (inputValue >= col) {
                            newFinishNodeColumn = col - 1;
                        } else {
                            newFinishNodeColumn = inputValue;
                        }
                        e.target.value = newFinishNodeColumn;
                        const finishNodeElement = document.getElementById(`node-${finishNodeRow}-${finishNodeColumn}`);
                        if (finishNodeElement) {
                            // Remove the background image
                            finishNodeElement.style.backgroundImage = 'none';
                        }
                        grid[finishNodeRow][FINISH_NODE_COL].isFinish = false;
                        setFinishNodeColumn(newFinishNodeColumn);
                        FINISH_NODE_COL = newFinishNodeColumn;
                        grid[finishNodeRow][FINISH_NODE_COL].isFinish = true;
                    }}
                />


            </div>
            <div className='grid'>
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { row, col, isFinish, isStart, isWall } = node;
                                // console.log(node);
                                const nodeClass = isStart ? 'node-start' : isFinish ? 'node-finish' : '';
                                return <Node
                                    key={`node-${node.row}-${node.col}`}
                                    col={col}
                                    row={row}
                                    className={nodeClass}
                                    isStart={node.isStart}
                                    isFinish={node.isFinish}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                    onMouseUp={() => handleMouseUp()}
                                    ref={(ref) => handleNodeRef(row, col, ref)}
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
