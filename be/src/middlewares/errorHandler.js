import { logEvents } from './logger.js'

export const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
  console.log(err.stack)

  const status = res.statusCode ? res.statuseCode : 500

  res.status(status).json({ message: err.message })
}