import json
from fastapi.encoders import jsonable_encoder
import pandas as pd
from fastapi import FastAPI, Request, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

import sys
import os
from typing import List
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
            api_key=os.environ["OPENAI_API_KEY1"]
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

messages: List[str] = []
chatgpt_memory = []

"""@app.exception_handler(RequestValidationError)
async def handler(request:Request, exc:RequestValidationError):
    print(exc)
    print("request = ", request.keys())
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
"""


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


def saveConvMemory (messages):

    # 過去会話往復のjsonをまんまベクトル化する
    embedding = get_embedding(json.dumps(jsonable_encoder(messages),ensure_ascii=False))

    #本当はベクトルDBに保存しないとですね
    chatgpt_memory.append({"id":len(chatgpt_memory),"content":messages.copy(),"embedding":embedding})

def get_embedding(text: List[str], model="text-embedding-3-small", dim=None):
    text = list(map(lambda x: x.replace("\n", " "), text))
    if dim is None:
        return client.embeddings.create(input=text, model=model).data[0].embedding
    else:
        return (
            client.embeddings.create(input=text, model=model, dimensions=dim)
            .data[0]
            .embedding
        )
@app.post("/response/")  
def main(inputData: Input):
    message: str = inputData.query
    sendMessages = [{
                        "role": "system",
                        "content": "日本語で返答してください。"
                    }]
    messages.append(message)
    if len(messages) >= 3:
        #前回入力と前回応答の二つを取得
        saveConvMemory(messages[-3:-1])
        
        embedding = get_embedding([message])
        # chatgpt_memoryの各要素にsimilarityを追加
        for i in range(len(chatgpt_memory)):
            chatgpt_memory[i]["similarity"] = cosine_similarity(np.array([embedding]), np.array([chatgpt_memory[i]["embedding"]]))

        # similarityでソートした上で、先頭の3要素を取得
        top3_memory = sorted(chatgpt_memory, key=lambda x: x["similarity"], reverse=True)
        top3_memory = top3_memory[:3]

        remember_memory = []
        for i in range(len(top3_memory)):
            remember_memory.append(top3_memory[i]["content"])
            # top3_memory[i]["id"]がリストの最後の要素でなければ
            if top3_memory[i]["id"] != len(chatgpt_memory)-1:
                remember_memory.append(chatgpt_memory[top3_memory[i]["id"]+1]["content"])
        for i in range(len(remember_memory)):
            print(remember_memory)
            sendMessages.append({"role":"user", "content":remember_memory[i][0]})
            sendMessages.append({"role":"assistant", "content":remember_memory[i][1]})
        sendMessages.append({"role":"user", "content":message})
        response = gptResponse(message, sendMessages)
        messages.append(response.message)
        return response
    else:
        sendMessages.append({"role":"user", "content":message})
        response = gptResponse(message, sendMessages)
        messages.append(response.message)
        return response

        