/* 
 specific functions
*/

/* 
===============================================================================
 constructors
===============================================================================
*/

// a pattern is a triple: named, edge and molrel; edge is an edge tag from molrel

function Pattern(named,edge,mol) {
  this.named = named;
  this.edge = edge;
  this.mol = mol;

}


// a token is a pair: pattern (what kind of money?) and ident(series) 

function Token(pattern, ident) {
  this.ident = ident;
  this.pattern = pattern;
}




// mol node constructor

function MolNode(id,type,ports) {
  this.id = id;
  this.type = type;
  this.ports = ports;

}




// mol file constructor

function Mol(id) {
  var a = copyPattern(id);
  this.named = id;
  this.mol = a.mol;

}




// mol abs constructor

function MolAbs(mol,tag) {
  this.mol = mol;
  this.tag = tag;

}


// state constructor


function State(node,edge,nodelength,edgelength) {
  this.node = node;
  this.edge = edge;
  this.nodelength = nodelength;
  this.edgelength = edgelength;

}





/* 
===============================================================================
 Copy a  pattern fromMolLibrary based on .named
===============================================================================
*/



function copyPattern(molname) {

var k, mol, a, output;

for (k=0; k < fromMolLibrary.length; k++) {
  if (molname == fromMolLibrary[k].named) {
  mol = fromMolLibrary[k].mol;
  a = fromMolLibrary[k].edge;
  break;
  }
}
  output = new Pattern(molname,a,mol);
  return output;

}




/* 
===============================================================================
 returns an empty mol rel
===============================================================================
*/

function emptyMolRel() {

return [];
}

/* 
===============================================================================
 returns an empty mol abs
===============================================================================
*/

function emptyMolAbs() {

var output = new MolAbs([],[]);

return output;
}

/* 
===============================================================================
 returns an empty state
===============================================================================
*/

function emptyState() {

var output = new State([],[],0,0);  

return output;
}




/* 
===============================================================================
 turns a state into a mol abs
===============================================================================
*/

/* 
turns a state into a mol abs, i.e. an object {mol:molabsolute, tag:edgetag} where: 
- molabsolute is in "absolute state", that is one which has the edges
  renamed with numbers from 0 to state.edge.length -1, 
  and ports renamed with edges' new names,
- edgetag is the vector which keeps edges new names
*/

function stateToMolAbs(object) {

var output = {mol:[],tag:[]};

var i, k, acur;


if (object.node.length == 0 || object.edge.length == 0) { 
  return output;
} else {

  for (k=0; k < object.node.length; k++) {
    acur = [object.node[k].type]; 
    for (i=0; i < object.node[k].ports.length; i++) {
      acur.push(object.node[k].ports[i]);
    }
    output.mol.push(acur);
  }

  for (k=0; k < object.edge.length; k++) {
    output.tag.push(object.edge[k].tag);
  }

  return output;

}

}



/* 
===============================================================================
 turns a state into a mol rel
===============================================================================
*/

function stateToMolRel(object) {

var output = molAbsToRel(stateToMolAbs(object));

return output;

}


/* 
===============================================================================
 turns a mol rel into a mol abs
===============================================================================
*/


function molRelToAbs (object) {

var output = stateToMolAbs(molRelToState(object));

return output;

}


/* 
===============================================================================
 turns a mol rel into a state, TO DO: error management
===============================================================================
*/

