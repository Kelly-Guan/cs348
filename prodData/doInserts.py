import psycopg2
import pandas as pd
import math

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

# for index, row in df.iterrows():
#     cli = str(row[0])
#     genre = row[1]
#     if cli in pairs:
#         # print("INSERT INTO genres (mid, genre) VALUES(%s, %s)", [pairs[cli], genre])
#         try:
#             cursor.execute("INSERT INTO genres (mid, genre) VALUES(%s, %s)", [pairs[cli], genre])
#         except:
#             continue

df = pd.read_csv("reallyCleanCredits.csv", low_memory=False)
for index, row in df.iterrows():
    cli = str(row[0])
    name = row[1]
    role = row[2]
    character = row[3]
    try: 
        if(type(character) == float):
            formatted = f"INSERT INTO movie_cast (mid, name, role, character) VALUES({pairs[cli]}, '{name}', '{role}', NULL);"
        else:
            formatted = f"INSERT INTO movie_cast (mid, name, role, character) VALUES({pairs[cli]}, '{name}', '{role}', '{character}');"
        cursor.execute(formatted)
    except Exception as e: 
        print("error",e)
        print(formatted)
        # continue
        quit()

