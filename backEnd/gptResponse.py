from pydantic import BaseModel
from openai import OpenAI
import os
import sys
from typing import List, Literal
sys.path.append("/Users/takayama/Documents/meta/metaSuggestion/lib/python3.12/site-packages")

class Input(BaseModel):
    query: str

class Output(BaseModel):
    id: str
    message: str

class SendMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str

client = OpenAI(
            api_key=os.environ["OPENAI_API_KEY1"]
        )

def gptResponse(messages: SendMessage):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    outputData = Output(id=completion.id, message=completion.choices[0].message.content)
    return outputData