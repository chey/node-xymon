FROM node:14-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run lint && npm run test

FROM node:14-alpine

WORKDIR /app

COPY package*.json .

RUN npm i --production

COPY . .

RUN npm i -g .

USER node

ENTRYPOINT ["xymon"]
