# INIT TABLES
psql postgres://postgres:postgres@127.0.0.1:5432 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
rm master.sql
# Assumes you have already run docker compose and postgres is running
cat ../schema/movies.sql  ../schema/genres.sql ../schema/users.sql ../schema/watched.sql  ../schema/votes.sql >> master.sql
for file in ../schema/*.sql; do
  if [ "$file" != "../schema/genres.sql" ] && [ "$file" != "../schema/movies.sql" ] && [ "$file" != "../schema/users.sql" ] && [ "$file" != "../schema/watched.sql" ] && [ "$file" != "../schema/votes.sql" ]&& [ "$file" != "../schema/reviewer_votes.sql" ]; then
    cat "$file" >> master.sql
  fi
done
psql postgres://postgres:postgres@127.0.0.1:5432 -f master.sql
rm master.sql

rm cleanedMovies2.sql
rm reallyCleanCredits.csv
rm reallyCleanGenres.csv
rm first-name-database.csv
rm surname-database.csv

unzip ProdData.zip

# INSERT MOVIES, GENRES, CREDITS
psql postgres://postgres:postgres@127.0.0.1:5432 -c "ALTER TABLE movies ADD credit_link_id INT;"

psql postgres://postgres:postgres@127.0.0.1:5432 -f cleanedMovies2.sql
psql postgres://postgres:postgres@127.0.0.1:5432 -c "SELECT mid, credit_link_id FROM movies ORDER BY mid ASC;" > pairs.txt
python3 genreInserts.py
python3 creditInserts.py
python3 generateUsers.py
python3 generateRatings.py
python3 populateReviews.py
python3 populateVotes.py
python3 populateUserConnections.py
python3 populateWatched.py
python3 populateWatchLater.py
python3 populateFavourites.py
psql postgres://postgres:postgres@127.0.0.1:5432 -c "ALTER TABLE movies DROP COLUMN credit_link_id;"

psql postgres://postgres:postgres@127.0.0.1:5432 -f ../schema/reviewer_votes.sql

rm pairs.txt
rm *.csv
rm cleanedMovies2.sql
