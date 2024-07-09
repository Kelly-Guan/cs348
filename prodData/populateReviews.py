import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

db = pd.read_csv("generated_reviews.csv", low_memory = False)

for index, row in db.iterrows():
    uid = row[0]
    mid = row[1]
    score = row[2]
    rating_text = row[3]
    date_posted = row[4]

    formatted = f"INSERT INTO ratings (uid, mid, score, rating_text, date_posted) VALUES({uid}, '{mid}', '{score}', {rating_text}, '{date_posted}');"
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()