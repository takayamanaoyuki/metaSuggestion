from openai import OpenAI
import json
from fastapi.encoders import jsonable_encoder
import pandas as pd

client = OpenAI(
    api_key="sk-proj-OOfH6Ub3xWJQ5clBqfh2T3BlbkFJaTS3A0h9ZKDbzCPg1045"
)

messages = []

completion = client.chat.completions.create(
     model="gpt-4o",
     messages=[
         {
             "role": "system",
             "content": "日本語で返答してください。"
         },
         {
             "role": "user",
             "content": "What is AI?"
         },
     ],
)

print(completion)
message = completion.choices[0].message.content
print(message)

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
    
messages.append(message)
"""jsonMessages = json.dumps(jsonable_encoder(messages),ensure_ascii=False)
print(jsonMessages)"""

df = pd.DataFrame(messages, columns=["messages"])
df["emb"] = df["messages"].apply(lambda x: get_embedding(x, dim=2))
print(df)