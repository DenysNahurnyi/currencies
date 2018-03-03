'use strict'

const express = require(`express`)
const http = require(`http`)
const app = express()

require(`./config/express`)(app)

// Routing
app.use(`/`, require(`./api/users`))

// db connection and settings
const connection = require(`./config/connection`)
connection.getMongoose()

// error-handler settings
require(`./config/errorHandler`)(app)

// create server
app.set(`port`, process.env.PORT || 3000)
const server = http.createServer(app)
server.listen(app.get(`port`), () => {
	console.log(app.get(`env`))
	console.log(`listening at:`, app.get(`port`))
})

module.exports = app