'use strict'
const mongoose = require(`mongoose`)
const config = require(`config`)
// const database = config.get(`database`)
const database = config.get(`database`)
console.log(`Database: ${database}, env is: ${process.env}`)

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