'use strict'

const express = require(`express`)
const http = require(`http`)
const app = express()

const serverInit = require(`./utils/serverInit`)

require(`./config/notCredentials/express`)(app)

// Routing
app.use(`/api`, require(`./api/currencies`))
console.log('Environment is: ', app.get(`env`))
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
// serverInit.prepareServer({values: true, description: true}).then(() => {
// 	server.listen(app.get(`port`), () => {
// 		console.log(app.get(`env`))
// 		console.log(`listening at:`, app.get(`port`))
// 	})
// })

server.listen(app.get(`port`), () => {
	console.log(app.get(`env`))
	console.log(`listening at:`, app.get(`port`))
})


module.exports = app