function molRelToState(molf) {


// var molSanitized = sanitizeMol(molf,"clean");

var i, j, l, p, a, b, cnode, cport, cid, output, n, k, p, q, init, running;
var edgeCount = [],  m = 0,  edgecount = 0, edgeName = [];
var nsRaw = molToList(molf);

if (nsRaw.length == 0) {
 output = emptyState();
 return output;
} else {

// produces edgeRaw, a list of ports

  var edgeRaw = listOfPorts(nsRaw).ports;

  if (edgeRaw.length == 0) {
    output = emptyState();
    return output;
  } else {

/* renames the ports and keeps edgeName[newname] = oldname. 
 edgeCount is a list which counts how many times each port appears. 
*/



  if (edgeRaw.length > 1) {
    while (m < edgeRaw.length) {
      k = 0; 
      n = m;
      init = edgeRaw[m].id;
      running = edgeRaw[n].id;
      edgeName.push(init);
      while (init == running) {
        p = edgeRaw[n].node;
        q = edgeRaw[n].port;
        nsRaw[p].ports[q] = edgecount;
        edgeRaw[n].id = edgecount;
        n++;
        k++;
        if (n < edgeRaw.length) {running = edgeRaw[n].id;} else {break;}
      }
    edgeCount.push({ edge:m , newname:edgecount, count:k});
    m = n;
    edgecount++;
    }
  }


/* add FRIN or FROUT nodes if needed, 
   or print an error if the count is > 2 for ports, 
   or if a port appears twice in a "in" or "out" position.
   Define ss and ts.
*/

  var erro=0, erro2=0, text="", text2="ports in wrong places: <br>";
  var newnode = nsRaw.length, newport = edgeRaw.length;
  var ss = [], ts = [];

  for (k=0; k < edgeCount.length; k++) {
    i = edgeCount[k].edge;
    j = edgeCount[k].count;
    switch (j) {
      
      default: 
      erro++; 
      text = text + "port " + edgeRaw[i].id + " appears too many times: ";
      for (l=0; l < j; l++) { 
      p = i + l;
      text = text + "node: " + edgeRaw[p].node + " port: " + edgeRaw[p].port + " , ";
      }
      text = text + "<br>";
      break;
      
      case 2:
      a = edgeRaw[i].type;
      b = edgeRaw[i+1].type;
      if (a == b) {
        erro2++;
        text2 = text2 + edgeRaw[i].id + " in two ports " + a + "<br>";  
      } else {
        if (a == "in") {
          cnode = edgeRaw[i].node;
          cport = edgeRaw[i].port;
          cid = edgeRaw[i].id;
          ts[cid] = { id:cid, node:cnode, port:cport};
          cnode = edgeRaw[i+1].node;
          cport = edgeRaw[i+1].port;
          cid = edgeRaw[i+1].id;
          ss[cid] = { id:cid, node:cnode, port:cport};
        } else {
          cnode = edgeRaw[i+1].node;
          cport = edgeRaw[i+1].port;
          cid = edgeRaw[i+1].id;
          ts[cid] = { id:cid, node:cnode, port:cport};
          cnode = edgeRaw[i].node;
          cport = edgeRaw[i].port;
          cid = edgeRaw[i].id;
          ss[cid] = { id:cid, node:cnode, port:cport};
        }
      }
      break;
      
      case 1:
      a = edgeRaw[i].type;
      switch(a) {
        
        case "in":
        nsRaw.push({id:newnode, type:"FRIN", ports:[edgeCount[k].newname] });
        edgeRaw.push({id:edgeRaw[i].id, node:newnode, port:0, type:"out"});
        cnode = edgeRaw[i].node;
        cport = edgeRaw[i].port;
        cid = edgeRaw[i].id;
        ts[cid] = { id:cid, node:cnode, port:cport};
        cnode = newnode;
        cport = 0;
        cid = edgeRaw[i].id;
        ss[cid] = { id:cid, node:cnode, port:cport};
        newnode++;
        break;
        
        case "out":
        nsRaw.push({id:newnode, type:"FROUT", ports:[edgeCount[k].newname] });
        edgeRaw.push({id:edgeRaw[i].id, node:newnode, port:0, type:"in"});
        cnode = edgeRaw[i].node;
        cport = edgeRaw[i].port;
        cid = edgeRaw[i].id;
        ss[cid] = { id:cid, node:cnode, port:cport};
        cnode = newnode;
        cport = 0;
        cid = edgeRaw[i].id;
        ts[cid] = { id:cid, node:cnode, port:cport};
        newnode++;
        break;
      }
      break; 
    }
  }



/* at this point you need only: (the "no" is the "absolute" of everything)
   
  - k the no of node, nsRaw[k].id = k, nsRaw[k].type = "A", ..., nsRaw[k].ports = [no of edge for port 0, ... ]
  - k the no of edge, ss[k].id = k, ss[k].node = no of node, ss[k].port = no of port (i.e. 1, or 2)
  - k the no of edge, ts[k].id = k, ts[k].node = no of node, ts[k].port = no of port (i.e. 0, or 1)
  - k the no of edge, edgeName[k] = original name of the edge in the input mol file

This defines the output. 

*/

  var edge=[];
  for (k=0; k < ss.length; k++) {
    edge.push({id:ss[k].id, s:{node:ss[k].node, port:ss[k].port}, t:{node:ts[k].node, port:ts[k].port}, tag:edgeName[k]});
  }

  output = {node:nsRaw, edge:edge, nodelength:nsRaw.length, edgelength:edge.length};

  return output;

  }

}

}


