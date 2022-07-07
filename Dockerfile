FROM node:16-slim

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn build
RUN yarn migrate:up

EXPOSE 5000
CMD ["yarn", "start"]