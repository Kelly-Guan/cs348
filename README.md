# Limelight
---
Group members:
- Arjun Walia
- Andrew Jia
- Hudson Koyanagi
- Kelly Guan
- Lindsay Zhang

## Setup
This project relies on Node.js, a Docker container and the PostgreSQL cli.

Please download Docker from their website (https://www.docker.com/get-started/).

PostgreSQL and Node.js can be download from most package managers or from their website.

\* Note: these scripts have only been tested on mac and while they'll probably work on most UNIX machines, they will definitely not work on Windows without WSL

1) Run  ```docker-compose -f compose.yaml up``` in the root dir of the project

Sample Data:cd sampleData && chmod +x init_sample.sh && ./init_sample.sh
2) Run `````` which will initialise the database with the test data

Production Data:
2) Run ```cd prodData && chmod +x init_prod.sh && ./init_prod.sh``` which will initialise the database with the production data
(note: you will need python and the pygopg2 and pandas libraries to run this script) 

3) Run ```cd ../backend && npm i```
4) Run ```cd ../frontend && npm i```
 

## Running the App
1) Ensure the Docker container is running in the desktop app or cli
2) run ```cd frontend && npm run start```
3) run ```cd backend && node server.js``` (in another terminal instance)

## Misc

Dataset: https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset 


# Frontend todos:

- Movie button/pop up breaks with no image
- Functionality for Creating Reviews, up/down voting reviews, unfollowing and following users
- Search functionality for both users and films
- The screen that comes up for when you search for a user/film and its possible results
- "Other Users Page" - looks identical to "Your profile", invoked when you click on a user profile
- All ui elements for the all other functionalities, i.e the 'Content' Component. As for some features we just display mids
- Explore Page
