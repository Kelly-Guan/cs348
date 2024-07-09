import psycopg2
import pandas as pd
import random 
import string 

conn = psycopg2.connect(host="127.0.0.1",
                        user="postgres",
                        password="postgres",
                        port="5432")
cursor = conn.cursor()

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

email_handles =["hotmail.com", "gmail.com", "yahoo.ca", "uwaterloo.ca", "outlook.ca"]

fn = pd.read_csv("first-name-database.csv", low_memory = False)
ln = pd.read_csv("surname-database.csv", low_memory = False)

for index, row in ln.iterrows():
    first_name = fn.iloc[index, 0]
    last_name = row[0]
    username = first_name[0:1].lower() +str(index)+ last_name.lower()
    email = username + "@" + random.choice(email_handles)
    password = generate_random_string(random.randrange(8, 15))

    formatted = f"INSERT INTO users (uid, first_name, last_name, username, email, password) VALUES({index+100}, '{first_name}', '{last_name}', '{username}', '{email}', '{password}');"
    print(formatted)
    try:
        cursor.execute(formatted)
    except Exception as e:
        print(e)
        quit()

conn.commit()
conn.close()