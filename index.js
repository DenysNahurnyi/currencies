'use strict'

const express = require(`express`)
const http = require(`http`)
const app = express()

require(`./config/notCredentials/express`)(app)

// Routing
app.use(`/api`, require(`./api/currencies`))

// db connection and settings
const connection = require(`./config/notCredentials/connection`)
connection.getMongoose()

// error-handler settings
require(`./config/notCredentials/errorHandler`)(app)
// TODO
// prepareDb()

// create server
app.set(`port`, process.env.PORT || 3000)
const server = http.createServer(app)
server.listen(app.get(`port`), () => {
	console.log(app.get(`env`))
	console.log(`listening at:`, app.get(`port`))
})

module.exports = app