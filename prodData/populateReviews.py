import psycopg2
import pandas as pd
import random 
import string 

db = pd.read_csv("generated_reviews.csv", low_memory = False)

for index, row in db.iterrows():
    uid = db[0]
    mid = db[1]
    score = db[2]
    rating_text = db[3]
    date_posted = db[4]

    formatted = f"INSERT INTO ratings (uid, mid, score, ratubg_text, date_posted) VALUES({}, '{first_name}', '{last_name}', '{username}', '{email}', '{password}');"
    print(formatted)
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()