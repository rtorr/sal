const path = require('app-root-path')
const winston = require('winston')
const express = require('express')
const config = require('./../../config')

// Please note port 5000 is hard coded to
// port 5000 in production for use with Dokku
// if you want to use the port settings from `config`
// change this line below
const port = process.env.NODE_ENV === 'production' ? 5000 : config.server.port
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
