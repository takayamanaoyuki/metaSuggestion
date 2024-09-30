import sqlite3
from pydantic import BaseModel
dbname = 'userQuestionaireAnswer.db'

class Input(BaseModel):
    user_id: str
    name: str
    age: int
    sex: str

def record_isexist(cur, user_id: str):
    cur.execute("SELECT user_id FROM expected_winner WHERE user_id = ?;", (user_id))
    if cur.fetchone() == None:
        return False
    return True  


def saveUserInfo(inputData: Input):
    conn = sqlite3.connect(dbname)
    # sqliteを操作するカーソルオブジェクトを作成
    cur = conn.cursor()
    cur.execute(
    'CREATE TABLE IF NOT EXISTS user_info(user_id TEXT primary key, name TEXT, age INTEGER, sex TEXT);')
    if record_isexist(cur, inputData.user_id):
        cur.execute('delete from user_info WHERE user_id = ?;', ( inputData.user_id ))
    cur.execute('INSERT INTO user_info(user_id, name, age, sex) values(?, ?, ?, ?);', (inputData.user_id, inputData.name , inputData.age, inputData.sex))
    # データベースへコミット。これで変更が反映される。
    conn.commit()
    # データベースへのコネクションを閉じる。(必須)
    conn.close()
    return 

