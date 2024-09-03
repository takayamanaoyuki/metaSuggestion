from typing import List, Literal
from pydantic import BaseModel
import json
from fastapi.encoders import jsonable_encoder
from openai import OpenAI
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class Input(BaseModel):
    query: str

class Output(BaseModel):
    id: str
    message: str

class SendMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str


class ChatgptMemory:
    id: int
    content: List[str]
    embedding: List[float]
    similarity: np.float64

messages: List[str] = []
chatgpt_memory: List[ChatgptMemory] = []
client = OpenAI(
            api_key=os.environ["OPENAI_API_KEY1"]
        )

def gptResponse(messages):
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
        )
    

def shortMemoryResponse(inputData: Input):
    message: str = inputData.query
    sendMessages: SendMessage = [{
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
            chatgpt_memory[i]["similarity"] = cosine_similarity(np.array([embedding]), np.array([chatgpt_memory[i]["embedding"]]))[0][0]
        # similarityでソートした上で、先頭の3要素を取得
        top3_memory = sorted(chatgpt_memory, key=lambda x: x["similarity"], reverse=True)
        top3_memory = top3_memory[:3]

        remember_memory: List[List[str]] = []
        for i in range(len(top3_memory)):
            remember_memory.append(top3_memory[i]["content"])
            # top3_memory[i]["id"]がリストの最後の要素でなければ
            if top3_memory[i]["id"] != len(chatgpt_memory)-1:
                remember_memory.append(chatgpt_memory[top3_memory[i]["id"]+1]["content"])
        for i in range(len(remember_memory)):
            sendMessages.append({"role":"user", "content":remember_memory[i][0]})
            sendMessages.append({"role":"assistant", "content":remember_memory[i][1]})
        sendMessages.append({"role":"user", "content":message})
        response = gptResponse(sendMessages)
        messages.append(response.message)
        return response
    else:
        sendMessages.append({"role":"user", "content":message})
        response = gptResponse(sendMessages)
        messages.append(response.message)
        return response

        
