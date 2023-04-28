import React from 'react';
// import SimpleAccordion from './SimpleAccordion';

const About = () => {
    return (
        <>
            <div className='navbar temp' style={{ padding: '10px' }}>
                <a href='/' style={{ textDecoration: 'none', color: 'black' }}>Home</a>
            </div>

            <div className='about'>
                <h3>Dijkstra's Algorithm</h3>
                <p style={{ textAlign: 'justify' }}>
                    <p>
                        The Dijkstra's algorithm is a widely used algorithm in computer science that is used to find the shortest path between two nodes in a weighted graph. It was invented by Edsger W. Dijkstra in 1956 and is one of the most popular algorithms for solving the single-source shortest path problem.
                    </p>
                    <p>
                        The algorithm starts with a source node and assigns a tentative distance to all other nodes in the graph. It then repeatedly selects the node with the smallest tentative distance and updates the tentative distances of its neighbors until all nodes have been visited.
                    </p>
                    <p>
                        The steps of the Dijkstra's algorithm are as follows:
                    </p>
                    <p>

                        <li>
                            Assign a tentative distance value to every node: set it to zero for the source node and infinity for all other nodes.
                        </li>
                        <li>
                            Set the source node as the current node and mark it as visited.
                        </li>

                        <li>
                            For each neighbor of the current node, calculate the distance from the source node to that neighbor through the current node. If this distance is less than the current tentative distance of the neighbor, update the tentative distance.
                        </li>

                        <li>
                            When all neighbors of the current node have been visited, select the unvisited node with the smallest tentative distance and make it the new current node.
                        </li>

                        <li>
                            Repeat steps 3-4 until the destination node has been visited or there are no more unvisited nodes.
                        </li>

                        <li>
                            Once the destination node has been visited, the shortest path can be calculated by tracing back from the destination node to the source node using the updated tentative distances.
                        </li>
                    </p>
                    <p>
                        The Dijkstra's algorithm guarantees that it will find the shortest path between the source node and any other node in the graph, as long as the graph has no negative-weighted edges. If the graph does have negative-weighted edges, the Bellman-Ford algorithm should be used instead.
                    </p>
                    <p>
                        <b>Time Complexity:</b> O(V<sup>2</sup>)
                        <br />
                        <b>Auxiliary Space:</b> O(V)
                    </p>
                </p>
            </div>
        </>
    )
}

export default About;