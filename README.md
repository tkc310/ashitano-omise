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
