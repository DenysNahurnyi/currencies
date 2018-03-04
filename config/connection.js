'use strict'
const mongoose = require(`mongoose`)
const database = require(`./credentials`)[process.env.NODE_ENV || `local`	].database

mongoose.Promise = global.Promise

module.exports.connect = cb => 
	mongoose.connect(database, cb)

module.exports.disconnect = () => 
	mongoose.disconnect()

module.exports.getMongoose = () => {
	this.disconnect()
	this.connect()
	return mongoose
}