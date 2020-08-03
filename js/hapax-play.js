/* 
===============================================================================
 input chemistry
===============================================================================
*/

// only one chemistry for the moment, so the "hapax" not present yet

var chem = "chemlambda";



var leftPatternsList = LeftPatternsList(chem);
var whichTokenKinds = tokensList(chem);
var combCycleList = combList(chem);

var k, j, a, aa, leftPatternsListWithState = [], whichTokenKindsWithState = [], combCycleListWithState = [];
for (k=0; k < leftPatternsList.length; k++) {
a = copyPattern(leftPatternsList[k].kind);
aa = molRelToState(a.mol);
if (aa.nodelength > a.mol.length) {
  for (j=a.mol.length; j < aa.nodelength; j++) {
    if (aa.node[j].type == "FRIN") {
      aa.node[j].type = "IN";
    } else {
      aa.node[j].type = "OUT";
    }
  }
}
leftPatternsListWithState.push({named:a.named, edge:a.edge, mol:a.mol, state:aa});
}
for (k=0; k < whichTokenKinds.length; k++) {
a = copyPattern(whichTokenKinds[k].kind);
aa = molRelToState(a.mol);
if (aa.nodelength > a.mol.length) {
  for (j=a.mol.length; j < aa.nodelength; j++) {
    if (aa.node[j].type == "FRIN") {
      aa.node[j].type = "IN";
    } else {
      aa.node[j].type = "OUT";
    }
  }
}
whichTokenKindsWithState.push({named:a.named, edge:a.edge, mol:a.mol, state:aa});
}
for (k=0; k < combCycleList.length; k++) {
a = copyPattern(combCycleList[k].kind);
aa = molRelToState(a.mol);
if (aa.nodelength > a.mol.length) {
  for (j=a.mol.length; j < aa.nodelength; j++) {
    if (aa.node[j].type == "FRIN") {
      aa.node[j].type = "IN";
    } else {
      aa.node[j].type = "OUT";
    }
  }
}
combCycleListWithState.push({named:a.named, edge:a.edge, mol:a.mol, state:aa});
}

/* 
===============================================================================
 input physics
===============================================================================
*/

// you can change Physics  to "none"

var PHYSICS = "random";

// the dimension of the universe is 

var DIMENSION = 2;

// the universe is a cube with rigid walls,  with size

var BOXSIZE = 10;

// the components of the speed are at most

var BOXSPEED = 10;


// near parameter 

var NEARPARAM = 0.8;

// Young constant

var ELASTICA = 0.01;



/* 
===============================================================================
 input: mol pattern
===============================================================================
*/

// var mol = molfile();

var docuMol = document.getElementById("molhere").innerHTML;

var molnamed = new Mol(docuMol);
var mol = molnamed.mol;

/* a .mol is an usual mol file, i.e. an array of nodes, each 
   node is an array where on the first position is the node type, 
   on the other positions are the tags of the edges which are connected to 
   that port of the node.

   We call this a "mol relative", because we use it to turn it 
   into a "mol absolute", which is just like the mol relative, 
   but the edges are numbered and the tag of each edge is kept into 
   a tag vector. See the function molRelToAbs. 

   A mol absolute is obtained as a byproduct of turning 
   a mol relative into a "state".

   A pattern is a pair (mol relative, edge name), such that the graph 
   represented by the mol relative is connected.

   For the moment only 2 mol files, others than those of the patterns, 
   are available:

   ackermann_2_2  (i.e. the ackermann(2,2) used so many times in chemlambda)
   9_quine        (the smallest chemlambda quine. not from a lambda term, dies 
                  fast in random conditions)

   (As any mol file which represents a connected graph can 
   be turned into a pattern, you can use even these as patterns and pattern 
   recognition.)

   You can add new mol relative by going to the chemlambda library of molecules 
   https://github.com/chorasimilarity/chemlambda-gui/tree/gh-pages/dynamic/mol 
   and you can take a mol file from there and convet it into json format, 
   then add it in hapax-mol.js, in the same format as the other ones.

   Most likely a good idea later is to have separate places for the mol relative 
   files and pattern files. Also a program to convert a mol from the library into 
   the format used here.
*/


