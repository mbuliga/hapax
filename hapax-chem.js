/* 
reactions
*/

/* 
===============================================================================
Chemistries
===============================================================================
*/

/* list of chemistry names
*/

var CHEMISTRIES = ["chemlambda"];

/* 
===============================================================================
 Tokens list
===============================================================================
*/




function tokensList(chem) {

switch (chem) {
  case "chemlambda":
  var array = [ {kind:"ArrowClosed"}, 
  {kind:"Arrow-Arrow"}, 
  {kind:"L-A"}, 
  {kind:"FOE-A"}, 
  {kind:"FOE-FI"}, 
  {kind:"L-FI"}, 
  {kind:"FO-FI"},
  {kind:"FOE-A-FI-FOE"},
  {kind:"L-FI-FI-FOE"}];
  break;


  case "chemlambda-var":
  var array = [ {kind:"ArrowClosed"}, 
  {kind:"Arrow-Arrow"}, 
  {kind:"L-A"}, 
  {kind:"FOE-A"}, 
  {kind:"FOE-FI"}, 
  {kind:"L-FI"}, 
  {kind:"FO-FI"},
  {kind:"FO-A"},
//  {kind:"FOE-A-FI-FOE"},
  {kind:"L-FI-FI-FOE"}];
  break;

}

return array;
}

function combList(chem) {
switch (chem) {
  case "chemlambda":
  var array = [{kind:"ArrowClosed"}, 
  {kind:"A-Arrow"}, 
  {kind:"FI-Arrow"}, 
  {kind:"L-Arrow-2"}, 
  {kind:"FO-Arrow-2"}, 
  {kind:"FOE-Arrow-2"}, 
  {kind:"L-Arrow-3"}, 
  {kind:"FO-Arrow-3"}, 
  {kind:"FOE-Arrow-3"}];
  break;

  case "chemlambda-var":
  var array = [{kind:"ArrowClosed"}, 
  {kind:"A-Arrow"}, 
  {kind:"FI-Arrow"}, 
  {kind:"L-Arrow-2"}, 
  {kind:"FO-Arrow-2"}, 
  {kind:"FOE-Arrow-2"}, 
  {kind:"L-Arrow-3"}, 
  {kind:"FO-Arrow-3"}, 
  {kind:"FOE-Arrow-3"}];
  break;

}
return array;
}

/* 
===============================================================================
 Left Patterns List
===============================================================================
*/

/* if you add a new token name here, then add the pattern  to hapax-mol.js too!
*/


