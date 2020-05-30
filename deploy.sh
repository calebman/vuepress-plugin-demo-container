#!/usr/bin/env sh

set -e
yarn docs:build
cd docs/.vuepress/dist/vuepress-plugin-demo-container
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/calebman/vuepress-plugin-demo-container.git master:gh-pages

cd -