/* 
===============================================================================
 input: tokens numbers
===============================================================================
*/

/* tokens are the small molecules which are involved in reactions with patterns. 

*/

/* a primitive system of giving identity to tokens, based on counting*/
var initialTokenIdent = 0;

/* how many tokens of each kind do you wish? */
var tokenQuantity = 3;

/* the list of tokens kinds for a chemistry */

var initialtokensList = whichTokenKinds;



var tokenSoup = addTokenSoup(initialtokensList, tokenQuantity, initialTokenIdent);

/* where are we with the numbering of tokens? */

var currentTokenIdent = tokenSoup.ident;



/* example: add some more INITIAL tokens (used later)

var addSomeMoreTokens =   [{kind:"FOE-A"}, {kind:"FOE-FI"}];
var addSomeMoreTokensNumber = 4;
var addSomeSoup = addTokenSoup(addSomeMoreTokens, addSomeMoreTokensNumber, currentTokenIdent);
tokenSoup.soup = tokenSoup.soup.concat(addSomeSoup.soup);
tokenSoup.ident = addSomeSoup.ident;

// burn some INITIAL tokens based on ident. Remark that tokenSoup.ident does not change

var identToBurn = "4";
var identFound = -1;
for (k=0; k < tokenSoup.soup.length; k++) {
  if (tokenSoup.soup[k].ident == identToBurn) {
    identFound = k;
  }
}
if (identFound != -1) {
tokenSoup.soup.splice(identFound,1);
}

*/

/* 
===============================================================================
 creation of the state
===============================================================================
*/

/* a state is an usual way to represent the graph. A state is an object

{  state.node = array of nodes
   state.edge = array of edges
   state.nodelength = state.node.length
   state.edgelength = state.edge.length
}

  state.node[k].type  is the type of node
               .id       number of node (in the mol relative)
               .ports  array of absolute names (i.e. numbers) of the edges incident to node ports

  state.edge[k].id  number of edge (i.e. absolute name)
               .s   (object source)
                 .node  source node number
                 .port  source port number (i.e. port 0, 1, or 2 for a trivalent node, for example)

               .t  (target object)
                 .node target node number
                 .port target port number
               
               .tag  the tag of the edge (i.e. the relative name, from the mol relative)
*/




// from a relative mol to the state

 var state = molRelToState(mol);



/* add the tokens from the tokenSoup list to the state */


for (k=0; k < tokenSoup.soup.length; k++) {
  var newT = tokenSoup.soup[k].pattern.mol;
  var newTState = molRelToState(newT);
  addState(state, newTState);
}





// get the mol of the state

var molrelback = stateToMolRel(state);

// from the state to absolute mol

var molabs = stateToMolAbs(state);





 




/* 
===============================================================================
 physics
===============================================================================
*/

/* creation of the physical state. 
   because whenever we add tokens we have to initialize again the 
   physical state, this will appear again once. */

var phyState = new State([], [], state.nodelength, state.edgelength);


for (k=0; k < state.nodelength; k++) {
phyState.node.push({q:randomVector(DIMENSION,BOXSIZE), p:zeroVector(DIMENSION)});
}

for (k=0; k < state.edgelength; k++) {
phyState.edge.push({q:zeroVector(DIMENSION)});
}



// time counter variable
var timeTrack = 0;

// we shall use the following to count the tokens in a state
var listoftokenkinds = [];



for (k = 0; k < whichTokenKinds.length; k++) {
listoftokenkinds.push({kind:whichTokenKinds[k].kind, number:1});
}


/* go in time the first step (or, later, one more step) */







mockCycle();





