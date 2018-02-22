FROM node:8

ADD . /code
WORKDIR /code

RUN npm install
RUN npm run build

CMD ["server.js"]
