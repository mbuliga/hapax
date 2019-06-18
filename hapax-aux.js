/* 
 auxiliary functions
*/




/* 
===============================================================================
 clone array or obj 

 https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
===============================================================================
*/


function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


/* 
===============================================================================
 the Fisher-Yates shuffle, from Mike Bostock, 

 https://bost.ocks.org/mike/shuffle/
===============================================================================
*/



function shuffle(array) {
  var m = array.length, t, i;

    // While there remain elements to shuffle

  while (m) {

    // Pick a remaining element
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


function shuffleS(array) {
  var m = array.length, t, i;

    // While there remain elements to shuffle

  while (m) {

    // Pick a remaining element
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

 
}

/* 
===============================================================================
 prints a mol rel in a place 
===============================================================================
*/


function printarray (array, place) {

var  text, fLen, i;

fLen = array.length;

text = "<ul>";

for (i = 0; i < fLen; i++) {
  text += "<li>" + "[" + i + "] "+ array[i] + "</li>";
}

text += "</ul>";

document.getElementById(place).innerHTML = text;
}


/* 
===============================================================================
 prints state.node in a place
===============================================================================
*/

function printStateNode (snode, snodename, place) {

var k;

var text = snodename + ": <br>  <br>";

for (k=0; k < snode.length; k++) {
text = text + snodename + "[" + k + "].id" + " = " + snode[k].id + " <br> " + 
snodename + "[" + k + "].type:" + " = " + snode[k].type + " <br> " +
snodename + "[" + k + "].ports:" + " = " + snode[k].ports + "<br> <br>";
}

document.getElementById(place).innerHTML = text;

}



/* 
===============================================================================
 prints state.edge in a place
===============================================================================
*/

function printStateEdge (sedge, sedgename, place) {

var text = sedgename + ": <br>  <br>";

for (k=0; k < sedge.length; k++) {
text = text + sedgename + "["  + k + "].id" + " = "  + sedge[k].id +
 " <br> " + sedgename + "["  + k + "].tag" + " = "  + sedge[k].tag +
 " <br> " + sedgename + "["  + k + "].s.node:" + " = " + sedge[k].s.node +
 " <br> " + sedgename + "["  + k + "].s.port:" + " = " + sedge[k].s.port +
 " <br> " + sedgename + "["  + k + "].t.node:" + " = " + sedge[k].t.node +
 " <br> " + sedgename + "["  + k + "].t.port:" + " = " + sedge[k].t.port +
 "<br> <br>";
}
document.getElementById(place).innerHTML = text;


}





/*
 functions used in other functions, not directly
*/



/* 
===============================================================================
 turns a mol file into a structured nodesRaw array
===============================================================================
*/


function molToList (array) { 

var nodesNo = array.length, j, nodekind, elemtype;
var output = [];
var nodecurr = [];
var elema = {};


if (nodesNo == 0) { 
  return []; 
} else {
  for (j=0; j < nodesNo; j++) {
    nodecurr = clone(array[j]);
    nodekind = nodecurr.length; 
    if (nodekind > 1) {
      elemtype =  nodecurr.shift();
      elema = { id:j , type:elemtype, ports:nodecurr };
      output.push(elema);
    }
  }

return output;

}

}


/* 
===============================================================================
 produces  a list of ports, TO DO: error management
===============================================================================
*/

function listOfPorts (array) { 

var list_Of_Ports = [];
var i, j;

var errorvar = 0;

if (array.length == 0) {return {error:1, ports:[]}; 
} else {
  for (i=0; i < array.length; i++) {
    var currports = array[i].ports, currnode = array[i].type, currid = array[i].id;
    var comparPorts = node_of_type(currnode);
    if (comparPorts.length == currports.length) {
      for (j=0; j < currports.length; j++) {
        list_Of_Ports.push({ id:currports[j],  node:i , port:j , type:comparPorts[j]});
      }
    } else { errorvar++;}    
  }

/* errorvar is to catch an error, TO DO

if (errorvar)  {
 document.getElementById("clean").innerHTML = "some nodes have the wrong number of ports";
}

*/

// sorts list_Of_Ports according to port id

  list_Of_Ports.sort(function(a, b){
    var x = a.id
    var y = b.id
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  var output = { error:errorvar, ports:list_Of_Ports};
  return output;
}

}







/* 
===============================================================================
 updates edge tags: oldTag[k] = {orig: , update: }, newtag[k] = string
===============================================================================
*/


function updateTag (oldTag, newTag) {

var k;
var len = newTag.length;
if (len = oldTag.length) {
  for (k=0; k < oldTag.length; k++) {
    oldTag[k].update = newTag[k];
  }
}
}











