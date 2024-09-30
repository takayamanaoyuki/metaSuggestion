import sqlite3
from pydantic import BaseModel
dbname = 'userQuestionaireAnswer.db'

class Input(BaseModel):
    user_id: str
    questionNumber: int
    winner: int

def record_isexist(cur,user_id: str, questionNumber: int):
    cur.execute("SELECT user_id FROM expected_winner WHERE user_id = ? AND questionNumber = ? ;", (user_id, questionNumber))
    if cur.fetchone() == None:
        return False
    return True  

def saveWinnerAnswer(inputData: Input):
    conn = sqlite3.connect(dbname)
    # sqliteを操作するカーソルオブジェクトを作成
    cur = conn.cursor()
    cur.execute(
    'CREATE TABLE IF NOT EXISTS expected_winner(user_id TEXT, questionNumber INTEGER, expected_winner INTEGER, PRIMARY KEY(user_id, questionNumber));')
    if record_isexist(cur,inputData.user_id, inputData.questionNumber):
        cur.execute('delete from expected_winner WHERE user_id = ? AND questionNumber = ? ;', ( inputData.user_id, inputData.questionNumber))
    cur.execute('INSERT INTO expected_winner(user_id, questionNumber, expected_winner) values(?, ?, ?);', (inputData.user_id, inputData.questionNumber , inputData.winner))
    # データベースへコミット。これで変更が反映される。
    conn.commit()
    # データベースへのコネクションを閉じる。(必須)
    conn.close()
    return 

