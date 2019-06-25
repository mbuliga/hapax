This folder contains a variant of the quiner program from 

https://github.com/chorasimilarity/chemlambda-gui/blob/gh-pages/dynamic/README.md

and a hacked universal visualizer for the chemlambda library of simulations. 

In order to use the quiner-mod program: 

you need mol files, either you write yours or you take them from the library and you put them in the same folder as quiner-mod.sh
https://github.com/chorasimilarity/chemlambda-gui/tree/gh-pages/dynamic/mol 

Once all this is set up, do:

bash quiner-mod.sh

you'll see the list of mol files (from your folder) and you write the name of your file.mol and hit enter.

You'll see that file.html appeared in your folder. Open it with a browser.

If you want to change parameters, then open with a text editor quiner-mod.awk and modify the parameters between the lines 16-80. Don't touch the other parameters if you don't understand them.


In order to use the hacked universal visualizer then: 

you need the simulations, download the collection of simulations from https://figshare.com/articles/The_Chemlambda_collection_of_simulations/4747390

then, in the same folder which keeps the 1GB of simulations, put the files from here: getmoves.sh, univision.js, universal.html, modifier.awk and cc-by-4-0.png. 

do: 

bash getmoves.sh

you'll see the list of html files (i.e. the simulations), pick one and write the complete name, like say file.html 

hit enter

Open universal.html in a browser!
