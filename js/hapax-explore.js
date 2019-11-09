/* 
===============================================================================
 input chemistry
===============================================================================
*/


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
// the dimension of the universe is 

var DIMENSION = 2;

// the universe is a cube (or a torus like in old video games) with size

var BOXSIZE = 1000;

// the components of the speed are at most

var BOXSPEED = 50;


// near parameter 

var NEARPARAM = 0.5;




var ko, k;

text = "<ul>";

for (ko=0; ko < leftPatternsList.length; ko++) {
var needsCurr = leftPatternsList[ko].needs;
var molnamedCurr = new Mol(leftPatternsList[ko].kind);
var molNeedsCurr = new Mol(leftPatternsList[ko].needs);
var initialtokensListCurr = [{kind:needsCurr}];
var molCurr = molnamedCurr.mol;

var tokenSoupCurr = addTokenSoup(initialtokensListCurr, 1, 0);
var currentTokenIdentCurr = tokenSoupCurr.ident;




// from a relative mol to the state

 var stateCurr = molRelToState(molCurr);



/* add the tokens from the tokenSoup list to the state */

for (k=0; k < tokenSoupCurr.soup.length; k++) {
  var newTCurr = tokenSoupCurr.soup[k].pattern.mol;
  var newTStateCurr = molRelToState(newTCurr);
  addState(stateCurr, newTStateCurr);
}


// get the mol of the state

var molrelbackCurr = stateToMolRel(stateCurr);

// from the state to absolute mol

var molabsCurr = stateToMolAbs(stateCurr);


var phyStateCurr = new State([], [], stateCurr.nodelength, stateCurr.edgelength);


for (k=0; k < stateCurr.nodelength; k++) {
phyStateCurr.node.push({q:zeroVector(DIMENSION,BOXSIZE), p:zeroVector(DIMENSION)});
}

for (k=0; k < stateCurr.edgelength; k++) {
phyStateCurr.edge.push({q:zeroVector(DIMENSION)});
}


physics("none", phyStateCurr);



/* create the arrays of free ports for tokens and patterns */

var freeNodeTCurr = [];
var bui = [];
for (k=0; k < stateCurr.nodelength; k++) {
  bui = [];
  freeNodeTCurr.push({ports:[]});
  for (l=0; l < stateCurr.node[k].ports.length; l++) {
  bui.push(1); 
  }
  freeNodeTCurr[k].ports = bui;
}

var freeNodePCurr = clone(freeNodeTCurr);


/* generates two identity permutations of state edges */

var orderPCurr = idPermState(stateCurr.edgelength);
var orderTCurr = idPermState(stateCurr.edgelength);

/* random shuffling gives permutations used for the order
   of search for patterns and tokens */

// orderP = shuffle(orderP);
// orderT = shuffle(orderT);





/* create the seetoken */

var seetokenCurr = see(orderTCurr,"token",chem,stateCurr, freeNodeTCurr);

/*create the seepattern */

var seepatternCurr = see(orderPCurr,"pattern",chem,stateCurr, freeNodePCurr);






/* creates arrays of pattern active edges and token active edges 
   edgeAll[k] = 1 if the edge is active, as a pattern or as a token
   the use of edgeAll is to not use a pair (pattern, token) twice, 
   if pattern 
*/

var edgePCurr = [], edgeTCurr = [], edgeAllCurr = [];

for (k=0; k < stateCurr.edgelength; k++) {
  edgeAllCurr.push(0);
  if ((seetokenCurr[k].named != "inert") && (seetokenCurr[k].named != "token")) {
  edgeTCurr.push(k);
  edgeAllCurr[k] = 1;
  }
  if ((seepatternCurr[k].named != "inert") && (seepatternCurr[k].named != "pattern")) {
  edgePCurr.push(k);
  edgeAllCurr[k] =1;
  }

}






/* generates the identity permutations of the pattern and token state edges */

var permPCurr = idPermState(edgePCurr.length);
var permTCurr = idPermState(edgeTCurr.length);



for (k=0; k < permPCurr.length; k++) {
  permPCurr[k].i = seepatternCurr[edgePCurr[permPCurr[k].i]].named;
  permPCurr[k].o = edgePCurr[permPCurr[k].o];
}

for (k=0; k < permTCurr.length; k++) {
  permTCurr[k].i = seetokenCurr[edgeTCurr[permTCurr[k].i]].named;
  permTCurr[k].o = edgeTCurr[permTCurr[k].o];
}


var reactionCurr = reactionBuilder(chem, permPCurr,permTCurr, edgeAllCurr, stateCurr, phyStateCurr, NEARPARAM);

var textCurr = "<ul>";

for (k=0; k < reactionCurr.length; k++) {

  var activePatternKindCurr = reactionCurr[k].pattern.kind;
  var activePatternEdgeCurr = reactionCurr[k].pattern.edge;

  var activeTokenKindCurr = reactionCurr[k].token.kind;
  var activeTokenEdgeCurr = reactionCurr[k].token.edge;

  textCurr = textCurr + "<li>" + activePatternKindCurr + " , " +  activeTokenKindCurr + " <ul> <li> s: [ ";
  var j;
  var rsc = 0;
  for (j=0; j < seepatternCurr[activePatternEdgeCurr].sources.length; j++) {
    var eCurr = seepatternCurr[activePatternEdgeCurr].sources[j];
    var eTagCurr = stateCurr.edge[eCurr].tag;

    textCurr = textCurr + " (" + rsc + "," + eTagCurr + ") ";
    rsc++;
  } 

  for (j=0; j < seetokenCurr[activeTokenEdgeCurr].sources.length; j++) {
    var eCurr = seetokenCurr[activeTokenEdgeCurr].sources[j];
    var eTagCurr = stateCurr.edge[eCurr].tag;

    textCurr = textCurr + " (" + rsc + ", " + eTagCurr + ") ";
    rsc++;
  } 

  textCurr = textCurr + " ] </li> <li> t: [";

// -------
  var rtg = 0;
  for (j=0; j < seepatternCurr[activePatternEdgeCurr].targets.length; j++) {
    var eCurr = seepatternCurr[activePatternEdgeCurr].targets[j];
    var eTagCurr = stateCurr.edge[eCurr].tag;

    textCurr = textCurr + " (" + rtg + "," + eTagCurr + ") ";
    rtg++;
  } 

  for (j=0; j < seetokenCurr[activeTokenEdgeCurr].targets.length; j++) {
    var eCurr = seetokenCurr[activeTokenEdgeCurr].targets[j];
    var eTagCurr = stateCurr.edge[eCurr].tag;

    textCurr = textCurr + " (" + rtg + ", " + eTagCurr + ") ";
    rtg++;
  } 

  textCurr = textCurr + "] </li> </ul>";




// ------

// end for (k=0; k < reactionCurr.length; k++) {
}

textCurr = textCurr + "</ul>";


text = text + "<li>" + textCurr + "</li>";

document.getElementById("allsources").innerHTML = text;











// end for (ko=0; ko < leftPatternsList.length; ko++) {
}

text = text + "</ul>";

///////////////////////////////////////////////////////////////////////////








