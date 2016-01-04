FROM docker.io/node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN git clone https://github.com/cnsnyder/void.rocks.git
WORKDIR /usr/src/app/void.rocks
RUN git checkout production

COPY ./.keys.json keys.json

RUN npm install
CMD [ "node", "server.js" ]
EXPOSE 80
