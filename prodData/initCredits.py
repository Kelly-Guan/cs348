import pandas as pd
import ast

csv_file_path = ''


df = pd.read_csv(csv_file_path, low_memory=False)

output_data = []

def process_credits(credits, mid, role):
    credits_list = ast.literal_eval(credits)
    for credit in credits_list:
        name = f"'{credit.get('name')}'"
        character = f"'{credit.get('character')}'" if role == 'actor' else 'NULL'
        formatted_role = f"'{role}'"
        output_data.append({'mid': mid, 'name': name, 'role': formatted_role, 'character': character})

for index, row in df.iterrows():
    mid = row['id']
    if pd.notna(row['cast']):
        process_credits(row['cast'], mid, 'actor')
    if pd.notna(row['crew']):
        process_credits(row['crew'], mid, 'crew')

output_df = pd.DataFrame(output_data)

output_df = output_df[['mid', 'name', 'role', 'character']]

print(output_df)
# output_df.to_csv('cleanedCredits.csv', index=False)


