import pandas as pd
import json
import os
import ast

# Read the Excel file
excel_path = "/mnt/disk1/Github/VID-Dahle/vid_app/card_app/data/combined.xlsx"
df = pd.read_excel(excel_path)

# Clean up the data
df = df.fillna('')  # Replace NaN with empty string

# Convert codes from string representation of list to actual list
df['codes'] = df['codes'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) and x.startswith('[') else x)

# Convert numeric fields to strings
df['publication_year'] = df['publication_year'].astype(str)
df['year'] = df['year'].astype(str)
df['year_end'] = df['year_end'].astype(str)

# Convert to JSON
json_data = df.to_dict(orient='records')

# Create output directory if it doesn't exist
os.makedirs('public/data', exist_ok=True)

# Write to JSON file
with open('public/data/cards.json', 'w', encoding='utf-8') as f:
    json.dump(json_data, f, ensure_ascii=False, indent=2)

print("Conversion complete! JSON file created at public/data/cards.json") 