import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import cors from 'cors'

connectDB()

const app = express()
app.use(cors())

app.use(express.json())
app.use(logger)
app.use('/api/v5', globalRouter)

const server = createServer(app)

server.listen(5555, () => {
  console.log('server running at http://localhost:5555/api/v5')
})
