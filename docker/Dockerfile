FROM node:alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./ .

RUN yarn build

FROM node:alpine

WORKDIR /app

COPY --from=base /app/package.json ./
COPY --from=base /app/dist ./dist

EXPOSE 3333

CMD [ "yarn", "start" ]
