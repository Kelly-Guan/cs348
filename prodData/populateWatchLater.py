import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

db = pd.read_csv("watch_later.csv", low_memory = False)

for index, row in db.iterrows():
    uid = row[0]
    mid = row[1]

    formatted = f"INSERT INTO watch_later (uid, mid) VALUES({uid}, {mid});"
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()