/* 
===============================================================================
 turns a mol abs into a state
===============================================================================
*/

function molAbsToState(object) {


var ndcr = [], src = [], trg = [];
var  k, i, j, elmtype, comparPorts;

var output = {node:[], edge:edg, nodelength:0, edgelength:0};

if (object.mol.length == 0 || object.tag.length == 0) {
  output = emptyState(); return output;
} else {
  for (j=0; j < object.mol.length; j++) {
    ndcr = [].concat(object.mol[j]); 
    elmtype =  ndcr.shift();
    output.node.push({ id:j , type:elmtype, ports:ndcr });
    comparPorts = node_of_type(elmtype);
    for (i=0; i < ndcr.length; i++) {
      k = ndcr[i];
      if (comparPorts[i] == "in") {
        trg[k] = {nd:j, prt:i}; 
      } else { 
        src[k] = {nd:j, prt:i};
      }
    }
     
  }

  for (k=0; k < src.length; k++) {
    output.edge.push({id:k, s:{node:src[k].nd, port:src[k].prt}, t:{node:trg[k].nd, port:trg[k].prt}, tag:object.tag[k]});
  }

  output.nodelength = output.node.length;
  output.edgelength = output.edge.length;

  return output;

}

}


/* 
===============================================================================
 turns a mol abs into mol rel
===============================================================================
*/

function molAbsToRel(object) {

var k, i, j, ndcr, elmtype, tempo;
var output = [];


if (object.mol.length == 0 || object.tag.length == 0) {
  output = emptyMolRel(); 
} else {
  for (j=0; j < object.mol.length; j++) {
    ndcr = [].concat(object.mol[j]); 
    elmtype =  ndcr.shift();
    tempo = [elmtype];
    for (i=0; i < ndcr.length; i++) {
      tempo.push(object.tag[ndcr[i]]);
    }
  output.push(tempo);     
  } 
}
return output;
}

/* 
===============================================================================
 adds state2 to state1 
===============================================================================
*/

/* 
!! MODIFIES STATE !! state1 is modified!
*/


function addState(state1, state2) {

var k, i, aid, aport, aports2, asnode, atnode;


if (state1.nodelength == 0) { 
  if (state2.nodelength == 0) {
  } else {
    state1 = clone(state2);
  } 
} else { 
  if (state2.nodelength == 0) {
  } else {
    for (k=0; k < state2.nodelength; k++) {
      aid = state1.nodelength + k;
      aports2 = [];
      for (i=0; i < state2.node[k].ports.length; i++) { 
        aport = state2.node[k].ports[i] + 0 + state1.edgelength;
        aports2.push(aport);
      }
      state1.node.push({id:aid, type:state2.node[k].type, ports:aports2});
    }
    for (k=0; k < state2.edgelength; k++) {
      aid =  state1.edgelength + 0 + state2.edge[k].id;
      asnode = state2.edge[k].s.node + state1.nodelength;
      atnode = state2.edge[k].t.node + state1.nodelength;
      state1.edge.push({id:aid, s:{node:asnode, port:state2.edge[k].s.port}, t:{node:atnode, port:state2.edge[k].t.port}, tag:state2.edge[k].tag});
    }
    state1.nodelength = state1.nodelength + state2.nodelength;
    state1.edgelength = state1.edgelength + state2.edgelength;
  }
}


}



