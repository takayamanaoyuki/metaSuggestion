import json
from fastapi.encoders import jsonable_encoder
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import sys
import os
from typing import List, Literal

sys.path.append("/Users/takayama/Documents/meta/metaSuggestion/lib/python3.12/site-packages")


app = FastAPI()
origins = [
    "http://localhost:3000",
]

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
