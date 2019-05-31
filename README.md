# Project "F"

## Usage

```
# project clone
$ git clone xxx

# npm package install
$ npm i

# development by webpack-dev-server (HMR)
$ npm run watch
$ open http://0.0.0.0:1111

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
