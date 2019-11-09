/* 
 nodes related functions
*/

/* Nodes do not depend on chemistries!!


/* 
===============================================================================
 Nodes definition
===============================================================================
*/

/* Defines node types. 
   node is a node type
*/


function node_of_type(node) {

  switch (node) {

    case "A": 
      return ["in", "in", "out"];
      break;

    case "FI":
      return ["in", "in", "out"];
      break;
 
    case "L":
      return ["in", "out", "out"];
      break; 

    case "FO":
      return ["in", "out", "out"];
      break; 

    case "FOE":
      return ["in", "out", "out"];
      break; 

    case "Arrow":
      return ["in", "out"];
      break; 

    case "FRIN":
      return ["out"];
      break; 

    case "FROUT":
      return ["in"];
      break; 

    case "T":
      return ["in"];
      break; 

    default:
      return [];
      break;
  }


}
