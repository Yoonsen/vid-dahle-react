import shutil
import os

# Source and destination paths
source_dir = "/mnt/disk1/Github/VID-Dahle/vid_app/card_app/assets/images/jpg_files"
dest_dir = "public/images/jpg_files"

# Create destination directory if it doesn't exist
os.makedirs(dest_dir, exist_ok=True)

# Copy all jpg files
for filename in os.listdir(source_dir):
    if filename.endswith('.jpg'):
        source_path = os.path.join(source_dir, filename)
        dest_path = os.path.join(dest_dir, filename)
        shutil.copy2(source_path, dest_path)
        print(f"Copied {filename}")

print("Image copy complete!") 