target="../srinskit.github.io"
curr=$PWD
npm run build
rm -rf $target/*
cp -r build/* "$target"
cd "$target" || return
cp "index.html" "404.html"
git add .
git commit -m "BUILD $(date)"
git push origin master
cd "$curr" || return
