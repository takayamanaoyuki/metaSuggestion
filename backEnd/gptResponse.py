from pydantic import BaseModel
from openai import OpenAI
import os
import sys
sys.path.append("/Users/takayama/Documents/meta/metaSuggestion/lib/python3.12/site-packages")

class Input(BaseModel):
    query: str

class Output(BaseModel):
    id: str
    message: str

client = OpenAI(
            api_key=os.environ["OPENAI_API_KEY1"]
        )

def gptResponse(query, messages):
    print(query)
    if not query:
        return "Null"
    else:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
        outputData = Output(id=completion.id, message=completion.choices[0].message.content)
        return outputData