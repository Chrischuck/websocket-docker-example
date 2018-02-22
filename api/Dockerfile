FROM node:8

ADD . /code
WORKDIR /code

ADD package.json .

RUN npm install forever -g
#RUN npm install

COPY . .

CMD ["forever", "index.js"]
