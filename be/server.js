import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import DBConnect from './src/configs/database.js'
import { corsOption } from './src/configs/corsOption.js'
import { logger, logEvents } from './src/middlewares/logger.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
import root from './src/routes/root.js'
import Logging from './src/library/logging.js'

import userRoute from './src/routes/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.APP_PORT || 3500
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

DBConnect()

app.use(logger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOption))
app.use(cookieParser())

app.use(errorHandler)

mongoose.connection.once('open', () => {
  Logging.info(process.env.APP_ENV)
  Logging.info('MongoDB Connected')
  startServer()
})

mongoose.connection.on('error', (error) => {
  Logging.error(error)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

const startServer = () => {
  app.use((req, res, next) => {
    // Log the request
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
      // Log the response
      Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
    })

    next()
  })

  app.use('/', express.static(path.join(__dirname, 'public')))

  app.use('/', root)
  app.use('/users', userRoute)

  app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'src', 'views', '404.html'))
    } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
    } else {
      res.type('text').send('404 Not Found')
    }
  })

  app.listen(PORT, () => Logging.info(`Server running on port ${PORT}`))
}
