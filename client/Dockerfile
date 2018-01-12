FROM node:8

ADD . /code
WORKDIR /code

ADD package.json .

RUN npm install
RUN npm run build

COPY . .

CMD ["server.js"]
