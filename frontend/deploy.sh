#!/usr/bin/env sh

set -e

yarn build

cd dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:j4ger/jim.git main:gh-pages

cd -