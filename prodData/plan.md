1) Add temp columns to credits, genres, movies
```sql
psql postgres://postgres:postgres@127.0.0.1:5432 -c "ALTER TABLE movies ADD credit_link_id INT;"
```
2) insert all movies (cleaned_movies) change name before
```sh
psql postgres://postgres:postgres@127.0.0.1:5432 -f cleanedMovies.sql
```
3) select all movies mid, temp_id combos
```sql
psql postgres://postgres:postgres@127.0.0.1:5432 -c "SELECT mid, temp_id FROM movies;" > pairs.txt
```
4)

for row in cleanGenres:
    insert into genres (mid, genre) VALUES((SELECT mid FROM movies WHERE credit_link_id=$1), $2); [pairs[row.credi_link_id], genereName]

for row in cleanCast
    insert into movie_cast (mid, name, role, character) VALUES((SELECT mid FROM movies WHERE credit_link_id=$1), $2, $3, $3) [pairs[row.credit_link_id] ...]
5)

psql postgres://postgres:postgres@127.0.0.1:5432 -c "ALTER TABLE movies ADD credit_link_id INT;"
psql postgres://postgres:postgres@127.0.0.1:5432 -f cleanedMovies.sql
psql postgres://postgres:postgres@127.0.0.1:5432 -c "SELECT mid, temp_id FROM movies;" > pairs.txt
node runInserts.js
psql postgres://postgres:postgres@127.0.0.1:5432 -c "ALTER TABLE movies DROP COLUMN credit_link_id;"

