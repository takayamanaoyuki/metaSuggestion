import sqlite3
from pydantic import BaseModel
dbname = 'userQuestionaireAnswer.db'
USER_ID  = "id1"

class Input(BaseModel):
    questionNumber: int
    winner: int

def record_isexist(cur, questionNumber: int):
    cur.execute("SELECT user_id FROM expected_winner WHERE user_id = ? AND questionNumber = ? ;", (USER_ID, questionNumber))
    if cur.fetchone() == None:
        return False
    return True  

def saveWinnerAnswer(inputData: Input):
    conn = sqlite3.connect(dbname)
    # sqliteを操作するカーソルオブジェクトを作成
    cur = conn.cursor()
    cur.execute(
    'CREATE TABLE IF NOT EXISTS expected_winner(user_id TEXT PRIMARY KEY, questionNumber INTEGER, expected_winner INTEGER);')
    if record_isexist(cur, inputData.questionNumber):
        cur.execute('delete from expected_winner WHERE user_id = ? AND questionNumber = ? ;', ( USER_ID, inputData.questionNumber))
    cur.execute('INSERT INTO expected_winner(user_id, questionNumber, expected_winner) values(?, ?, ?);', (USER_ID, inputData.questionNumber , inputData.winner))
    # データベースへコミット。これで変更が反映される。
    conn.commit()
    # データベースへのコネクションを閉じる。(必須)
    conn.close()
    return 

def saveRuleAnswer(inputData: Input):
    conn = sqlite3.connect(dbname)
    # sqliteを操作するカーソルオブジェクトを作成
    cur = conn.cursor()
    cur.execute(
    'CREATE TABLE IF NOT EXISTS expected_winner(user_id TEXT PRIMARY KEY, questionNumber INTEGER, expected_winner INTEGER);')
    if record_isexist(cur, inputData.questionNumber):
        cur.execute('delete from expected_winner WHERE user_id = ? AND questionNumber = ? ;', ( USER_ID, inputData.questionNumber))
    cur.execute('INSERT INTO expected_winner(user_id, questionNumber, expected_winner) values(?, ?, ?);', (USER_ID, inputData.questionNumber , inputData.winner))
    # データベースへコミット。これで変更が反映される。
    conn.commit()
    # データベースへのコネクションを閉じる。(必須)
    conn.close()
    return 