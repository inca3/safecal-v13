echo "switching to branch master"
git checkout master

echo "building app..."
npm run build

echo "deploying files to server"
scp -r build/* berkay@samsung:/var/www/inca3.duckdns.org/

echo "done"