import psycopg2
from psycopg2 import sql
import uuid


class DataBase:
    def __init__(self, connection_parameters) -> None:
        # Establish a connection to the database
        try:
            self.conn = psycopg2.connect(**connection_parameters)
            self.conn.autocommit = True
            print("Connected to database")
        except psycopg2.Error as e:
            print("Unable to connect to the database:", e)
            exit()

        # Create a cursor object using the connection
        self.cur = self.conn.cursor()
        self.create_model_data_table()

    def create_model_data_table(self):
        # Define the SQL statement to create the table
        create_table_query = """
            CREATE TABLE IF NOT EXISTS model_data (
                model_id VARCHAR(36) PRIMARY KEY,
                model_did VARCHAR(255) UNIQUE NOT NULL,
                base_model VARCHAR(255) NOT NULL,
                prompt TEXT NOT NULL
            );
        """

        # Execute the SQL statement
        try:
            self.cur.execute(create_table_query)
            print("Table created successfully (if it didn't exist)")
        except psycopg2.Error as e:
            print("Error executing create table query:", e)

        # Commit the transaction
        self.conn.commit()

    def drop_table(self):
        # Define the SQL statement to drop the table
        drop_table_query = """
            DROP TABLE IF EXISTS model_data;
        """

        # Execute the SQL statement
        try:
            self.cur.execute(drop_table_query)
            print("Table dropped successfully")
        except psycopg2.Error as e:
            print("Error dropping table:", e)

        # Commit the transaction
        self.conn.commit()

    def insert_data(self, model_id, model_did, base_model, prompt):
        # Define the SQL statement to insert data into the table
        insert_query = """
            INSERT INTO model_data (model_id, model_did, base_model, prompt) 
            VALUES (%s, %s, %s, %s);
        """
        
        # Execute the SQL statement
        try:
            self.cur.execute(insert_query, (model_id, model_did, base_model, prompt))
            print("Data inserted successfully")
        except psycopg2.Error as e:
            print("Error inserting data:", e)

        # Commit the transaction
        self.conn.commit()
        return model_id
    
    def show_all_data(self):
        # Define the SQL statement to select all data from the table
        select_query = """
            SELECT * FROM model_data;
        """

        # Execute the SQL statement
        try:
            self.cur.execute(select_query)
            rows = self.cur.fetchall()
            if not rows:
                print("No data found in the table")
            else:
                for row in rows:
                    print(row)
        except psycopg2.Error as e:
            print("Error retrieving data:", e)

    def get_all_model_ids(self):
        # Define the SQL statement to select all model IDs from the table
        select_query = """
            SELECT model_id FROM model_data;
        """

        # Execute the SQL statement
        try:
            self.cur.execute(select_query)
            rows = self.cur.fetchall()
            model_ids = [row[0] for row in rows]
            return model_ids
        except psycopg2.Error as e:
            print("Error retrieving model IDs:", e)
            return []
        
    def get_model_info_by_id(self, model_id):
        # Define the SQL statement to select the prompt and base_model for a given model_id
        select_query = """
            SELECT model_did, prompt, base_model FROM model_data WHERE model_id = %s;
        """

        # Execute the SQL statement
        try:
            self.cur.execute(select_query, (model_id,))
            row = self.cur.fetchone()
            if row:
                model_did, prompt, base_model = row
                return {"model_did": model_did, "prompt": prompt, "base_model": base_model}
            else:
                print(f"No data found for model_id {model_id}")
                return None
        except psycopg2.Error as e:
            print("Error retrieving model info:", e)
            return None
        
    def delete_by_model_id(self, model_id):
        # Define the SQL statement to delete a row by model_id
        delete_query = """
            DELETE FROM model_data WHERE model_id = %s;
        """

        # Execute the SQL statement
        try:
            self.cur.execute(delete_query, (model_id,))
            print(f"Data with model_id {model_id} deleted successfully")
        except psycopg2.Error as e:
            print("Error deleting data:", e)

        # Commit the transaction
        self.conn.commit()

    def __del__(self):
        # Close the cursor and connection
        self.cur.close()
        self.conn.close()

if __name__ == "__main__":
    from dotenv import load_dotenv
    import os
    load_dotenv()

    # Database connection parameters
    connection_parameters = {
        'user': os.getenv("POSTGRES_USER"),
        'password': os.getenv("POSTGRES_PASSWORD"),
        'host': os.getenv("POSTGRES_HOST"),
        'port': os.getenv("POSTGRES_PORT"),
        'database': os.getenv("POSTGRES_DB")
    } 

    db = DataBase(connection_parameters)
    # db.drop_table()
    # db.insert_data("mistralai/mistral-7b-instruct:free", "Act like a professional personal assistant")
    db.show_all_data()
    print(f"Model IDs : {db.get_all_model_ids()}")
    # print(f"Model info: {db.get_model_info_by_id(db.get_all_model_ids()[0])}")