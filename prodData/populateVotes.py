import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

db = pd.read_csv("GeneratedVotes.csv", low_memory = False)

for index, row in db.iterrows():
    voter_uid = row[0]
    reviewer_uid = row[1]
    mid = row[2]
    vote = row[3]

    formatted = f"INSERT INTO votes (voter_uid, reviewer_uid, mid, vote) VALUES({voter_uid}, {reviewer_uid}, {mid}, '{vote}');"
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()