import json
from fastapi.encoders import jsonable_encoder
import os

messages = ["こんにちは", "おはよう", "こんばんは"]
print(messages[-3:-1])
print(os.environ["OPENAI_API_KEY1"])