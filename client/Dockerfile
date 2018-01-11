FROM node:8

ADD . /code
WORKDIR /code

ADD package.json .

RUN npm install

COPY . .

CMD ["server.js"]