/* 
===============================================================================
 returns the identity permutation for a state
===============================================================================
*/


function idPermState(num) {

var output = [], k;
for (k=0; k < num; k++) {
output.push({i:k , o:k});
}


return output;

}


/* 
===============================================================================
 returns a mixed state, i.e. a state whose edges are modified
===============================================================================
*/

/* 
!! MODIFIES STATE !! 
*/

/* sourceP and targetP are permutations of the edges. 
   Only the non-identity permutations appear, in the sense that:
     - if we want to permute 3 sources and 5 targets, it is not worthy 
       to pass by all sources and all targets
     - instead, sourceP will be an array of 3 objects sourceP[k] = {i: before o:after}, 
       which says that
       source of the edge sourceP[k].i moves to the source of the edge sourceP[k].o
       
*/

function activeState(state, sourceP, targetP) {

var k,  nodesO;

if (sourceP.length > 0) {

  var changeS = [];

  for (k=0; k < sourceP.length; k++) {
    nodesO = edgeNodes(sourceP[k].i,state);
    changeS.push({node:nodesO.sn , port:nodesO.sp , edge:sourceP[k].o});
  }

  for (k=0; k < sourceP.length; k++) {
    state.node[changeS[k].node].ports[changeS[k].port] = changeS[k].edge;
    state.edge[changeS[k].edge].s.node = changeS[k].node;
    state.edge[changeS[k].edge].s.port = changeS[k].port; 
  }
}



if (targetP.length > 0) {

  var changeT = [];

  for (k=0; k < targetP.length; k++) {
    nodesO = edgeNodes(targetP[k].i,state);
    changeT.push({node:nodesO.tn , port:nodesO.tp , edge:targetP[k].o});
  }

  for (k=0; k < targetP.length; k++) {
    state.node[changeT[k].node].ports[changeT[k].port] = changeT[k].edge;
    state.edge[changeT[k].edge].t.node = changeT[k].node;
    state.edge[changeT[k].edge].t.port = changeT[k].port; 
  }

}


}



/* 
===============================================================================
hybridize state1 with state2 
by permuting a source from 
state1 with a source from state2
===============================================================================
*/

/* 
!! MODIFIES STATE !! 
*/

function hybS(state1, a, state2, b) {

var moveit = state1.edgelength;

addState(state1,state2);

var sourceP = [];
moveit = moveit + 0 + b;

sourceP.push({i:a , o:moveit});
sourceP.push({i:moveit , o:a});

activeState(state1, sourceP, []);


}




/* 
===============================================================================
hybridize state1 with state2 
by permuting a target from 
state1 with a target from state2
===============================================================================
*/

/* 
!! MODIFIES STATE !! 
*/

function hybT(state1, a, state2, b) {

var moveit = state1.edgelength;

addState(state1,state2);

var targetP = [];
moveit = moveit + 0 + b;

targetP.push({i:a , o:moveit});
targetP.push({i:moveit , o:a});

activeState(state1, [], targetP);


}


/* 
===============================================================================
 given a state and an edge, returns the pair of nodes source, target
===============================================================================
*/


function  edgeNodes(edge,state) {

//var moL = stateToMolAbs(state);
//var mol = moL.mol;

var k;
var mols = [state.node[state.edge[edge].s.node].type];
for (k=0; k < state.node[state.edge[edge].s.node].ports.length; k++) {
mols.push(state.node[state.edge[edge].s.node].ports[k]);
}
var molt = [state.node[state.edge[edge].t.node].type];
for (k=0; k < state.node[state.edge[edge].t.node].ports.length; k++) {
molt.push(state.node[state.edge[edge].t.node].ports[k]);
}

var output = {s:mols, st:state.node[state.edge[edge].s.node].type, sn:state.edge[edge].s.node, sp:state.edge[edge].s.port, t:molt, tt:state.node[state.edge[edge].t.node].type, tn:state.edge[edge].t.node, tp:state.edge[edge].t.port};

return output;




}