function mockCycle() {

var phyStateOldNodelength = phyState.nodelength;
var phyStateOldEdgelength = phyState.edgelength;

// if tokens are needed, add them!



for (k = 0; k < whichTokenKinds.length; k++) {
if (listoftokenkinds[k].number < tokenQuantity) {
  var currentTokenIdent = tokenSoup.ident;
  var addSomeMoreTokens =   [{kind:listoftokenkinds[k].kind}];
  var addSomeMoreTokensNumber = tokenQuantity - listoftokenkinds[k].number;
  var addSomeSoup = addTokenSoup(addSomeMoreTokens, addSomeMoreTokensNumber, currentTokenIdent);
  tokenSoup.soup = tokenSoup.soup.concat(addSomeSoup.soup);
  tokenSoup.ident = addSomeSoup.ident;
  currentTokenIdent = tokenSoup.ident;
  for (j=0; j < addSomeSoup.soup.length; j++) {
    var newT = addSomeSoup.soup[j].pattern.mol;
    var newTState = molRelToState(newT);
    addState(state, newTState);

  }
}
}


/* 
===============================================================================
 update the physics state
===============================================================================
*/



    var u;
    for (u=phyStateOldNodelength; u < state.nodelength; u++) {
      phyState.node.push({q:randomVector(DIMENSION,BOXSIZE), p:zeroVector(DIMENSION)});
    }
    
    for (u=phyStateOldEdgelength; u < state.edgelength; u++) {
      phyState.edge.push({q:zeroVector(DIMENSION)});
    }



// update the physics state

physics(PHYSICS, phyState);


/* 
===============================================================================
 pattern discovery
===============================================================================
*/


/* explores all edges to search for tokens
   and tags the edges with the result of Search("token",chem,edge,state)
   then see[k].named is modified to: 
   -"inert" for edges not part of a token
   -"token" for edges part of a token, but not active
   - name of the token for active edges of the tokens

*/


/* create the arrays of free ports for tokens and patterns */

var freeNodeT = [];
var bui = [];
for (k=0; k < state.nodelength; k++) {
  bui = [];
  freeNodeT.push({ports:[]});
  for (l=0; l < state.node[k].ports.length; l++) {
  bui.push(1); 
  }
  freeNodeT[k].ports = bui;
}

var freeNodeP = clone(freeNodeT);


/* generates two identity permutations of state edges */

var orderP = idPermState(state.edgelength);
var orderT = idPermState(state.edgelength);

/* random shuffling gives permutations used for the order
   of search for patterns and tokens */

shuffleS(orderP);
shuffleS(orderT);





/* create the seetoken. This is an array with length 
   state.edgelength, with elements which are objects:

 {named:named, id:success, mol:pat.mol,  sources:piSource, targets:piTarget, iso:isom};

 isom = {nodes:nodeCor, edges:edgeCor, tag:tagCor}

  where .named is the name of the pattern (or token) searched
        .id is 1 if success, otherwise 0
        .mol is the mol file of the pattern template
        .sources  is the vector of sources (of edges in the pattern as indentified in the state)
        .targets  is the vecor of targets (...)
        .iso keeps the isomorphism between the pattern template and the pattern as identified in the state
          .nodes[node no in the pattern template] = node no in the pattern from the state
          .edges[edge no in the pattern template] = edge no in the pattern from state
          .tag[edge no in the pattern template] = string used for identification in the pattern template
                                                  (cf. the notions of mol relative and mol absolute)

*/

var seetoken = see(orderT,"token",chem,state, freeNodeT);



/* how many tokens of each kind there are? */


listoftokenkinds = [];

for (k = 0; k < whichTokenKinds.length; k++) {
listoftokenkinds.push({kind:whichTokenKinds[k].kind, number:0});
}

for (k = 0; k < seetoken.length; k++) {
  if (seetoken[k].id) {
    var lookforit = seetoken[k].named;
    for (j = 0; j < listoftokenkinds.length; j++) {
      if (lookforit == listoftokenkinds[j].kind) {
        listoftokenkinds[j].number++;
        break;
      }
    }
  }
}





/* what is the main molabs? */

var molabsReal = stateToMolAbs(state);
var spliceIt = [];

for (k = 0; k < molabsReal.mol.length; k++) {
  spliceIt.push(1);
  var lineHere = molabsReal.mol[k];
  for (j = 1; j < lineHere.length; j++) {
    if (seetoken[lineHere[j]].named != "inert") { 
      spliceIt[k] = 0;
    }
  }
}

var molabsWithoutTokens = [];
var molabsMeans = [];

// SEMANTICS

var startOfMeaning;
for (k = 0; k < molabsReal.mol.length; k++) {
  if (spliceIt[k]) {
    molabsWithoutTokens.push(molabsReal.mol[k]);
    startOfMeaning = "";
    switch (molabsReal.mol[k][0]) {
      case "A":
      startOfMeaning += "(" + molabsReal.mol[k][3] + ") = (" + molabsReal.mol[k][1] + ") (" + molabsReal.mol[k][2] + ")";
      break;
      
      case "L":
      startOfMeaning += "(" + molabsReal.mol[k][3] + ") = &lambda; (" + molabsReal.mol[k][2] + ") . (" + molabsReal.mol[k][1] + ")";
      break;

      case "Arrow":
      startOfMeaning += "(" + molabsReal.mol[k][2] + ") = (" + molabsReal.mol[k][1] + ")";
      break;
      
      case "FO":
      startOfMeaning += "(" + molabsReal.mol[k][2] + ") = (" + molabsReal.mol[k][1] + ") , (" + molabsReal.mol[k][3] + ") = (" +  molabsReal.mol[k][1] + ")";
      break;
      
      case "FOE":
      startOfMeaning += "(" + molabsReal.mol[k][2] + ") = CDR (" + molabsReal.mol[k][1] + ") , (" + molabsReal.mol[k][3] + ") = CAR (" +  molabsReal.mol[k][1] + ")";
      break;
      
      case "FI":
      startOfMeaning += "(" + molabsReal.mol[k][3] + ") = (CONS (" + molabsReal.mol[k][1] + ")  (" + molabsReal.mol[k][2] +  "))";
      break;

      case "FRIN":
      startOfMeaning += "input (" + molabsReal.mol[k][1] + ")";
      break;

      case "FROUT":
      startOfMeaning += "output (" + molabsReal.mol[k][1] + ")";
      break;
    }
    molabsMeans.push(startOfMeaning);  
  }
}

printarray (molabsWithoutTokens, "molorig");
printarray (molabsMeans, "molrelback");

var text = "<ul>";

for (k = 0; k < listoftokenkinds.length; k++) {
  text += "<li>" + "[" + listoftokenkinds[k].kind + "] "+ listoftokenkinds[k].number + "</li>";
}
text += "</ul>";
text += "<ul><li> cost of computation: " + state.nodelength + "</li>";
text += "<li> main molecule nodes: " + molabsWithoutTokens.length + "</li>";
text += "<li> time: " + timeTrack + "</li></ul>";
document.getElementById("seekind").innerHTML = text;


//document.getElementById("molrelback").innerHTML = text;


/*create the seepattern Same structure as the seetoken, but this time for reaction patterns.
  As in usual chemlambda, it is useful to have the possibility to "comb" the molecule 
  graph in order to eliminate the Arrow nodes. Hence a "comb" option. */

var whatToSearch = "pattern";

for (k = 0; k < molabsWithoutTokens.length; k++) { 
  if (molabsWithoutTokens[k][0] == "Arrow") {
    whatToSearch = "comb";
    break;
  }
}







var seepattern = see(orderP,whatToSearch,chem,state, freeNodeP);





/* creates arrays of pattern active edges and token active edges 
   edgeAll[k] = 1 if the edge is active, as a pattern or as a token
   the use of edgeAll is to not use a pair (pattern, token) twice, 
   if pattern 
*/

var edgeP = [], edgeT = [], edgeAll = [];

for (k=0; k < state.edgelength; k++) {
  edgeAll.push(0);
  if ((seetoken[k].named != "inert") && (seetoken[k].named != "token")) {
  edgeT.push(k);
  edgeAll[k] = 1;
  }
  if ((seepattern[k].named != "inert") && (seepattern[k].named != "pattern")) {
  edgeP.push(k);
  edgeAll[k] =1;
  }

}






/* generates the identity permutations of the pattern and token state edges */

var permP = idPermState(edgeP.length);
var permT = idPermState(edgeT.length);

/* random shuffling of the main edges */

shuffleS(permP);
shuffleS(permT);


for (k=0; k < permP.length; k++) {
  permP[k].i = seepattern[edgeP[permP[k].i]].named;
  permP[k].o = edgeP[permP[k].o];
}

for (k=0; k < permT.length; k++) {
  permT[k].i = seetoken[edgeT[permT[k].i]].named;
  permT[k].o = edgeT[permT[k].o];
}




/* find the reactions  based on the physics (near)*/



var reaction = reactionBuilder(chem, permP,permT, edgeAll, state, phyState, NEARPARAM);


/* the reactions happen 
   see for explanations the presentation 
   http://imar.ro/~mbuliga/genchem.html

   each reaction is done by a pair of permutations: 
   - one of the sources of edges, 
   - the other of the targets of edges

*/

var piSrc = [], piTrg = [];
for (k = 0; k < reaction.length; k++) {

  var activePatternKind = reaction[k].pattern.kind;
  var activePatternEdge = reaction[k].pattern.edge;

  var activeTokenKind = reaction[k].token.kind;
  var activeTokenEdge = reaction[k].token.edge;

/* identify the reaction and get the template of permutations
   the templates of pemutations are the most important 
   part of the chemistry. For this example which uses chemlambda 
   you find these templates in hapax-chem.js, as 

    .pisource
    .pitarget

  in LeftPatternsList(chem). 

  To understand how these templates are built, first we need to 
  understand how the patterns are recognized. The main function for 
  this is explore (and the internal parkour) from hapax.js. 

  We as humans use human notations, for example mol (relative) notation 
  and a definition of the reaction via giving the left pattern and the right pattern. 

  In order to turn it into an "absolute" notation I used this help: 
  hapax-explore.html and hapax-explore.js, 

  which use the pattern recognition mechanism of patterns on themselves, 
  which is then used to convert the human notation into the one useful 
  for this program.
  
*/

  for (j = 0; j < leftPatternsList.length; j++) {
    if ((activePatternKind == leftPatternsList[j].kind) && (activeTokenKind == leftPatternsList[j].needs)) {
      piSrc = leftPatternsList[j].pisource;
      piTrg = leftPatternsList[j].pitarget;
      break;
    }
  }

/* build the permutations of sources and targets*/
  
  var sourcesPi = (seepattern[activePatternEdge].sources).concat(seetoken[activeTokenEdge].sources);
  var targetsPi = (seepattern[activePatternEdge].targets).concat(seetoken[activeTokenEdge].targets);
 
  var sourcesPerm = [];
  for (j = 0; j < sourcesPi.length; j++) {
    sourcesPerm.push({i:sourcesPi[j], o:sourcesPi[piSrc[j]]});
  }

  var targetsPerm = [];
  for (j = 0; j < targetsPi.length; j++) {
    targetsPerm.push({i:targetsPi[j], o:targetsPi[piTrg[j]]});
  }

/* act on the state */

  activeState(state, sourcesPerm, targetsPerm);


}



var text = "<ul>";

for (k = 0; k < reaction.length; k++) {
  text += "<li>" + "[" + k + "] (" + reaction[k].pattern.kind + ", " + reaction[k].pattern.edge + ") + (" +  reaction[k].token.kind + ", " + reaction[k].token.edge + ") </li>";
}

text += "</ul>";


document.getElementById("molabs").innerHTML = text;


timeTrack++;


// end of mockCycle()
}




