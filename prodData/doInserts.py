import psycopg2

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


file_path = 'pairs.txt'
result_dict = create_dict_from_file(file_path)

df = pd.read_csv("reallyCleanGenre.csv", low_memory=False)

for index, row in df.iterrows():
    cli = row['credit_link_id']
    genre = row["genre"]
    cursor.execute("INSERT INTO genres ()")