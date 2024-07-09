import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

db = pd.read_csv("watched.csv", low_memory = False)

for index, row in db.iterrows():
    uid = row[0]
    mid = row[1]
    date_watched = row[2]

    formatted = f"INSERT INTO watched (uid, mid, date_watched) VALUES({uid}, {mid},'{date_watched}');"
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()