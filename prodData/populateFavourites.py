import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

db = pd.read_csv("favourites.csv", low_memory = False)

for index, row in db.iterrows():
    uid = row[0]
    mid = row[1]
    rank = row[2]

    formatted = f"INSERT INTO favourites (uid, mid, rank) VALUES({uid}, {mid},{rank});"
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()