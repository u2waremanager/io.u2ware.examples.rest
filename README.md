# Runtime Envirement 

> git clone 

> docker-compose up

> http://localhost:8080



# Development Envirement 


## Develop Backend
> ./mvnw spring-boot:run

## Develop Frontend

> cd ....

> npm install

> npm run dev


## Package Frontend
> cd {source}/src/test/resources/META-INF/frontend

> npm run build


## Package Backend

> cd {source}
> ./mvnw package


## Build Image

> docker build \
  --no-cache \
  --platform linux/arm64,linux/amd64 \
  --tag ${app_name}:${app_version} \
  .

## Deploy Image

> docker push ....






docker build -t my-image:1.0 .



<!-- > docker run -d \
-p 5432:5432 \
-p 8080:8080 \
-e POSTGRES_HOST_AUTH_METHOD=trust \
-e POSTGRES_DB=postgres \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
--name my-image \
my-image:1.0 -->


> docker build -t bookstore-app .


> docker exec -it ???? /bin/bash