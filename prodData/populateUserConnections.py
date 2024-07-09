import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

db = pd.read_csv("user_connections.csv", low_memory = False)

for index, row in db.iterrows():
    following_uid = row[0]
    follower_uid = row[1]

    formatted = f"INSERT INTO user_connections (following_uid, follower_uid) VALUES({following_uid}, {follower_uid});"
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()