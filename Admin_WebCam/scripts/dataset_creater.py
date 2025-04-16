import cv2
import os
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="computer_vision"
    )

def insert_or_update_user(id, name):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Update People table
    cursor.execute("SELECT * FROM People WHERE ID=%s", (id,))
    if cursor.fetchone() is None:
        cursor.execute("INSERT INTO People(ID, Name) VALUES(%s, %s)", (id, name))
    else:
        cursor.execute("UPDATE People SET Name=%s WHERE ID=%s", (name, id))
    
    conn.commit()
    conn.close()

def capture_faces(id, name, samples=50):
    if not os.path.exists('dataset'):
        os.makedirs('dataset')
    
    cam = cv2.VideoCapture(0)
    sample_num = 0
    
    while sample_num < samples:
        ret, img = cam.read()
        if not ret:
            break
            
        sample_num += 1
        cv2.imwrite(f"dataset/User.{id}.{sample_num}.jpg", img)
        cv2.imshow('Capturing Faces', img)
        cv2.waitKey(100)
    
    cam.release()
    cv2.destroyAllWindows()
    print(f"Captured {samples} images of {name}")

if __name__ == "__main__":
    user_id = input("Enter user ID (number): ")
    user_name = input("Enter user name: ")
    
    insert_or_update_user(user_id, user_name)
    capture_faces(user_id, user_name)