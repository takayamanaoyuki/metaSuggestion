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
from typing import List, Literal
import shortMemoryResponse
import gptResponse

sys.path.append("/Users/takayama/Documents/meta/metaSuggestion/lib/python3.12/site-packages")

origins = [
    "http://localhost:3000",
]
client = OpenAI(
            api_key=os.environ["OPENAI_API_KEY1"]
        )

app = FastAPI()
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


"""@app.exception_handler(RequestValidationError)
async def handler(request:Request, exc:RequestValidationError):
    print(exc)
    print("request = ", request.keys())
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
"""


@app.post("/response/")
def main_normal(inputData: gptResponse.Input):
    messages = [
                {
                    "role": "system",
                    "content": "日本語で返答してください。"
                },
                {
                    "role": "user",
                    "content": inputData.query
                },
            ]
    return gptResponse.gptResponse(messages)


@app.post("/responseShortMemory/")  
def main_shrotMomory(inputData: shortMemoryResponse.Input):
    return shortMemoryResponse.shortMemoryResponse(inputData)
