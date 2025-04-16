import cv2
import mysql.connector
import os

# Function to insert/update database
def insertOrUpdate(Id, Name):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="computer_vision"
    )
    cursor = conn.cursor()

    # Insert image path into dataset table
    image_path = f"dataset/User.{Id}.jpg"
    cursor.execute("INSERT INTO dataset (id, image_path) VALUES (%s, %s)", (Id, image_path))
    conn.commit()

    # Check if user exists
    cursor.execute("SELECT * FROM People WHERE ID=%s", (Id,))
    isRecordExist = cursor.fetchone()

    if isRecordExist is None:
        cursor.execute("INSERT INTO People(ID, Name) VALUES(%s, %s)", (Id, Name))
    else:
        cursor.execute("UPDATE People SET Name=%s WHERE ID=%s", (Name, Id))

    conn.commit()
    conn.close()

# Create dataset directory if not exists
if not os.path.exists('dataset'):
    os.makedirs('dataset')

# Get user input
id = input('Enter user ID: ')
name = input('Enter user name: ')
insertOrUpdate(id, name)

# Start video capture
cam = cv2.VideoCapture(0)

sampleNum = 0
while sampleNum < 50:  # Capture 50 face images
    ret, img = cam.read()
    if not ret:
        break

    # Save face images with full path
    sampleNum += 1
    image_path = f"dataset/User.{id}.{sampleNum}.jpg"
    cv2.imwrite(image_path, img)

    cv2.imshow('Face Capture', img)
    cv2.waitKey(100)

cam.release()
cv2.destroyAllWindows()