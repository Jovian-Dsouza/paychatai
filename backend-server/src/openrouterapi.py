import json
from openai import OpenAI

class OpenRouter:
    def __init__(self, apiKey, appUrl, appTitle) -> None:
        self.apiKey = apiKey
        self.appUrl = appUrl
        self.appTitle = appTitle
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=apiKey,
            )
        
    def list_models(self):
        d = {
            'Nous: Capybara 7B (free)' : 'nousresearch/nous-capybara-7b:free' ,	
            'Mistral 7B Instruct (free)' : 'mistralai/mistral-7b-instruct:free',	
            'MythoMist 7B (free)' : 'gryphe/mythomist-7b:free',
            'Toppy M 7B (free)' : 'undi95/toppy-m-7b:free' ,	
            'Cinematika 7B (alpha) (free)' : 'openrouter/cinematika-7b:free' ,
            'Google: Gemma 7B (free)' : 'google/gemma-7b-it:free' 
        }
        model_list = [ {"name": k, "id": v} for k, v in d.items()]
        return model_list
    
    def get_chat(self, model, messages):
        completion = self.client.chat.completions.create(
          extra_headers={
            "HTTP-Referer": self.appUrl, # Optional, for including your app on openrouter.ai rankings.
            "X-Title": self.appTitle, # Optional. Shows in rankings on openrouter.ai.
          },
          model=model,
          messages=messages
        )
        return completion.choices[0].message.content

if __name__ == "__main__":
    from os import getenv
    from dotenv import load_dotenv
    load_dotenv()

    OPENROUTER_API_KEY = getenv("OPENROUTER_API_KEY")
    APP_URL = getenv("APP_URL")
    APP_TITLE = getenv("APP_TITLE")

    openRouter = OpenRouter(OPENROUTER_API_KEY, APP_URL, APP_TITLE)
    model_list = list(openRouter.list_models().values())
    print(model_list)

    messages =  [
       {
           "role": "system",
           "content": "Your a professional assistant"
       },
       {
          "role": "user",
          "content": "tell me a joke"
       },
       {
          "role": "assistant",
          "content": "why did the chicken cross the road"
       },
       {
          "role": "user",
          "content": "I don't know, why did the chicken cross the road"
       }
    ]
    model = 'mistralai/mistral-7b-instruct:free'
    output = openRouter.get_chat(model, messages)
    print(f"Model output: {output}")
