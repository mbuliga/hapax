

/* 
===============================================================================
Physics
===============================================================================
*/

/* list of physics names
*/


var PHYSICS = ["none", "random"];


/* 
===============================================================================
 initial vector in dimension dim
===============================================================================
*/



function zeroVector(dim) {

var k, output = [];
for (k=0; k < dim; k++) { 
  output.push(0);
}

return output;
}


/* 
===============================================================================
 initial random vector q in dimension dim, in universe BOXSIZE
===============================================================================
*/



function randomVector(dim,boxsize) {

var k, output = [];
for (k=0; k < dim; k++) { 
  output.push(Math.round(boxsize* Math.random()));
}

return output;
}



/* 
===============================================================================
 physics updates phyState
===============================================================================
*/

function physics(phy, phyState) {

var k, j, l, a=[];

switch (phy) {

  case "random":
  for (k=0; k < phyState.nodelength; k++) { 
// random vector for p
    for (j=0; j < DIMENSION; j++) {
      for (l=0; l < state.node[k].ports.length; l++) {
        if (state.edge[state.node[k].ports[l]].s.node == k) {
          phyState.node[k].p[j] += ELASTICA * (phyState.node[state.edge[state.node[k].ports[l]].t.node].q[j] - phyState.node[k].q[j]);
        } else {
          phyState.node[k].p[j] += ELASTICA * (phyState.node[state.edge[state.node[k].ports[l]].s.node].q[j] - phyState.node[k].q[j]);
        }
    
      }
      phyState.node[k].p[j] += (Math.round(2*BOXSPEED * Math.random())) - BOXSPEED;
      phyState.node[k].q[j] = Math.abs(Math.round(phyState.node[k].q[j] + phyState.node[k].p[j] +  BOXSIZE) % (2*BOXSIZE)) - BOXSIZE;
    }
    
  }
  break;

  case "none":
  for (k=0; k < phyState.nodelength; k++) { 
// random vector for p
    for (j=0; j < DIMENSION; j++) {
      phyState.node[k].p[j] = 0;
      phyState.node[k].q[j] = 0;
    }
    
  }
  break;

}

}



/* 
===============================================================================
 near(edge1,edge2)
===============================================================================
*/



function near(edge1, edge2, phyState, state, param) {

var k, output = 0;

if (edge1 == edge2) {
  return output;
} else {
//  var a = edgeNodes(edge1,state);
  var as = phyState.node[state.edge[edge1].s.node].q;
  var at = phyState.node[state.edge[edge1].t.node].q;
//  var b = edgeNodes(edge2,state);
  var bs = phyState.node[state.edge[edge2].s.node].q;
  var bt = phyState.node[state.edge[edge2].t.node].q;
  
  var crit = 0;
  
  for (k=0; k < DIMENSION; k++) {
    var med = (as[k] + at[k] + bs[k] + bt[k]) / 4;
    crit += ((as[k] - med) * (as[k] - med));
    crit += ((at[k] - med) * (at[k] - med));
    crit += ((bs[k] - med) * (bs[k] - med));
    crit += ((bt[k] - med) * (bt[k] - med));
  }
  
  var paramm = (param * BOXSIZE) * (param * BOXSIZE) *16;

  
  if (crit <= paramm) {
    var output = 1;
  }

  return output;
}

}











