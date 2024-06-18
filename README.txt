Initialize npm projects:
  cd frontend
  npm i
  cd ../backend
  npm i

Initialize docker:
  install docker from their website
  docker-compose -f compose.yaml up

Add data to databse:
  cd sampleData/inserts
  psql postgres://postgres:postgres@127.0.0.1:5432 -f movies.sql
  psql postgres://postgres:postgres@127.0.0.1:5432 -f users.sql


Running the project:

  cd backend
  node server.js
  (in a seperate terminal instance)
  cd frontend
  npm run start
  

Dataset source: https://www.kaggle.com/datasets/azathoth42/myanimelist/discussion

