// everything is a pattern is a mol file with a marked edge ;


var fromMolLibrary = [ 
// source https://raw.githubusercontent.com/chorasimilarity/chemlambda-gui/gh-pages/dynamic/mol/2_2_A_FO_FI_L.mol
{named:"A-FO-FI-L",
edge:"1",
mol:[["A", "1", "2", "con"],
    ["FO", "in", "1", "2"],
    ["FI", "11", "22", "in"],
    ["L", "con", "11", "22"]]
},
// source https://raw.githubusercontent.com/chorasimilarity/chemlambda-gui/gh-pages/dynamic/mol/16_quine_A_L_FI_FO_duplicate.mol
{named:"16_quine_A_L_FI_FO_duplicate",
edge:"a1",
mol:[["FO", "a1", "a2", "a3"],
    ["L", "a4", "a5", "a7"],
    ["FO", "a6", "a8", "a9"],
    ["FOE", "a10", "a11", "a12"],
    ["FI", "a7", "a20", "a10"],
    ["FI", "a2", "a8", "a6"],
    ["FOE", "a17", "a13", "a14"],
    ["FI", "a33", "a9", "a16"],
    ["A", "a11", "a13", "a21"],
    ["A", "a12", "a14", "a4"],
    ["FI", "a19", "a16", "a20"],
    ["FI", "a5", "a22", "a17"],
    ["FOE", "a21", "a18", "a23"],
    ["FI", "a15", "a24", "a22"],
    ["L", "a18", "a24", "a1"],
    ["L", "a23", "a15", "a19"],
    ["FI", "a3", "2", "1"],
    ["FO", "1", "2", "a33"]]
},

// source https://raw.githubusercontent.com/chorasimilarity/chemlambda-gui/gh-pages/dynamic/mol/omegafo.mol
{named:"omegafo",
edge:"wa4",
mol:[["FO", "wa4", "wa8", "wa9"],
["FO", "wa6", "wa10", "a11"],
["A", "wa2", "wa3", "wa1"],
["A", "wa8", "wa9", "wa5"],
["A", "wa10", "wa11", "wa7"],
["L", "wa5", "wa4", "wa2"],
["L", "wa7", "wa6", "wa3"],
["FO", "wa1", "w1", "w2"],
["FO", "w1", "w11", "w12"],
["FO", "w2", "w21", "w22"],
["FO", "w11", "w111", "w112"],
["FO", "w12", "w121", "w122"],
["FO", "w21", "w211", "w212"],
["FO", "w22", "w221", "w222"],
["FO", "a4", "a8", "a9"],
["FO", "a6", "a10", "wa11"],
["A", "a2", "a3", "a1"],
["A", "a8", "a9", "a5"],
["A", "a10", "a11", "a7"],
["L", "a5", "a4", "a2"],
["L", "a7", "a6", "a3"],
["FO", "a1", "1", "2"],
["FO", "1", "11", "12"],
["FO", "2", "21", "22"],
["FO", "11", "111", "112"],
["FO", "12", "121", "122"],
["FO", "21", "211", "212"],
["FO", "22", "221", "222"]]
},

// source https://raw.githubusercontent.com/chorasimilarity/chemlambda-gui/gh-pages/dynamic/mol/dodecahedron_dupli.mol
{named:"dodecahedron_dupli",
edge:"a1",
mol:[["FOE", "10x", "10xai", "10xbi"],
["FI", "10xb", "10xa", "0x"],
["FOE", "10xai", "10xaiai", "10xaibi"],
["FI", "10xaib", "10xaia", "10xa"],
["FOE", "10xaiai", "10xaiaa", "10xaiab"],
["FI", "10xaiab", "10xaiaa", "10xaia"],
["FOE", "10xaibi", "10xaiba", "10xaibb"],
["FI", "10xaibb", "10xaiba", "10xaib"],
["FOE", "10xbi", "10xbiai", "10xbibi"],
["FI", "10xbib", "10xbia", "10xb"],
["FOE", "10xbiai", "10xbiaa", "10xbiab"],
["FI", "10xbiab", "10xbiaa", "10xbia"],
["FOE", "10xbibi", "10xbiba", "10xbibb"],
["FI", "10xbibb", "10xbiba", "10xbib"],
["FOE", "10y", "10yai", "10ybi"],
["FI", "10yb", "10ya", "0y"],
["FOE", "10yai", "10yaiai", "10yaibi"],
["FI", "10yaib", "10yaia", "10ya"],
["FOE", "10yaiai", "10yaiaa", "10yaiab"],
["FI", "10yaiab", "10yaiaa", "10yaia"],
["FOE", "10yaibi", "10yaiba", "10yaibb"],
["FI", "10yaibb", "10yaiba", "10yaib"],
["FOE", "10ybi", "10ybiai", "10ybibi"],
["FI", "10ybib", "10ybia", "10yb"],
["FOE", "10ybiai", "10ybiaa", "10ybiab"],
["FI", "10ybiab", "10ybiaa", "10ybia"],
["FOE", "10ybibi", "10ybiba", "10ybibb"],
["FI", "10ybibb", "10ybiba", "10ybib"],
["FOE", "1ky", "1kyai", "1kybi"],
["FI", "1kyb", "1kya", "1y"],
["FOE", "1kybi", "1kybiai", "1kybibi"],
["FI", "1kybib", "1kybia", "1kyb"],
["FOE", "1kybiai", "1kybiaa", "1kybiab"],
["FI", "1kybiab", "1kybiaa", "1kybia"],
["FOE", "1kybibi", "1kybiba", "1kybibb"],
["FI", "1kybibb", "1kybiba", "1kybib"],
["FOE", "1kyai", "1kyaiai", "1kyaibi"],
["FI", "1kyaib", "1kyaia", "1kya"],
["FOE", "1kyaiai", "1kyaiaa", "1kyaiab"],
["FI", "1kyaiab", "1kyaiaa", "1kyaia"],
["FOE", "1kyaibi", "1kyaiba", "1kyaibb"],
["FI", "1kyaibb", "1kyaiba", "1kyaib"],
["A", "9x", "12ad", "10x"],
["L", "9y", "12ad", "1ky"],
["A", "8x", "22ad", "9x"],
["L", "8y", "22ad", "10y"],
["A", "7x", "12", "8x"],
["L", "7y", "12", "9y"],
["A", "6x", "22", "7x"],
["L", "6y", "22", "8y"],
["A", "5x", "32", "6x"],
["L", "5y", "32", "7y"],
["A", "4x", "42", "5x"],
["L", "4y", "42", "6y"],
["A", "3x", "12o", "4x"],
["L", "3y", "12o", "5y"],
["A", "2x", "22o", "3x"],
["L", "2y", "22o", "4y"],
["A", "1x", "32o", "2x"],
["L", "1y", "32o", "3y"],
["A", "0x", "42o", "1x"],
["L", "0y", "42o", "2y"]]
},

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

{named:"mol_to_try",
edge:"1",
mol:[["FO", "1", "free2", "free3"],
["FO", "4", "5", "6"],
["L", "7", "4", "1"],
["A", "6", "5", "8"],
["A", "9", "8", "7"],
["L", "10", "11", "9"],
["A", "12", "13", "10"],
["FO", "11", "13", "12"]]
},

// chemlambda and chemlambda-var tokens

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

{named:"FO-A",
edge:"a",
mol:[["A", "c", "a", "c"],
    ["FO", "b", "a", "b"]]
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

// chemlambda and chemlambda-var left patterns


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



// chemlambda and chemlambda-var right patterns

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

{named:"A-A-FO-FO",
edge:"a",
mol:[["A", "a", "bp", "d"],
    ["FO", "b", "cp", "a"],
    ["A", "cp", "ap", "e"],
    ["FO", "c", "ap", "bp"]]
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



