/* 
===============================================================================
 given an edge tag and a state, returns the edge
===============================================================================
*/

function tagToEdge(tag,state) {

var output = NaN, k

for (k=0; k < state.edgelength; k++) {
if (tag == state.edge[k].tag) {
  output = k;
  break;
}
}

return output;

}


/* 
===============================================================================
 given a pattern with state pat, an edge and a state, gives a match
===============================================================================
*/

/* The function returns 
   an object
     .named (name of the pattern) 
     .id (which is 1 or 0) 
     .mol (the mol rel of the pattern)
     .sources 
     .targets 
      which are vectors,
     .iso which is object
      .nodes  correspondence of nodes vector[node number in pattern] = node number in state
      .edges  correspondence of edges vector[edge number in pattern] = edge number in state
      .tag    correspondence of edges tags vector[edge number in pattern] = tag in pattern
 - pat is a pattern
 - edge is the edge no
 - state is a state
 
*/


function  explore(pat, edge, state, freeNode) {

var edgeRel = pat.edge;
var molRel = pat.mol;
var named = pat.named;
var stateRel = pat.state;


if (molRel.length > 0) {

var k, l, m, edgeRelAbs;
var bui;

//stateRel = molRelToState(molRel);

var success = 1;

var piSource = [];
var piTarget = [];


var unvisited = [];


var edgeCor = [];
var nodeCor = [];
var tagCor = [];

for (k=0; k < stateRel.nodelength; k++) {
  nodeCor.push("");
}

var nodeUnvis = [];
for (k=0; k < state.nodelength; k++) {
  bui = [];
  nodeUnvis.push({ports:[]});
  for (l=0; l < state.node[k].ports.length; l++) {

    bui.push(freeNode[k].ports[l]); 
  }
  nodeUnvis[k].ports = bui;
}


for (k=0; k < stateRel.edgelength; k++) {
  unvisited.push(1);
  edgeCor.push("");
  tagCor.push(stateRel.edge[k].tag);
}


/* transform the added FRIN and FROUT into IN and OUT, 



if (stateRel.nodelength > molRel.length) {
  for (k=molRel.length; k < stateRel.nodelength; k++) {
    if (stateRel.node[k].type == "FRIN") {
      stateRel.node[k].type = "IN";
    } else {
      stateRel.node[k].type = "OUT";
    }
  }
}
*/



function parkour(erel,e) {

 if (success) {
  
  var eRelNodes = edgeNodes(erel,stateRel);
  var eNodes = edgeNodes(e,state);
  
  
  if (eRelNodes.st == eNodes.st && eRelNodes.sp == eNodes.sp && eRelNodes.tt == eNodes.tt && eRelNodes.tp == eNodes.tp) {
//    m = nodeUnvis[eNodes.sn].ports[eNodes.sp] * nodeUnvis[eNodes.tn].ports[eNodes.tp];
    if (nodeUnvis[eNodes.sn].ports[eNodes.sp] * nodeUnvis[eNodes.tn].ports[eNodes.tp]) {
      piSource.push(e);
      piTarget.push(e);
      edgeCor[erel] = e;
      unvisited[erel] = 0;
      nodeUnvis[eNodes.sn].ports[eNodes.sp] = 0;
      nodeUnvis[eNodes.tn].ports[eNodes.tp] = 0;
      
      for (k=0; k < stateRel.node[eRelNodes.sn].ports.length; k++) {
//        var erel2 = stateRel.node[eRelNodes.sn].ports[k];
//        var e2 = state.node[eNodes.sn].ports[k];
        if (unvisited[stateRel.node[eRelNodes.sn].ports[k]]) {
          parkour(stateRel.node[eRelNodes.sn].ports[k], state.node[eNodes.sn].ports[k]); 
        } else {
          if (edgeCor[stateRel.node[eRelNodes.sn].ports[k]] != state.node[eNodes.sn].ports[k]) {
            success = 0;
          }
        }                   
      }
      for (k=0; k < stateRel.node[eRelNodes.tn].ports.length; k++) {
//        var erel2 = stateRel.node[eRelNodes.tn].ports[k];
//        var e2 = state.node[eNodes.tn].ports[k];
        if (unvisited[stateRel.node[eRelNodes.tn].ports[k]]) {
          parkour(stateRel.node[eRelNodes.tn].ports[k], state.node[eNodes.tn].ports[k]); 
        } else {
          if (edgeCor[stateRel.node[eRelNodes.tn].ports[k]] != state.node[eNodes.tn].ports[k]) {
            success = 0;
          }
        }                                   
      }
    } else {
      success = 0;
    }
  } else {
    if (eRelNodes.st == "IN") {
      if (unvisited[erel]) {
//        m = nodeUnvis[eNodes.sn].ports[eNodes.sp];
        if (nodeUnvis[eNodes.sn].ports[eNodes.sp]) {
          edgeCor[erel] = e;
          piTarget.push(e);
          unvisited[erel] = 0;
          nodeUnvis[eNodes.sn].ports[eNodes.sp] = 0;
        } else {
          success = 0;
        }
      } else {
        if (edgeCor[erel] != e) {
          success = 0;
        }
      }   
    } else {
      if (eRelNodes.tt == "OUT") {
        if (unvisited[erel]) {
//          m = nodeUnvis[eNodes.tn].ports[eNodes.tp];
          if (nodeUnvis[eNodes.tn].ports[eNodes.tp]) {
            edgeCor[erel] = e;
            piSource.push(e);
            unvisited[erel] = 0;
            nodeUnvis[eNodes.tn].ports[eNodes.tp] = 0;
          } else {
            success = 0;
         }
      } else {
        if (edgeCor[erel] != e) {
          success = 0;
        }
      }   
      } else {
        success = 0;
      }
    }
  }
  

}


}





// find the absolute edge from stateRel, whose tag is edgeRel
edgeRelAbs = tagToEdge(edgeRel,stateRel);




parkour(edgeRelAbs,edge);

// prepare isom

if (success) {

for (k=0; k < stateRel.edgelength; k++) {
  var eRelNodes = edgeNodes(k,stateRel);
  var e = edgeCor[k];
  var eNodes = edgeNodes(e,state);

  if (eRelNodes.st == eNodes.st &&  eRelNodes.tt == eNodes.tt) {
    nodeCor[eRelNodes.sn] = eNodes.sn;
    nodeCor[eRelNodes.tn] = eNodes.tn;
    freeNode[eNodes.sn].ports[eNodes.sp] = 0;
    freeNode[eNodes.tn].ports[eNodes.tp] = 0;
  } else {
    if (eRelNodes.st == "IN") { 
      freeNode[eNodes.sn].ports[eNodes.sp] = 0;
    } else {
      if (eRelNodes.tt == "OUT") {
        freeNode[eNodes.tn].ports[eNodes.tp] = 0;
      } else {
        success = 0;
      }
    }
  }
}

var isom = {nodes:nodeCor, edges:edgeCor, tag:tagCor}

  return {named:named, id:success, mol:pat.mol,  sources:piSource, targets:piTarget, iso:isom};

} else {
  return {named:named, id:0, mol:pat.mol, sources:[], targets:[], iso:{nodes:[], edges:[], tag:[]}};
}

} else {
  return {named:named, id:0, mol:pat.mol, sources:[], targets:[], iso:{nodes:[], edges:[], tag:[]}};
}

}







