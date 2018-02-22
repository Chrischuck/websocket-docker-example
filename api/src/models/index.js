import { Client } from 'pg'
const connectionString = 'postgres://postgres:password@postgres:5432/chat'

const client = new Client({
  connectionString: connectionString,
})

client.connect()

const table = `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  CREATE TABLE messages(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message TEXT, sender INTEGER, createdAt INTEGER)
`

const messagesQuery = client.query(table, (err, res) => {
  if (err) {
    throw err
  }
  console.log('\n')
  console.log('Messages Table Created.')
  console.log(res)
  client.end()
})

export default client