# Nevermind Chat Backend server

## Setup
1. Install Poetry
2. Install dependencies: poetry install
3. Run poetry shell to activate the virtual environment


# Database
1. Create user:
    ```
    sudo -u postgres psql

    CREATE DATABASE nevermind_db;
    CREATE USER nevermind WITH PASSWORD 'nevermind@12';
    ALTER USER nevermind CREATEDB;
    ALTER USER nevermind CREATEROLE;
    ALTER USER nevermind SUPERUSER;
    GRANT ALL PRIVILEGES ON DATABASE "nevermind_db" TO nevermind;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nevermind;


    \q
    psql -U nevermind -d nevermind_db -h localhost -p 5432

    DROP TABLE IF EXISTS model_data;

    ```

2. Run the server

### Development
```
poetry run uvicorn src.app:app --reload 
```

### Production
```
poetry run gunicorn src.app:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:80
```

3. Proxy using ngrok
```
ngrok http 8000
```