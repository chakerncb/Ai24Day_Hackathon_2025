import cv2
import numpy as np
import insightface
import pickle
import mysql.connector
from insightface.app import FaceAnalysis

# Database Configuration
def get_db_connection():
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="computer_vision"
        )
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Initialize face detection model
app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(320, 320))  # Smaller size for faster processing

def load_face_data():
    """Load embeddings and IDs, then get names from database"""
    try:
        with open("trainer/face_embeddings.pkl", "rb") as f:
            data = pickle.load(f)
        
        # Connect to database to get names
        conn = get_db_connection()
        if conn is None:
            return np.array([]), []
            
        cursor = conn.cursor()
        
        # Create name mapping from database
        cursor.execute("SELECT id, name FROM People")
        id_to_name = {str(row[0]): row[1] for row in cursor.fetchall()}
        
        # Map IDs to names
        known_names = [id_to_name.get(str(id), "Unknown") for id in data["ids"]]
        
        conn.close()
        return np.array(data["embeddings"]), known_names
        
    except Exception as e:
        print(f"Error loading face data: {e}")
        return np.array([]), []

known_embeddings, known_names = load_face_data()

def recognize_faces():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Convert to RGB once (more efficient)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = app.get(rgb_frame)
        
        for face in faces:
            bbox = face.bbox.astype(int)
            cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0, 255, 0), 2)
            
            if len(known_embeddings) > 0:
                embedding = face.embedding / np.linalg.norm(face.embedding)
                similarities = np.dot(known_embeddings, embedding)
                best_match = np.argmax(similarities)
                
                if similarities[best_match] > 0.5:  # Confidence threshold
                    display_name = known_names[best_match]
                    cv2.putText(
                        frame, 
                        display_name, 
                        (bbox[0], bbox[1]-10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 
                        0.7, 
                        (0, 255, 0), 
                        2
                    )
                else:
                    cv2.putText(
                        frame, 
                        "Unknown", 
                        (bbox[0], bbox[1]-10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 
                        0.7, 
                        (0, 0, 255), 
                        2
                    )

        cv2.imshow("Face Recognition", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    recognize_faces()