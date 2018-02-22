import { Client } from 'pg'
const connectionString = 'postgres://postgres:password@postgres:5432/chat'

const client = new Client({
  connectionString: connectionString,
})

client.connect()

export default client