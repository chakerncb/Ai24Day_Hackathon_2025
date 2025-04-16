import cv2
import mysql.connector
import os

def insert_or_update(user_id, username):
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="computer_vision"
        )
        cursor = conn.cursor()

        # Ensure the dataset table entry is inserted
        image_path = f"dataset/{user_id}.{username}.jpg"
        cursor.execute("INSERT INTO dataset (id, image_path) VALUES (%s, %s) ON DUPLICATE KEY UPDATE image_path=%s", (user_id, image_path, image_path))
        conn.commit()

        # Check if the user exists in the People table
        cursor.execute("SELECT * FROM People WHERE id = %s", (user_id,))
        is_record_exist = cursor.fetchone()

        if is_record_exist is None:
            # Insert new user with an initial session number of 1
            cursor.execute("INSERT INTO People (id, name, session_number) VALUES (%s, %s, %s)", (user_id, username, 1))
        else:
            # Increment session number for the existing user
            current_session = is_record_exist[2] if is_record_exist[2] else 0
            new_session_number = current_session + 1
            cursor.execute("UPDATE People SET name = %s, session_number = %s WHERE id = %s", (username, new_session_number, user_id))

        conn.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Ensure dataset directory exists
if not os.path.exists('dataset'):
    os.makedirs('dataset')

# Input user details
user_id = input('Enter user ID (e.g., 001): ')
username = input('Enter user name (e.g., john_doe): ')
insert_or_update(user_id, username)

# Initialize webcam
cam = cv2.VideoCapture(0)
sample_num = 0

try:
    while sample_num < 50:
        ret, img = cam.read()
        if not ret:
            print("Failed to capture image. Exiting...")
            break

        sample_num += 1
        # Save image as userID.username.sampleNum.jpg
        image_path = f"dataset/{user_id}.{username}.{sample_num}.jpg"
        cv2.imwrite(image_path, img)

        cv2.imshow('Face Capture', img)
        if cv2.waitKey(100) & 0xFF == ord('q'):
            print("Process terminated by user.")
            break
except Exception as e:
    print(f"Error during image capture: {e}")
finally:
    # Release camera and close windows
    cam.release()
    cv2.destroyAllWindows()
