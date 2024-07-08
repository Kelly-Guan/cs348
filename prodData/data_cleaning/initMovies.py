import pandas as pd
import ast

csv_file_path = ''
df = pd.read_csv(csv_file_path, low_memory=False)

def extract_collection_name(collection):
    try:
        if pd.isna(collection):
            return None
        collection_dict = ast.literal_eval(collection)
        return collection_dict.get('name', None)
    except (ValueError, SyntaxError, AttributeError):
        return None

df['collection_name'] = df['belongs_to_collection'].apply(extract_collection_name)

selected_columns = ['title', 'release_date', 'runtime', 'overview', 'poster_path','id']
result_df = df[selected_columns]

result_df['movieId'] = None

result_df = result_df.dropna(subset=selected_columns)
result_df['runtime'] = result_df['runtime'].astype(int)
result_df['release_date'] = result_df['release_date'].apply(lambda x: f"'{x}'")


result_df = result_df[['movieId'] + selected_columns]
result_df.columns = ['mid', 'title', 'release_date', 'runtime', 'description', 'poster_link','credit_link_id']


# print(result_df)

# result_df.to_csv('cleanedMovies.csv', index=False)
