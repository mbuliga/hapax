// everything is a pattern is a mol file with a marked edge ;


var fromMolLibrary = [ 
{named:"ackermann_2_2", 
edge:"1",
mol:[["A", "1", "cb", "o"], 
  ["A", "2", "ca", "1"], 
  ["L", "3", "a", "2"], 
  ["L", "4", "b", "3"], 
  ["A", "5", "b", "4"], 
  ["A", "6", "sp1", "5"], 
  ["A", "a", "f", "6"], 
  ["L", "1s1", "ns1", "sp1"], 
  ["L", "2s1", "ss1", "1s1"], 
  ["L", "3s1", "zs1", "2s1"], 
  ["A", "4s1", "5s1", "3s1"], 
  ["A", "6s1", "zs1", "5s1"], 
  ["A", "ns1", "7s1", "6s1"], 
  ["FO", "ss1", "4s1", "7s1"], 
  ["L", "1f", "Af", "f"], 
  ["L", "2f", "bf", "1f"], 
  ["A", "3f", "cone", "2f"], 
  ["A", "4f", "Af", "3f"], 
  ["A", "sp2", "bf", "4f"], 
  ["L", "1s2", "ns2", "sp2"], 
  ["L", "2s2", "ss2", "1s2"], 
  ["L", "3s2", "zs2", "2s2"], 
  ["A", "4s2", "5s2", "3s2"], 
  ["A", "6s2", "zs2", "5s2"], 
  ["A", "ns2", "7s2", "6s2"], 
  ["FO", "ss2", "4s2", "7s2"], 
  ["L", "1cone", "fcone", "cone"], 
  ["L", "2cone", "xcone", "1cone"], 
  ["A", "fcone", "xcone", "2cone"], 
  ["L", "1ca", "fca", "ca"], 
  ["L", "2ca", "xca", "1ca"], 
  ["A", "3ca", "4ca", "2ca"], 
  ["A", "5ca", "xca", "4ca"], 
  ["FO", "fca", "3ca", "5ca"], 
  ["L", "1cb", "fcb", "cb"], 
  ["L", "2cb", "xcb", "1cb"], 
  ["A", "3cb", "4cb", "2cb"], 
  ["A", "5cb", "xcb", "4cb"], 
  ["FO", "fcb", "3cb", "5cb"]]
},

// source https://github.com/chorasimilarity/chemlambda-gui/blob/gh-pages/dynamic/mol/9_quine.mol 
{named:"9_quine",
edge:"1",
mol:[["FOE", "1", "11", "10"], 
    ["FOE", "9", "17", "16"],
    ["FOE", "7", "15", "14"],
    ["A", "8", "6", "5"],
    ["A", "16", "14", "6"],
    ["A", "17", "15", "7"],
    ["FI", "12", "13", "1"],
    ["L", "10", "12", "8"],
    ["L", "11", "13", "9"]]
},

// chemlambda tokens

{named:"ArrowClosed",
edge:"a",
mol:[["Arrow", "a", "a"]]
},

{named:"Arrow-Arrow",
edge:"a",
mol:[["Arrow", "b", "a"],
    ["Arrow", "a", "b"]]
},

{named:"L-A",
edge:"a",
mol:[["A", "c", "a", "c"],
    ["L", "b", "a", "b"]]
},


{named:"FOE-A",
edge:"a",
mol:[["A", "c", "a", "c"],
    ["FOE", "b", "a", "b"]]
},


{named:"FOE-FI",
edge:"a",
mol:[["FI", "c", "a", "c"],
    ["FOE", "b", "a", "b"]]
},


{named:"L-FI",
edge:"a",
mol:[["FI", "c", "a", "c"],
    ["L", "b", "a", "b"]]
},


{named:"FO-FI",
edge:"a",
mol:[["FI", "c", "a", "c"],
    ["FO", "b", "a", "b"]]
},


{named:"FOE-A-FI-FOE",
edge:"a",
mol:[["FI", "a", "cp", "ap"],
    ["FOE", "b", "a", "b"],
    ["A", "c", "ap", "c"],
    ["FOE", "bp", "cp", "bp"]]
},

{named:"L-FI-FI-FOE",
edge:"a",
mol:[["FI", "a", "cp", "ap"],
    ["L", "b", "a", "b"],
    ["FI", "c", "ap", "c"],
    ["FOE", "bp", "cp", "bp"]]
},

// chemlambda left patterns


{named:"ArrowClosed2",
edge:"a",
mol:[["Arrow", "a", "a"]]
},

{named:"A-L",
edge:"a",
mol:[["L", "c", "b", "a"],
    ["A", "a", "d", "e"]]
},

{named:"FI-FOE",
edge:"a",
mol:[["FI", "b", "c", "a"],
    ["FOE", "a", "e", "d"]]
},


{named:"A-FOE",
edge:"a",
mol:[["A", "b", "c", "a"],
    ["FOE", "a", "e", "d"]]
},

{named:"A-FO",
edge:"a",
mol:[["A", "b", "c", "a"],
    ["FO", "a", "e", "d"]]
},

{named:"L-FOE",
edge:"a",
mol:[["L", "c", "b", "a"],
    ["FOE", "a", "e", "d"]]
},

{named:"L-FO",
edge:"a",
mol:[["L", "c", "b", "a"],
    ["FO", "a", "e", "d"]]
},

{named:"FO-FOE",
edge:"a",
mol:[["FO", "c", "b", "a"],
    ["FOE", "a", "e", "d"]]
},


{named:"FO-L",
edge:"a",
mol:[["FO", "c", "b", "a"],
    ["L", "a", "e", "d"]]
},

{named:"FO-A",
edge:"a",
mol:[["FO", "c", "b", "a"],
    ["A", "a", "e", "d"]]
},


{named:"FI-FO",
edge:"a",
mol:[["FI", "b", "c", "a"],
    ["FO", "a", "e", "d"]]
},




{named:"A-Arrow",
edge:"a",
mol:[["A", "c", "b", "a"],
    ["Arrow", "a", "d"]]
},

{named:"FI-Arrow",
edge:"a",
mol:[["FI", "c", "b", "a"],
    ["Arrow", "a", "d"]]
},

{named:"L-Arrow-2",
edge:"a",
mol:[["L", "c", "a", "b"],
    ["Arrow", "a", "d"]]
},

{named:"FO-Arrow-2",
edge:"a",
mol:[["FO", "c", "a", "b"],
    ["Arrow", "a", "d"]]
},

{named:"FOE-Arrow-2",
edge:"a",
mol:[["FOE", "c", "a", "b"],
    ["Arrow", "a", "d"]]
},

{named:"L-Arrow-3",
edge:"a",
mol:[["L", "c", "b", "a"],
    ["Arrow", "a", "d"]]
},

{named:"FO-Arrow-3",
edge:"a",
mol:[["FO", "c", "b", "a"],
    ["Arrow", "a", "d"]]
},

{named:"FOE-Arrow-3",
edge:"a",
mol:[["FOE", "c", "b", "a"],
    ["Arrow", "a", "d"]]
},

{named:"Arrow-ArrowOpen",
edge:"a",
mol:[["Arrow", "b", "a"],
    ["Arrow", "a", "c"]]
},



// chemlambda right patterns

{named:"A",
edge:"a",
mol:[["A", "a", "b", "c"]]
},

{named:"FI",
edge:"a",
mol:[["FI", "a", "b", "c"]]
},

{named:"L",
edge:"a",
mol:[["L", "a", "b", "c"]]
},

{named:"FO",
edge:"a",
mol:[["FO", "a", "b", "c"]]
},

{named:"FOE",
edge:"a",
mol:[["FOE", "a", "b", "c"]]
},

{named:"Arrow",
edge:"a",
mol:[["Arrow", "a", "b"]]
},

{named:"FRIN",
edge:"a",
mol:[["FRIN", "a"]]
},

{named:"FROUT",
edge:"a",
mol:[["FROUT", "a"]]
},




{named:"A-A-FOE-FOE",
edge:"a",
mol:[["A", "a", "bp", "d"],
    ["FOE", "b", "cp", "a"],
    ["A", "cp", "ap", "e"],
    ["FOE", "c", "ap", "bp"]]
},



{named:"FI-FI-FO-FO",
edge:"a",
mol:[["FI", "a", "bp", "d"],
    ["FO", "b", "cp", "a"],
    ["FI", "cp", "ap", "e"],
    ["FO", "c", "ap", "bp"]]
},

{named:"L-L-FI-FOE",
edge:"a",
mol:[["L", "a", "cp", "d"],
    ["FOE", "c", "bp", "a"],
    ["FI", "cp", "ap", "b"],
    ["L", "bp", "ap", "e"]]
},



{named:"FO-FO-FI-FOE",
edge:"a",
mol:[["FO", "a", "cp", "d"],
    ["FOE", "c", "bp", "a"],
    ["FI", "cp", "ap", "b"],
    ["FO", "bp", "ap", "e"]]
}

];



























