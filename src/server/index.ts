import express from 'express'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

import './services/translationYup'

// routes
import { foodRoutes } from './routes/Food'

server.use('/foods', foodRoutes)

export { server }