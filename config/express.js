'use strict'

// Module dependencies
const bodyParser = require('body-parser')
const cors = require('cors')
const env = process.env.NODE_ENV || 'local'

module.exports = (app) => {
	// Bootstrap application settings
	app.set('env', env)

	// Configure Express
	app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}))
	app.use(bodyParser.json({limit: '5mb'}))
	app.use(cors())
}