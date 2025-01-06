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