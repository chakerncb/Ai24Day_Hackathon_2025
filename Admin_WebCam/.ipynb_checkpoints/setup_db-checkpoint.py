import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="computer_vision"
)
cursor = conn.cursor()


# Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS People (
    id INT PRIMARY KEY,
    name VARCHAR(255)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS dataset (
    id INT PRIMARY KEY,
    image_path VARCHAR(255)
)
""")
conn.commit()

cursor.execute("INSERT INTO People (id, name) VALUES (%s, %s)", (123, "John Doe"))
conn.commit()
