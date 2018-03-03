'use strict'
const logModel = require(`../../models/log.model`)

module.exports.getCurrencies = async (req, res, next) => {
	res.end('Currencies info')
	// logModel.create({
	// 	event: `Try to save smth in database`,
	// 	date: new Date()
	// })
}