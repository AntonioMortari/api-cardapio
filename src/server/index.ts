import express from 'express'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

import { errorMiddleware } from './middlewares/Error'
import './services/translationYup'
import 'express-async-errors'

// routes
import { foodRoutes } from './routes/Food'

server.use('/foods', foodRoutes)


server.use(errorMiddleware)
export { server }