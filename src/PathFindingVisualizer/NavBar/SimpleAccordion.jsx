// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Paper from '@mui/material/Paper';
// import SvgIcon from '@mui/material/SvgIcon';

// export default function SimpleAccordion() {
//   return (
//     <div>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography>Dijkstra Algorithm Working</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             <p style={{ textAlign: 'justify' }}>
//                 <p>
//                     The Dijkstra algorithm is a widely used algorithm in computer science that is used to find the shortest path between two nodes in a weighted graph. It was invented by Edsger W. Dijkstra in 1956 and is one of the most popular algorithms for solving the single-source shortest path problem.
//                 </p>
//                 <p>
//                     The algorithm starts with a source node and assigns a tentative distance to all other nodes in the graph. It then repeatedly selects the node with the smallest tentative distance and updates the tentative distances of its neighbors until all nodes have been visited.
//                 </p>
//                 <p>
//                     The steps of the Dijkstra algorithm are as follows:
//                 </p>
//                 <p>

//                     <li>
//                         Assign a tentative distance value to every node: set it to zero for the source node and infinity for all other nodes.
//                     </li>
//                     <li>
//                         Set the source node as the current node and mark it as visited.
//                     </li>

//                     <li>
//                         For each neighbor of the current node, calculate the distance from the source node to that neighbor through the current node. If this distance is less than the current tentative distance of the neighbor, update the tentative distance.
//                     </li>

//                     <li>
//                         When all neighbors of the current node have been visited, select the unvisited node with the smallest tentative distance and make it the new current node.
//                     </li>

//                     <li>
//                         Repeat steps 3-4 until the destination node has been visited or there are no more unvisited nodes.
//                     </li>

//                     <li>
//                         Once the destination node has been visited, the shortest path can be calculated by tracing back from the destination node to the source node using the updated tentative distances.
//                     </li>
//                 </p>
//                 <p>
//                     The Dijkstra algorithm guarantees that it will find the shortest path between the source node and any other node in the graph, as long as the graph has no negative-weighted edges. If the graph does have negative-weighted edges, the Bellman-Ford algorithm should be used instead.
//                 </p>
//                 <p>
//                     Time Complexity: O(V2)
//                     <br />
//                     Auxiliary Space: O(V)
//                 </p>
//             </p>
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2a-content"
//           id="panel2a-header"
//         >
//           <Typography>Accordion 2</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion disabled>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3a-content"
//           id="panel3a-header"
//         >
//           <Typography>Disabled Accordion</Typography>
//         </AccordionSummary>
//       </Accordion>
//     </div>
//   );
// }
