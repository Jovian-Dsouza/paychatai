from asyncio.log import logger
import logging
import os
import sys
from io import BytesIO
from dotenv import load_dotenv
load_dotenv()
from pydantic import BaseModel
from fastapi import FastAPI, Response, BackgroundTasks, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from src.openrouterapi import OpenRouter
from src.postgresDB import DataBase
from typing import List, Dict

logging.basicConfig(stream=sys.stdout, level=logging.ERROR)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

bearer_scheme = HTTPBearer()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
APP_URL = os.getenv("APP_URL")
APP_TITLE = os.getenv("APP_TITLE")
BEARER_TOKEN = os.getenv("BEARER_TOKEN") 
assert OPENROUTER_API_KEY is not None
assert BEARER_TOKEN is not None

openRouter = OpenRouter(OPENROUTER_API_KEY, APP_URL, APP_TITLE)

# Database connection parameters
connection_parameters = {
    'user': os.getenv("POSTGRES_USER"),
    'password': os.getenv("POSTGRES_PASSWORD"),
    'host': os.getenv("POSTGRES_HOST"),
    'port': os.getenv("POSTGRES_PORT"),
    'database': os.getenv("POSTGRES_DB")
} 
db = DataBase(connection_parameters)

def validate_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    if credentials.scheme != "Bearer" or credentials.credentials != BEARER_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return credentials


app = FastAPI( title="Awesome AI service",
    summary="Brief summary of your service here",
    description="Full description of your awesome AI model here",
    version="1.0.0",
    dependencies=[Depends(validate_token)]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # Replace * with your frontend's actual origin(s)
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
curl -H "Authorization: Bearer 1234" -X GET "localhost:8000/"
"""
@app.get("/")
def home():
    return "AI Server is running ...."

"""
curl -H "Authorization: Bearer 1234" -X GET "localhost:8000/model_list"
"""
@app.post("/model_list")
def model_list():
    return {"model_list": openRouter.list_models()}


"""
curl -H "Authorization: Bearer 1234"  \
  -X POST "localhost:8000/ai_service/model1" \
  -H 'Content-Type: application/json' \
  -d '{
  "messages": [
      {
          "role": "user",
          "content": "tell me a joke"
      }
  ]
}'
"""
class AIRequest(BaseModel):
    messages: List[Dict[str, str]]

@app.post("/ai_service/{model_id}")
def ai_service(model_id: str, ai_request: AIRequest):
    model_info = db.get_model_info_by_id(model_id)

    if model_info is None or model_info['base_model'] is None:
        raise HTTPException(status_code=404, detail="Base model not found for the specified model_id")
    
    messages = ai_request.messages
    if model_info['prompt'] is not None and model_info['prompt'] != "":
        messages.insert(0, {"role": "system", "content": model_info['prompt']})

    result = openRouter.get_chat(model_info['base_model'], messages)
    return {"model_id": model_id, "result": result}

"""
curl -H "Authorization: Bearer 1234"  \
  -X POST "localhost:8000/create_model" \
  -H 'Content-Type: application/json' \
  -d '{
  "model_id": "your_model_id"
  "model_did": "your_model_did"
  "base_model": "your_base_model_value",
  "prompt": "your_prompt_value"
}'
"""
class CreateModelRequest(BaseModel):
    model_id: str
    model_did: str
    base_model: str
    prompt: str

@app.post("/create_model")
def create_model(request: CreateModelRequest):
    model_id = db.insert_data(request.model_id, request.model_did, request.base_model, request.prompt)
    return {"model_id": model_id}

"""
curl -H "Authorization: Bearer 1234" -X DELETE "localhost:8000/delete_model/your_model_id"
"""
@app.delete("/delete_model/{model_id}")
def delete_model(model_id: str):
    # Call the delete_by_model_id method to delete the model by its ID
    db.delete_by_model_id(model_id)
    return {"message": f"Model with ID {model_id} deleted successfully"}