function LeftPatternsList(chem) {

switch (chem) {
  case "chemlambda":
  var array = [{kind:"A-Arrow", needs:"ArrowClosed", gives:["A", "Arrow-Arrow"], pisource:[1,0,2], pitarget:[3,1,2,0]},
  {kind:"FI-Arrow", needs:"ArrowClosed", gives:["FI", "Arrow-Arrow"], pisource:[1,0,2], pitarget:[3,1,2,0]},
  {kind:"L-Arrow-2", needs:"ArrowClosed", gives:["L", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FO-Arrow-2", needs:"ArrowClosed", gives:["FO", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FOE-Arrow-2", needs:"ArrowClosed", gives:["FOE", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"L-Arrow-3", needs:"ArrowClosed", gives:["L", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FO-Arrow-3", needs:"ArrowClosed", gives:["FO", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FOE-Arrow-3", needs:"ArrowClosed", gives:["FOE", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"A-L", needs:"Arrow-Arrow", gives:["Arrow", "Arrow", "L-A"], pisource:[4,0,3,2,1], pitarget:[3,4,0,2,1]}, 
  {kind:"FI-FOE", needs:"Arrow-Arrow", gives:["Arrow", "Arrow", "FOE-FI"], pisource:[3,0,4,1,2], pitarget:[4,3,0,1,2]}, 
  {kind:"A-FOE", needs:"FOE-A", gives:["A-A-FOE-FOE"], pisource:[2,5,0,3,4,1], pitarget:[1,0,4,3,2,5]},  
  {kind:"A-FO", needs:"FOE-A-FI-FOE", gives:["A-A-FOE-FOE"], pisource:[2,7,6,3,4,8,0,5,1], pitarget:[6,0,4,5,2,7,1,3,8]}, 
  {kind:"L-FO", needs:"L-FI-FI-FOE", gives:["L-L-FI-FOE"], pisource:[3,9,8,7,4,2,5,0,6,1], pitarget:[5,0,4,3,6,1,2,7]}, 
  {kind:"L-FOE", needs:"L-FI", gives:["L-L-FI-FOE"], pisource:[3,6,5,0,4,2,1], pitarget:[1,0,2,3,4]}, 
  {kind:"FO-FOE", needs:"FO-FI", gives:["FO-FO-FI-FOE"], pisource:[3,6,5,0,4,2,1], pitarget:[1,0,2,3,4]}, 
  {kind:"FI-FO", needs:"FO-FI", gives:["FI-FI-FO-FO"], pisource:[2,5,0,3,4,1], pitarget:[1,0,4,3,2,5]},
  {kind:"L-FI", needs:"FOE-FI", gives:["L-FI-FI-FOE"], pisource:[0,1,2,3,4,5], pitarget:[5,1,2,3,4,0]},
  {kind:"FOE-FI", needs:"FOE-A", gives:["FOE-A-FI-FOE"], pisource:[0,1,2,3,4,5], pitarget:[3,1,0,2,4,5]},
  {kind:"ArrowClosed2", needs:"ArrowClosed", gives:["Arrow-Arrow"], pisource:[0,1], pitarget:[1,0]},
  {kind:"ArrowClosed", needs:"Arrow-Arrow", gives:["ArrowClosed", "ArrowClosed", "ArrowClosed"], pisource:[0,1,2], pitarget:[0,2,1]},
//  {kind:"Arrow-ArrowOpen", needs:"ArrowClosed", gives:["Arrow", "ArrowClosed", "ArrowClosed"], pisource:[0,1,2], pitarget:[1,0,2]},
  {kind:"L-A", needs:"FOE-FI", gives:["FOE-A", "L-FI"], pisource:[3,1,2,0,4,5], pitarget:[0,1,2,3,4,5]}];
  break;

  case "chemlambda-var":
  var array = [{kind:"A-Arrow", needs:"ArrowClosed", gives:["A", "Arrow-Arrow"], pisource:[1,0,2], pitarget:[3,1,2,0]},
  {kind:"FI-Arrow", needs:"ArrowClosed", gives:["FI", "Arrow-Arrow"], pisource:[1,0,2], pitarget:[3,1,2,0]},
  {kind:"L-Arrow-2", needs:"ArrowClosed", gives:["L", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FO-Arrow-2", needs:"ArrowClosed", gives:["FO", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FOE-Arrow-2", needs:"ArrowClosed", gives:["FOE", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"L-Arrow-3", needs:"ArrowClosed", gives:["L", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FO-Arrow-3", needs:"ArrowClosed", gives:["FO", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"FOE-Arrow-3", needs:"ArrowClosed", gives:["FOE", "Arrow-Arrow"], pisource:[2,1,0,3], pitarget:[2,1,0]},
  {kind:"A-L", needs:"Arrow-Arrow", gives:["Arrow", "Arrow", "L-A"], pisource:[4,0,3,2,1], pitarget:[3,4,0,2,1]}, 
  {kind:"FI-FOE", needs:"Arrow-Arrow", gives:["Arrow", "Arrow", "FOE-FI"], pisource:[3,0,4,1,2], pitarget:[4,3,0,1,2]}, 
  {kind:"A-FOE", needs:"FOE-A", gives:["A-A-FOE-FOE"], pisource:[2,5,0,3,4,1], pitarget:[1,0,4,3,2,5]},  
//  {kind:"A-FO", needs:"FOE-A-FI-FOE", gives:["A-A-FOE-FOE"], pisource:[2,7,6,3,4,8,0,5,1], pitarget:[6,0,4,5,2,7,1,3,8]}, 
  {kind:"A-FO", needs:"FO-A", gives:["A-A-FO-FO"], pisource:[2,5,0,3,4,1], pitarget:[1,0,4,3,2,5]},  
  {kind:"L-FO", needs:"L-FI-FI-FOE", gives:["L-L-FI-FOE"], pisource:[3,9,8,7,4,2,5,0,6,1], pitarget:[5,0,4,3,6,1,2,7]}, 
  {kind:"L-FOE", needs:"L-FI", gives:["L-L-FI-FOE"], pisource:[3,6,5,0,4,2,1], pitarget:[1,0,2,3,4]}, 
  {kind:"FO-FOE", needs:"FO-FI", gives:["FO-FO-FI-FOE"], pisource:[3,6,5,0,4,2,1], pitarget:[1,0,2,3,4]}, 
  {kind:"FI-FO", needs:"FO-FI", gives:["FI-FI-FO-FO"], pisource:[2,5,0,3,4,1], pitarget:[1,0,4,3,2,5]},
  {kind:"L-FI", needs:"FOE-FI", gives:["L-FI-FI-FOE"], pisource:[0,1,2,3,4,5], pitarget:[5,1,2,3,4,0]},
//  {kind:"FOE-FI", needs:"FOE-A", gives:["FOE-A-FI-FOE"], pisource:[0,1,2,3,4,5], pitarget:[3,1,0,2,4,5]},
  {kind:"ArrowClosed2", needs:"ArrowClosed", gives:["Arrow-Arrow"], pisource:[0,1], pitarget:[1,0]},
  {kind:"ArrowClosed", needs:"Arrow-Arrow", gives:["ArrowClosed", "ArrowClosed", "ArrowClosed"], pisource:[0,1,2], pitarget:[0,2,1]},
//  {kind:"Arrow-ArrowOpen", needs:"ArrowClosed", gives:["Arrow", "ArrowClosed", "ArrowClosed"], pisource:[0,1,2], pitarget:[1,0,2]},
  {kind:"L-A", needs:"FOE-FI", gives:["FOE-A", "L-FI"], pisource:[3,1,2,0,4,5], pitarget:[0,1,2,3,4,5]}];
  break;


}

return array;
}

/* 
===============================================================================
 Initiates the token stacks
===============================================================================
*/

function initTokenStacksArray(chem) {
var a = LeftPatternsList(chem);
var k, output = [];




}


/* 
===============================================================================
 Add pattern to mol library
===============================================================================
*/

/* if you add a new token in  LeftPatternsList(chem) then
   push it to the mol patterns library
*/

function toMolLibrary(named,edge,mol) {

fromMolLibrary.push({named:named, edge:edge, mol:mol});

}


