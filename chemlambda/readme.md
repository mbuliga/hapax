This folder contains a variant of the quiner program from 

https://github.com/chorasimilarity/chemlambda-gui/blob/gh-pages/dynamic/README.md

In order to use it: 

you need mol files, either you write yours or you take them from the library and you put them in the same folder as quiner-mod.sh
https://github.com/chorasimilarity/chemlambda-gui/tree/gh-pages/dynamic/mol 

Once all this is set up, do:

bash quiner-mod.sh

you'll see the list of mol files (from your folder) and you write the name of your file.mol and hit enter.

You'll see that file.html appeared in your folder. Open it with a browser.

If you want to change parameters, then open with a text editor quiner-mod.awk and modify the parameters between the lines 16-80. Don't touch the other parameters if you don't understand them.
