FROM node:12.13-slim

WORKDIR /usr/gamis-for-slack

COPY package.json .
COPY . .
RUN yarn install

RUN npm run tsc

EXPOSE 8080

CMD ["yarn", "start"]