/* 
===============================================================================
 explores the patterns or tokens of a chemistry, from an active edge
===============================================================================
*/

/* the function searches for all patterns 
   - of the chemistry chem
   - at the edge edg
   - in the state state
   - whose ports are not blocked according to freeNode

  the function
   - updates the freeNode
   - outputs the explore output
*/

function Search(what,chem,edg,state, freeNode) {

/* The function returns 
   .output: 
   an object .id (which is 1 or 0) 
   and .sources 
   and .targets 
     which are vectors,
   .kind:
   which pattern is
 - edg is the edge no
 - state is state;
*/

var k, output;
switch (what) {

  case "pattern":
  var tokind = leftPatternsListWithState;
  break;

  case "token":
  var tokind = whichTokenKindsWithState;
  break;

  case "comb":
  var tokind = combCycleListWithState;
  break;
}



for (k=0; k < tokind.length; k++) {
  output = explore(tokind[k], edg, state, freeNode);
 if (output.id) { break; }
}

return output;

}








/* 
===============================================================================
 tags the edges of tokens or patterns in a state
===============================================================================
*/

function see(order,what,chem,state, freeNode) {

var k, a, seed = [];
var  i, j;
a = what;
if (what == "comb") {a = "pattern";} 

for (k=0; k < state.edgelength; k++) {
seed.push({named:"inert", id:0, mol:[], sources:[], targets:[], iso:{nodes:[], edges:[], tag:[]}});
}



for (k=0; k < seed.length; k++) {
// look for token patterns
    tokPat = Search(what,chem,order[k].o,state, freeNode);


  if (tokPat.id) {
    seed[order[k].o] = clone(tokPat);
    for (i=0; i < tokPat.sources.length; i++) {
      var asourc = tokPat.sources[i];
      if (order[k].o != asourc) {
        seed[asourc].named = a;
      }
    }
  }

}



return seed;


}




