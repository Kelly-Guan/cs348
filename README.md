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

1) Run  ```docker-compose -f compose.yaml up``` in the root dir of the project
2) Run ```cd sampleData && chmod +x init.sh && ./init.sh``` which will initialise the database with the test data
3) Run ```cd ../backend && node i```
4) Run ```cd ../frontend && node i```


## Running the App
1) Ensure the Docker container is running in the desktop app or cli
2) run ```cd frontend && npm run start```
3) run ```cd backend && node server.js``` (in another terminal instance)

## Misc

Dataset: https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset 