import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket from 'ws'
import url from 'url'
import http from 'http'

import { Client } from 'pg'
const connectionString = 'postgres://postgres:password@postgres:5432/chat'

import initClient from '../models'

const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connections = {} // pair off connections by 2's {0,1}, {2,3}

wss.on('connection', async function connection(ws, req) {
  const id = url.parse(req.url, true).query.id

  const newMessage = 'INSERT INTO messages(message, sender, createdAt) VALUES($1 , $2, $3)'
  const getMessages = 'SELECT * FROM messages WHERE sender = $1 OR sender = $2'

  connections[id] = {
    sender: id,
    ws
  }

  ws.on('message', async function incoming(message) {
    const parsedMessage = JSON.parse(message)

    // open up a new client to the DB
    const client = new Client({
      connectionString: connectionString,
    })
    await client.connect()

    // Build the query to make a new message
    const newMessageQuery = {
      text: newMessage,
      values: [parsedMessage.message, parsedMessage.sender, parsedMessage.createdAt]
    }

    // call query
    const dbMessage = await client.query(newMessageQuery)
      .then(res => res)
      .catch(err => { throw err })
    
    // calculate the receiver of the message
    const receiver = parsedMessage.sender % 2 === 0 ? parsedMessage.sender + 1 : parsedMessage.sender - 1

    // build query to get the new messages
    const getMessagesQuery = {
      text: getMessages,
      values: [parsedMessage.sender, receiver]
    }

    // call query and sort messages by date
    const dbMessages = await client.query(getMessagesQuery)
      .then(res => res.rows.sort((a, b) => parseInt(a.createdAt, 10) >= parseInt(b.created, 10)))
      .catch(err => { throw err })

    // send new messages to sender
    connections[parsedMessage.sender].ws.send(JSON.stringify({ data: dbMessages }))

    // find the "Other" perosn in the chat and send messages
    if (parsedMessage.sender % 2 === 0) {
      if (connections[parsedMessage.sender + 1]) {
        connections[parsedMessage.sender + 1].ws.send(JSON.stringify({ data: dbMessages }))
      }
    } else {      
      connections[parsedMessage.sender - 1].ws.send(JSON.stringify({ data: dbMessages }))
    } 
    // end client connection
    client.end()
  });

  // can assume if ID is an even number then it's a new channel
  if (id % 2 === 1) {
    // since it's odd, we need to see if there's any previous messages
    const client = new Client({
      connectionString: connectionString,
    })
    await client.connect()

    const getMessagesQuery = {
      text: getMessages,
      values: [id, id - 1]
    }

    const dbMessages = await client.query(getMessagesQuery)
      .then(res => res.rows.sort((a, b) => parseInt(a.createdAt, 10) >= parseInt(b.created, 10)))
      .catch(err => { throw err })

    connections[id].ws.send(JSON.stringify({ data: dbMessages }))
    client.end()
  }
});


let id = 0;
app.get('/id', (req, res) => res.status(200).send({ id: id++ }))

app.get('/', (req, res) => res.status(200).send('200 OK'))

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});
