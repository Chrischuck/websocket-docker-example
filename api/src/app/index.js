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

const messages = []
const connections = {} // pair off connections by 2's {0,1}, {2,3}

wss.on('connection', function connection(ws, req) {
  const id = url.parse(req.url, true).query.id
  
  connections[id] = {
    sender: id,
    ws
  }

  ws.on('message', function incoming(message) {
    const parsedMessage = JSON.parse(message)
    messages.push(parsedMessage)
    
    const usersMessages = messages
      .filter(m => (m.sender === parsedMessage.sender || m.sender === (parsedMessage.sender % 2 === 0 ? parsedMessage.sender + 1 : parsedMessage.sender - 1)))
      .sort((a, b) => a.date >= b.date)

    connections[parsedMessage.sender].ws.send(JSON.stringify({ data: usersMessages }))    
    if (parsedMessage.sender % 2 === 0) {
      if (connections[parsedMessage.sender + 1]) {
        connections[parsedMessage.sender + 1].ws.send(JSON.stringify({ data: usersMessages }))
      }
    } else {
      const usersMessages = messages
        .filter(m => (m.sender === parsedMessage.sender || m.sender === parsedMessage.sender - 1))
        .sort((a, b) => a.date < b.date)       
      connections[parsedMessage.sender - 1].ws.send(JSON.stringify({ data: usersMessages }))
    } 
  });

  // can assume if even ID it's a new channel
  if (id % 2 === 1) {
    const usersMessages = messages.filter(m => m.sender === id || m.sender === id - 1)
    connections[id].ws.send(JSON.stringify({ data: usersMessages }))
  }

});


let id = 0;
app.get('/id', (req, res) => res.status(200).send({ id: id++ }))

app.get('/', (req, res) => res.status(200).send('200 OK'))

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});
