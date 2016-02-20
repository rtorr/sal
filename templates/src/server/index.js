const path = require('app-root-path')
const winston = require('winston')
const express = require('express')
const config = require('./../../config')
const port = process.env.NODE_ENV === 'debug' ? 4231 : config.server.port
const app = express()

app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.set('views', `${path}/src/server/views`)
app.use('/public', express.static(`${path}/src/public`))
app.use(express.static('public', { maxAge: 60000 }))

app.get('/', (req, res) => {
  res.render('index', {})
})

app.listen(port, () => {
  winston.log('info', `Server started on http://localhost:${port}. Ctrl+C to quit`)
})
