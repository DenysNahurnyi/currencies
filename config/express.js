'use strict'

// Module dependencies
const bodyParser = require(`body-parser`)
const cors = require(`cors`)

module.exports = (app) => {
	// Configure Express
	app.use(bodyParser.urlencoded({extended: true, limit: `5mb`}))
	app.use(bodyParser.json({limit: `5mb`}))
	app.use(cors())
}