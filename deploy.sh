echo "building app..."
npm run build

echo "deploying files to server"
scp -r out/* berkay@samsung:/var/www/inca3.duckdns.org/

echo "done"