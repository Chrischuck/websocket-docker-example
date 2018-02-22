import { Client } from 'pg'
const connectionString = 'postgres://postgres:password@postgres:5432/chat'

const client = new Client({
  connectionString: connectionString,
})

client.connect()

const table = `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  CREATE TABLE messages(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(,
    sender INTEGER,
    receiver INTEGER,
    createdAt TIMESTAMP
  )
`

const messagesQuery = client.query(table, (err, res) => {
  if (err) {
    throw err
  }
  client.end()
})

export default client