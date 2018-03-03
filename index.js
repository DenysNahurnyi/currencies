'use strict'

const express = require(`express`)
const http = require(`http`)
const app = express()

const serverInit = require(`./utils/serverInit`)

require(`./config/express`)(app)

// Routing
app.use(`/api`, require(`./api/currencies`))
// db connection and settings
const connection = require(`./config/connection`)
connection.getMongoose()

// error-handler settings
require(`./config/errorHandler`)(app)


// create server
app.set(`port`, process.env.PORT || 3000)
const server = http.createServer(app)
serverInit.prepareServer({values: true, description: true}).then(() => {
	server.listen(app.get(`port`), () => {
		console.log(`Environment is ${app.get(`env`)}`)
		if(app.get(`env`) !== `production`) {
			console.log(`Server listening at: ${app.get(`port`)} port`)
		}
	})
})

module.exports = app