# Docker

## Scripts
```sh
$ docker build -t backend -f ./docker/Dockerfile .

$ docker run --name backend_todo -p 4000:3000 -d backend

$ docker container ls

$ docker container rm backend_todo

$ docker image ls

$ docker image rm backend
```