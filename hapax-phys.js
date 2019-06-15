

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
          phyState.node[k].p[j] += ELASTICA * (phyState.node[k].q[j] - phyState.node[state.edge[state.node[k].ports[l]].t.node].q[j]);
        } else {
          phyState.node[k].p[j] += ELASTICA * (phyState.node[k].q[j] - phyState.node[state.edge[state.node[k].ports[l]].s.node].q[j]);
        }
    
      }
      phyState.node[k].p[j] += (Math.round(2*BOXSPEED * Math.random())) - BOXSPEED;
      phyState.node[k].q[j] = Math.abs(((phyState.node[k].q[j] + phyState.node[k].p[j] + BOXSIZE) % (2 *BOXSIZE)) - BOXSIZE);
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
  var a = edgeNodes(edge1,state);
  var as = phyState.node[a.sn].q;
  var at = phyState.node[a.tn].q;
  var b = edgeNodes(edge2,state);
  var bs = phyState.node[b.sn].q;
  var bt = phyState.node[b.tn].q;
  
  var valmax = [0,0,0,0];
  
  for (k=0; k < DIMENSION; k++) {
    var med = (as[k] + at[k] + bs[k] + bt[k]) / 4;
    valmax[0] += ((as[k] - med) * (as[k] - med));
    valmax[1] += ((at[k] - med) * (at[k] - med));
    valmax[2] += ((bs[k] - med) * (bs[k] - med));
    valmax[3] += ((bt[k] - med) * (bt[k] - med));
  }
  
  var paramm = (param * BOXSIZE) * (param * BOXSIZE);
  var crit = Math.max(valmax[0], valmax[1], valmax[2], valmax[3]);
  
  if (crit <= paramm) {
    var output = 1;
  }

  return output;
}

}











