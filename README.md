# DeliverMe

This project explores the Multiple Travelling Salesman Problem, and is solved using a Genetic Algorithm. Ideas researched from:

https://ieeexplore.ieee.org/document/6181716

A bit of an introductory optimization project, exploring ways how map and delivery optimizations might be implemented.

Inspired by ridiculous gas prices ❤️

## Background

This app has a simple use case. Users can specify Destinations (Places to drive to, i.e. nodes in the graph) and Initial Locations of Cars (Places that the cars start, i.e. where the salesmen start). Destinations must be unique, while Initial Locations of Cars do not need to be. 

Please be patient on the first run, the API is hosted on a free Heroku dyno so it does have that initial spinup delay.

### Algorithm and Design Choices

The algorithm used is a Genetic Algorithm, a metaheuristic inspired by the concept of natural selection. Populations are randomly generated and rearranged for a certain number of iterations. At the end of this number of iterations, parents are selected based on a fitness function to generate the next generation (next iteration of a population). Eventually, the most optimal route as determined by the same fitness function is returned.

Note that these distances are not actually route distances as retrieved from Google maps – if every path were to be queried, n destinations would result in n(n-1)/2 calls, which was a bit too expensive for this project's scope. Instead, the manhattan distance of each pair of coordinates is taken (ie. abs(lat - lat) + abs(lng - lng)) as to better align with the up-down and left-right orientations of roads within a smaller scale.
