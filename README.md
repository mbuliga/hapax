# Project hapax (aka "made of money")

## Questions:

Can we build everything from  money (minted tokens)?  

Can we build private computing systems, which are ἄπαξ χέων, which means "poured only once"?


## Main idea:

As explained first in 

Buliga, Marius (2018): Chemlambda strings. figshare. Journal contribution. https://doi.org/10.6084/m9.figshare.5751318.v1

then in 

M. Buliga, Artificial life properties of directed interaction combinators vs. chemlambda. 
https://arxiv.org/abs/2005.06060

it is possible to express a graph rewrite as a chemical reaction of the form 

(LEFT PATTERN) + (TOKEN_1) + (ENZYME) = (RIGHT PATTERN) + (TOKEN_2) + (ENZYME)

Here the tokens are small graphs from a pre-defined family. They are used to have a conservative chemical reaction. In the presence of tokens the graph rewrite appears as a permutation of the half-edges of the graph pattern. 

We can see the tokens as a form of money bricks which are used for universal computation. Verbatim, each program is a graph "made of money" and the (decentralized) execution of the program is a process of money (tokens) exchanges. 

As this is one of the chemlambda projects 

https://chemlambda.github.io/index.html

the relation with chemlambda comes from the problem of naming links in chemlambda graphs (molecules). Minted tokens are a solution for this problem. 

## Goal of hapax

We treat in a unitary way a large family of asynchronous graph rewriting automata, by encoding a graph rewrite as a permutation of the ends of the edges of a graph. A local rewrite, i.e. one which involves a small number of nodes and edges, is then encoded as a small permutation. 

By varying the permutation we can vary the graph rewrite. As an example, there are 14400 variants of the iconic beta rewrite: 
https://mbuliga.github.io/hapax/betarand.html
 
 
 
 
## Relevant links

- Chemlambda and hapax: https://mbuliga.github.io/hapax/chemlambda-and-hapax.html 

 explains the mol notation and the encoding of graph rewrites as permutations; discusses differences from chemlambda

- Ackermann(2,2) with hapax: https://mbuliga.github.io/hapax/hapax-ack.html

- 9_quine with hapax: https://mbuliga.github.io/hapax/hapax-9quine.html

  two pages which use the js library

- slides: http://imar.ro/~mbuliga/genchem.html

  a presentation of the general ideas, towards the end relevant to hapax

- the folder chemlambda: https://github.com/mbuliga/hapax/tree/master/chemlambda

  contains the essentials of chemlambda-v2, which is used as an example with hapax
