import psycopg2
import pandas as pd
import random
from datetime import datetime, timedelta

def generate_random_timestamp(start_date, end_date):

    start_datetime = datetime.strptime(start_date, "%Y-%m-%d")
    end_datetime = datetime.strptime(end_date, "%Y-%m-%d")

    random_seconds = random.randint(0, int((end_datetime - start_datetime).total_seconds()))
    random_timestamp = start_datetime + timedelta(seconds=random_seconds)
    
    return random_timestamp.strftime("%Y-%m-%d %H:%M:%S")

pos = pd.read_csv("movie_reviews.csv")
neg = pd.read_csv("negative_movie_reviews.csv")

with open("generated_reviews.csv", "w") as file:
    # Write the header
    file.write("uid,mid,score,rating_text,date_posted\n")

    for index in range(100, 13880):
        start_date = "2024-01-01"
        end_date = "2024-12-31"

        uid = index

        for i in range(index % 7):
            mid = random.randrange(1, 20000)
            score = random.randrange(3, 5)
            rating_text = pos.iloc[random.randint(0, len(pos) - 1), 0]
            date_posted = generate_random_timestamp(start_date, end_date)

            formatted = f"{uid},{mid},{score},{rating_text},{date_posted}\n"
            file.write(formatted)

        for i in range(index % 4):
            mid = random.randrange(1, 20000)
            score = random.randrange(0, 2)
            rating_text = neg.iloc[random.randint(0, len(neg) - 1), 0]
            date_posted = generate_random_timestamp(start_date, end_date)

            formatted = f"{uid},{mid},{score},{rating_text},{date_posted}\n"
            file.write(formatted)