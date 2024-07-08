import psycopg2
import pandas as pd

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()


def create_dict_from_file(file_path):
    result_dict = {}
    
    with open(file_path, 'r') as file:
        lines = file.readlines()
        
        for line in lines[2:]:  # Skip the first two header lines
            parts = line.strip().split('|')
            if len(parts) == 2:
                mid = parts[0].strip()
                credit_link_id = parts[1].strip()
                result_dict[credit_link_id] = mid
    
    return result_dict

pairs = create_dict_from_file('pairs.txt')

df = pd.read_csv("reallyCleanGenres.csv", low_memory=False)

for index, row in df.iterrows():
    cli = row['credit_link_id']
    genre = row["genre"]
    cursor.execute("INSERT INTO genres (mid, genre) VALUES(%s, %s)", [pairs[cli], genre])

df = pd.read_csv("reallyCleanCredits.csv", low_memory=False)
for index, row in df.iterrows():
    cli = row['credit_link_id']
    name = row["name"]
    role = row["character"]
    character = row["character"]
    cursor.execute("INSERT INTO movie_cast (mid, name, role, character) VALUES(%s, %s, %s, %s)", [pairs[cli], name, role, character])