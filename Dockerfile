FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD ./dist ./

COPY ./dist/.keys.json keys.json

RUN npm install
CMD [ "node", "server.js" ]
EXPOSE 80
