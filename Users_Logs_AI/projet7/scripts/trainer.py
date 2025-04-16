import insightface
from insightface.app import FaceAnalysis
import numpy as np
import pickle
import os
import cv2

# Initialize FaceAnalysis app
app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

# Dataset folder path
dataset_path = "dataset"
if not os.path.exists(dataset_path):
    print("❌ Dataset folder does not exist!")
    exit(1)

# Prepare to collect embeddings, IDs, and usernames
embeddings = []
ids = []
usernames = []

for file in os.listdir(dataset_path):
    if file.endswith(".jpg"):
        file_path = os.path.join(dataset_path, file)
        img = cv2.imread(file_path)
        if img is None:
            print(f"⚠️ Could not read image file: {file}")
            continue

        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faces = app.get(img)

        if faces:
            embedding = faces[0].embedding
            embedding = embedding / np.linalg.norm(embedding)
            embeddings.append(embedding)

            try:
                # Extract userID and username from filename (format: userID.username.sampleNum.jpg)
                filename_parts = os.path.splitext(file)[0].split('.')
                if len(filename_parts) < 3:  # Ensure filename structure is correct
                    raise ValueError("Malformed filename structure")
                user_id = filename_parts[0]
                username = filename_parts[1]

                ids.append(user_id)
                usernames.append(username)
                print(f"✅ Processed: {file} → ID: {user_id}, Username: {username}")
            except ValueError as ve:
                print(f"⚠️ Skipping malformed filename: {file} - {ve}")
        else:
            print(f"❌ No face detected in: {file}")

# Ensure there is data to save
if len(ids) > 0:
    # Save embeddings, IDs, and usernames as a pickle file
    os.makedirs("trainer", exist_ok=True)
    with open("trainer/face_embeddings.pkl", "wb") as f:
        pickle.dump({
            "embeddings": embeddings,
            "ids": ids,
            "usernames": usernames,
            "user_details": dict(zip(ids, usernames))  # Create mapping dictionary
        }, f)

    print(f"\n🎉 Training complete! Saved {len(ids)} face embeddings.")
else:
    print("❌ No valid data to save. Training aborted.")
