import os
import cv2
import numpy as np
import insightface
import pickle
from insightface.app import FaceAnalysis

def train_model():
    # Initialize face analysis
    app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
    app.prepare(ctx_id=0, det_size=(320, 320))

    # Prepare storage
    face_embeddings = []
    face_ids = []

    # Process dataset
    dataset_path = "dataset"
    for filename in os.listdir(dataset_path):
        if filename.startswith("User.") and filename.endswith(".jpg"):
            try:
                # Extract ID from filename (User.ID.NUM.jpg)
                user_id = int(filename.split('.')[1])
                img_path = os.path.join(dataset_path, filename)
                
                img = cv2.imread(img_path)
                if img is None:
                    continue
                    
                faces = app.get(img)
                if len(faces) == 1:  # Only use images with exactly one face
                    face = faces[0]
                    embedding = face.embedding / np.linalg.norm(face.embedding)
                    face_embeddings.append(embedding)
                    face_ids.append(user_id)
            except Exception as e:
                print(f"Skipping {filename}: {str(e)}")

    # Save trained data
    trained_data = {
        "embeddings": face_embeddings,
        "ids": face_ids  # Store IDs only, names will come from database
    }
    
    if not os.path.exists("trainer"):
        os.makedirs("trainer")
        
    with open("trainer/face_embeddings.pkl", "wb") as f:
        pickle.dump(trained_data, f)
    
    print(f"Training complete! Saved {len(face_embeddings)} face embeddings")

if __name__ == "__main__":
    train_model()