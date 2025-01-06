## このシステムで出来ること
図形の勝敗予想ゲームをすることができます。左右に図形が表示され、ユーザーは全30問を通して勝敗を決めるルールを予想します。その際、GPTと相談することができます。ユーザーの情報や選択した図形はUserQuestionaireAnswer.dbに保存されます。
<img width="1440" alt="スクリーンショット 2025-01-06 22 54 50" src="https://github.com/user-attachments/assets/dba4ead1-9155-4561-aee4-cc0f9ca5e439" />

## 事前にインストールすべき言語
node.js, python
## 入れる必要のあるモジュール
### フロントエンド（metasuggestionフォルダで実行）
npm install react react-dom react-hook-form react-router-dom eact-scripts typescript uuid web-vitals  
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
### バックエンド
pip install openai  
pip install fastapi  
pip install pandas  
pip install sqlite3  
pip install pydantic  
pip install scikit-learn  

## 環境変数の設定
OpenAIのAPIキーを取得
vim ~/.zshrcにexport OPENAI_API_KEY1=APIキーを記入(vimの使い方を参考にして記入)

##　 フロントの起動
frontフォルダでnpm start

## バックエンドの起動
backEndフォルダで　uvicorn response:app --reload

## インストールの場所について
ホームはmetasuggestionフォルダ。基本的にバックエンド関連はここでインストールするべきだと思う。npm関連はfrontフォルダで実行。もしかしたら、ホームフォルダでnpm install xxx -w frontでもいけるのかもしれないけど。
