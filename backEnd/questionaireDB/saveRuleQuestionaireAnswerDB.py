import sqlite3
from pydantic import BaseModel
dbname = 'userQuestionaireAnswer.db'
USER_ID  = "id1"
from .saveWinnerQuestionaireAnswerDB import record_isexist

class Input(BaseModel):
    questionNumber: int
    expectedWinnerRule: str
    confidenceLevelOfRule: int

def saveRuleAnswer(inputData: Input):
    conn = sqlite3.connect(dbname)
    # sqliteを操作するカーソルオブジェクトを作成
    cur = conn.cursor()
    cur.execute(
    'CREATE TABLE IF NOT EXISTS expected_winner_rule(user_id TEXT PRIMARY KEY, questionNumber INTEGER, expected_winner_rule TEXT, confidence_level_of_rule INTEGER);')
    if record_isexist(cur, inputData.questionNumber):
        cur.execute('delete from expected_winner_rule WHERE user_id = ? AND questionNumber = ? ;', ( USER_ID, inputData.questionNumber))
    cur.execute('INSERT INTO expected_winner_rule(user_id, questionNumber, expected_winner_rule, confidence_level_of_rule) values(?, ?, ?, ?);', (USER_ID, inputData.questionNumber, inputData.expectedWinnerRule, inputData.confidenceLevelOfRule))
    # データベースへコミット。これで変更が反映される。
    conn.commit()
    # データベースへのコネクションを閉じる。(必須)
    conn.close()
    return 