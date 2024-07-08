1) Add temp columns to credits, genres, movies
```sql
ALTER TABLE movies
ADD temp_id INT;

ALTER TABLE credits 
ADD temp_id INT
FOREIGN KEY (temp_id) REFERENCES movies(temp_id);

ALTER TABLE genres
ADD temp_id INT
FOREIGN KEY (temp_id) REFERENCES movies(temp_id)
```
2) insert all movies (cleaned_movies) change name before
3) select all movies mid, temp_id combos
```sql
SELECT mid, temp_id FROM movies;
```
4) replace all instances of temp_id with correct mid in  


