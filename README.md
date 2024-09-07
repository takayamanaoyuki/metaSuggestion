## 入れる必要のあるモジュール
import openai

import fastapi

import pandas

##　フロントの起動
frontフォルダでnpm start


## バックエンドの起動
metaSuggestionフォルダで　uvicorn response:app --reload

## インストールの場所について
ホームはmetasuggestionフォルダ。基本的にバックエンド関連はここでインストールするべきだと思う。npm関連はfrontフォルダで実行。もしかしたら、ホームフォルダでnpm install xxx -w frontでもいけるのかもしれないけど。