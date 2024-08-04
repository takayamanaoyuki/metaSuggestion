import json
from fastapi.encoders import jsonable_encoder
import pandas as pd
from fastapi import FastAPI, Request, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from openai import OpenAI
import sys
sys.path.append("/Users/takayama/Documents/meta/metaSuggestion/lib/python3.12/site-packages")

class Input(BaseModel):
    query: str

class Output(BaseModel):
    id: str
    message: str

app = FastAPI()
origins = [
    "http://localhost:3000",
]
client = OpenAI(
            api_key="sk-proj-OOfH6Ub3xWJQ5clBqfh2T3BlbkFJaTS3A0h9ZKDbzCPg1045"
        )

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # 認証情報のアクセスを許可(今回は必要ない)
    allow_credentials=True,
    # 全てのリクエストメソッドを許可(["GET", "POST"]など個別指定も可能)
    allow_methods=["*"],
    # アクセス可能なレスポンスヘッダーを設定（今回は必要ない）
    allow_headers=["*"],
)

messages = []
chatgpt_memory = []

"""@app.exception_handler(RequestValidationError)
async def handler(request:Request, exc:RequestValidationError):
    print(exc)
    print("request = ", request.keys())
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
"""

@app.post("/response/")
def gptResponse(outputData: Input):
    print(outputData)
    if not outputData.query:
        return "Null"
    else:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "日本語で返答してください。"
                },
                {
                    "role": "user",
                    "content": outputData.query
                },
            ],
        )
        outputData = Output(id=completion.id, message=completion.choices[0].message.content)
        return outputData


def saveConvMemory (messages):

    # 過去会話往復のjsonをまんまベクトル化する
    embedding = get_embedding(json.dumps(jsonable_encoder(messages),ensure_ascii=False))

    #本当はベクトルDBに保存しないとですね
    chatgpt_memory.append({"id":len(chatgpt_memory),"content":messages.copy(),"embedding":embedding})

def get_embedding(text, model="text-embedding-3-small", dim=None):
    text = text.replace("\n", " ")
    if dim is None:
        return client.embeddings.create(input=[text], model=model).data[0].embedding
    else:
        return (
            client.embeddings.create(input=[text], model=model, dimensions=dim)
            .data[0]
            .embedding
        )
    
    