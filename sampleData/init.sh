psql postgres://postgres:postgres@127.0.0.1:5432 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
rm master.sql
# Assumes you have already run docker compose and postgres is running
cat ./schema/movies.sql  ./schema/genre.sql ./schema/users.sql ./schema/watched.sql >> master.sql
for file in ./schema/*.sql; do
  if [ "$file" != "./schema/genre.sql" ] && [ "$file" != "./schema/movies.sql" ] && [ "$file" != "./schema/users.sql" ] && [ "$file" != "./schema/watched.sql" ]; then
    cat "$file" >> master.sql
  fi
done

psql postgres://postgres:postgres@127.0.0.1:5432 -f master.sql

