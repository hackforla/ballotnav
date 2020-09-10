app="ballotnav_backend.dev"
echo "Starting docker build"

docker build -t ${app} .
echo "docker build finished"

echo "Starting docker run"
docker run  -d -p 80:80 ${app} 

echo "Finished docker run"
