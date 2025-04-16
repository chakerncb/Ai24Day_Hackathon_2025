import insightface
from insightface.app import FaceAnalysis
import numpy as np
import pickle
import os
import cv2  # Import OpenCV for image loading

# Initialize InsightFace model
app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

dataset_path = "dataset"
embeddings = []
ids = []

# Process each image in the dataset
for file in os.listdir(dataset_path):
    if file.endswith(".jpg"):
        img = cv2.imread(os.path.join(dataset_path, file))  # Fix: Use OpenCV instead of load_image
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Ensure correct color format for InsightFace
        
        faces = app.get(img)  # Get face embeddings
        
        if faces:
            embeddings.append(faces[0].embedding)  # Extract face feature vector
            ids.append(file.split(".")[1])  # Extract user ID from filename

# Save embeddings for recognition
with open("trainer/face_embeddings.pkl", "wb") as f:
    pickle.dump({"embeddings": embeddings, "ids": ids}, f)

print("Training complete!")