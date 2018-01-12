import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket from 'ws'
import url from 'url'
import http from 'http'

const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connections = {}
wss.on('connection', function connection(ws, req) {
  const id = url.parse(req.url, true).query.id
  
  connection[id] = {
    sender: id,
    ws
  }

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});


app.get('/', (req, res) => res.status(200).send('200 OK'))

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});
