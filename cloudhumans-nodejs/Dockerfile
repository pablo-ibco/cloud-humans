FROM node:alpine

RUN mkdir -p /usr/src/node-api
WORKDIR /usr/src/node-api

RUN apk update && apk upgrade
RUN apk add python3 g++ make

COPY . /usr/src/node-api/
RUN npm install @prisma/client
RUN npm install
RUN npm ci && npm run build

EXPOSE 4500

CMD NODE_URLS=http://*:$PORT node dist/main.js