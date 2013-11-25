rm -rf dist
r.js -o app/build/app.build.js
cd dist
rm -rf build build.txt scripts/collections scripts/views
cd styles
rm -rf */
