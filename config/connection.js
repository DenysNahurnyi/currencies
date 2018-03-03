'use strict'
const mongoose = require('mongoose')
const _config = require('./../config/_config')

mongoose.Promise = global.Promise

module.exports.connect = cb => 
	mongoose.connect(_config.database, cb)

module.exports.disconnect = () => 
	mongoose.disconnect()

module.exports.getMongoose = () => {
	this.disconnect()
	this.connect()
	return mongoose
}