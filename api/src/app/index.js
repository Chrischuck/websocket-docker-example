import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket from 'ws'

const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())

const ws = new WebSocket.Server({ port: 3005 })

app.get('/', (req, res) => res.status(200).send('200 OK'))

app.listen(PORT, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("❤️  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});