import cv2
import numpy as np
import insightface
import pickle
import mysql.connector
from datetime import datetime
from insightface.app import FaceAnalysis

# Configuration
MARGIN = 50
MIN_MATCH_SCORE = 0.5
FRAME_SKIP = 2
SEND_COOLDOWN = 5

# Database Configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'computer_vision'
}

class FaceRecognizer:
    def __init__(self):
        self.app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
        self.app.prepare(ctx_id=0, det_size=(320, 320))
        
        # Load trained data
        with open("trainer/face_embeddings.pkl", "rb") as f:
            data = pickle.load(f)
        
        self.known_embeddings = np.array(data["embeddings"])
        self.known_ids = data["ids"]
        self.user_details = data["user_details"]
        
        self.last_sent = {}
        self.frame_count = 0
        self._connect_db()

    def _connect_db(self):
        try:
            self.db_connection = mysql.connector.connect(**DB_CONFIG)
            print("✅ Connected to database")
        except mysql.connector.Error as err:
            print(f"❌ Database connection failed: {err}")
            raise

    def _save_to_db(self, user_id, name, place, confidence):
        if not self.db_connection.is_connected():
            self._connect_db()

        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = """
        INSERT INTO recognition_logs 
        (user_id, name, place, confidence, timestamp) 
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (user_id, name, place, float(confidence), current_time)

        try:
            cursor = self.db_connection.cursor()
            cursor.execute(query, values)
            self.db_connection.commit()
            print(f"✅ Saved: {name} (ID: {user_id}) at {place}")
            cursor.close()
        except mysql.connector.Error as err:
            print(f"❌ Database error: {err}")

    def recognize_faces(self, img):
        h, w = img.shape[:2]
        
        # Define regions
        left_region = img[:, MARGIN:w//2-MARGIN]
        right_region = img[:, w//2+MARGIN:w-MARGIN]
        
        left_result = self._process_region(left_region, "door")
        right_result = self._process_region(right_region, "training_room")
        
        return left_result, right_result

    def _process_region(self, region, place):
        faces = self.app.get(region)
        if not faces:
            return None
        
        face = max(faces, key=lambda f: (f.bbox[2]-f.bbox[0])*(f.bbox[3]-f.bbox[1]))
        embedding = face.embedding / np.linalg.norm(face.embedding)
        
        similarities = np.dot(self.known_embeddings, embedding)
        best_match_idx = np.argmax(similarities)
        match_score = similarities[best_match_idx]
        
        if match_score > MIN_MATCH_SCORE:
            user_id = self.known_ids[best_match_idx]
            username = self.user_details.get(user_id, "Unknown")
            self._send_user_info(user_id, username, place, match_score)
            return (user_id, username, match_score)
        
        return ("Unknown", "Unknown", match_score)

    def _send_user_info(self, user_id, name, place, confidence):
        if user_id == "Unknown":
            return
            
        current_time = datetime.now()
        last_sent_time = self.last_sent.get(user_id)
        
        if last_sent_time and (current_time - last_sent_time).seconds < SEND_COOLDOWN:
            return
            
        self._save_to_db(user_id, name, place, confidence)
        self.last_sent[user_id] = current_time

    def __del__(self):
        if hasattr(self, 'db_connection') and self.db_connection.is_connected():
            self.db_connection.close()
            print("✅ Database connection closed")

def main():
    recognizer = FaceRecognizer()
    cam = cv2.VideoCapture(0)
    cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    
    if not cam.isOpened():
        print("⚠️ Camera not detected!")
        return

    try:
        while True:
            ret, frame = cam.read()
            if not ret:
                print("⚠️ Frame capture failed")
                break
                
            mirrored_frame = cv2.flip(frame, 1)
            recognizer.frame_count += 1
            
            if recognizer.frame_count % FRAME_SKIP != 0:
                cv2.imshow("Face Recognition", mirrored_frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
                continue
                
            rgb_frame = cv2.cvtColor(mirrored_frame, cv2.COLOR_BGR2RGB)
            door_result, training_room_result = recognizer.recognize_faces(rgb_frame)
            
            # Draw UI
            h, w = mirrored_frame.shape[:2]
            door_x1, door_x2 = MARGIN, w//2-MARGIN
            training_x1, training_x2 = w//2+MARGIN, w-MARGIN
            
            cv2.rectangle(mirrored_frame, (door_x1, MARGIN), (door_x2, h-MARGIN), (255, 0, 0), 2)
            cv2.putText(mirrored_frame, "DOOR", (door_x1 + 10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
            
            cv2.rectangle(mirrored_frame, (training_x1, MARGIN), (training_x2, h-MARGIN), (0, 255, 0), 2)
            cv2.putText(mirrored_frame, "TRAINING ROOM", (training_x1 + 10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
            
            # Display results
            if door_result:
                user_id, name, score = door_result
                cv2.putText(mirrored_frame, f"{name} ({score:.2f})", 
                           (door_x1 + 10, 60), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            
            if training_room_result:
                user_id, name, score = training_room_result
                cv2.putText(mirrored_frame, f"{name} ({score:.2f})", 
                           (training_x1 + 10, 60), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            
            cv2.imshow("Face Recognition", mirrored_frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
                
    finally:
        cam.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    main()