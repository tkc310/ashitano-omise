# Project "F"

## Usage

```
# project clone
$ git clone xxx

# node install
refs: https://qiita.com/1000ch/items/41ea7caffe8c42c5211c
$ nobenv install 10.15.3
$ nobenv rehash

# npm update
npm update -g npm

# npm package install
$ npm i

# development by webpack-dev-server (HMR)
$ npm run watch
$ open http://0.0.0.0:1234

# production build
$ npm run release

# release tag
$ git add ./public
$ git commit -a
$ git push origin master
$ git tag -a release-v0.x -m 'comment'
$ git push origin release-v0.x
```

## デザインルール
原則下記ルールを採用する

#### font-size
単位はrem

#### font-family
日本語は'Noto Sans JP', 英数字は'Roboto'

#### サイジング
8の倍数

#### アスペクト比
1:1.414 (白銀比)

#### grid-system
320px単位

- 1col: 320px
- 2col: 640px
- 3col: 960px

## 記事の追加

#### 1. 画像追加
`src/assets/images/<id>/` ディレクトリ作成
- 一覧用
`<id>/top.jpg`
- 詳細 - 内装
`<id>/inner.jpg`
- 詳細 - メニュー
`<id>/menu.jpg`
- 詳細 - スタッフ
`<id>/staff.jpg`

#### 2. 一覧の情報追加
`src/data/index.json` を編集

#### 3. 詳細の情報追加
`src/data/shops/<id>.json` を作成、編集

#### 4. ページ生成用の情報追記
`page_config.json` を編集

#### 5. 確認する

```
$ npm run watch
```
