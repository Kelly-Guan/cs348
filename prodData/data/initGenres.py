import pandas as pd
import ast

csv_file_path = ''

df = pd.read_csv(csv_file_path, low_memory=False)

genres_data = []
uniq = {}

def process_genres(genres, mid):
    genres_list = ast.literal_eval(genres)
    for genre in genres_list:
        genre_name = f"'{genre.get('name')}'"
        genres_data.append({'mid': mid, 'genre': genre_name})
        uniq.update(genre_name)

for index, row in df.iterrows():
    mid = row['id']
    if pd.notna(row['genres']):
        process_genres(row['genres'], mid)

genres_df = pd.DataFrame(genres_data)
print(uniq);

# print(genres_df)

# genres_df.to_csv('cleanedGenres.csv', index=False)
