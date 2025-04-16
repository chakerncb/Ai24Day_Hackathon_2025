import insightface
from insightface.app import FaceAnalysis
import numpy as np
import pickle
import os
import cv2

app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

dataset_path = "dataset"
embeddings = []
ids = []
usernames = []

for file in os.listdir(dataset_path):
    if file.endswith(".jpg"):
        file_path = os.path.join(dataset_path, file)
        img = cv2.imread(file_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        faces = app.get(img)

        if faces:
            embedding = faces[0].embedding
            embedding = embedding / np.linalg.norm(embedding)
            embeddings.append(embedding)

            try:
                # Extract userID and username from filename (format: userID.username.sampleNum.jpg)
                filename_parts = os.path.splitext(file)[0].split('.')
                user_id = filename_parts[0]
                username = filename_parts[1]
                
                ids.append(user_id)
                usernames.append(username)
                print(f"✅ Processed: {file} → ID: {user_id}, Username: {username}")
            except IndexError:
                print(f"⚠️ Skipping malformed filename: {file}")
        else:
            print(f"❌ No face detected in: {file}")

# Save embeddings with associated IDs and usernames
with open("trainer/face_embeddings.pkl", "wb") as f:
    pickle.dump({
        "embeddings": embeddings,
        "ids": ids,
        "usernames": usernames,
        "user_details": dict(zip(ids, usernames))  # Create mapping dictionary
    }, f)

print(f"\n🎉 Training complete! Saved {len(ids)} face embeddings.")