/* 
===============================================================================
 reaction builder
===============================================================================
*/


function reactionBuilder(chem, permP,permT, edgeAll, state, phyState, nearParam) {


var freeToken = [], i, j, actEdge, actPat, tokenNeeded, tokactEdge, actTok;

var reaction = [];

// make the list of free tokens
for (k = 0; k < permT.length; k++) {
  freeToken.push(1);  
}

  var tokind = leftPatternsList;

for (k = 0; k < permP.length; k++) {
  actEdge = permP[k].o;
  if (edgeAll[actEdge]) {
    actPat = permP[k].i;
    
    for (i = 0; i < tokind.length; i++) {
      if (actPat == tokind[i].kind) {
      tokenNeeded = tokind[i].needs;
      break;
      }
    }
    
    for (j = 0; j < permT.length; j++) {
      if (freeToken[j]) {
        tokactEdge = permT[j].o;
        actTok = permT[j].i;
        if (edgeAll[tokactEdge] && near(actEdge, tokactEdge, phyState, state, nearParam)) {
          if (tokenNeeded == actTok  ) {
            freeToken[j] = 0;
            edgeAll[tokactEdge] = 0;
            edgeAll[actEdge] = 0;
            reaction.push({pattern:{kind:actPat, edge:actEdge}, token:{kind:tokenNeeded, edge:tokactEdge}});
            break;
          }
        }
      }
    }
  }
}



return reaction;



}



/* 
 token related functions
*/


/* 
===============================================================================
 TokenSoup creation
===============================================================================
*/

/* if you add a new token name here, then add the pattern  to hapax-mol.js too!
*/


function addTokenSoup(array, num, b) {
var k, i, j, h, c, e, ee, newTok, obj, output = [];

c = b;



for (k=0; k < array.length; k++) {
  ee = copyPattern(array[k].kind);
  for (j=0; j < num; j++) {
    c++;
    e = clone(ee);
    newTok = new Token(e, c);
    for (i=0; i < newTok.pattern.mol.length; i++) {
      for (h=1; h < newTok.pattern.mol[i].length; h++) {
        (newTok.pattern.mol[i])[h] =  (ee.mol[i])[h] + "^" + c ;
      }
    }
    output.push(newTok);
  }
}

obj = {soup:output, ident:c};
return obj;
}
















